import { Resend } from "resend";
import type { LeadContext, LeadValues } from "./leadSchema";

/** A lead plus everything the server adds. */
export interface Lead extends LeadValues, LeadContext {
  userAgent: string;
  ip: string;
  /** timestamp in America/Chicago, human readable */
  receivedAt: string;
}

export type Delivery = "sheet" | "email";

const TIMEOUT_MS = 10_000;
const DEFAULT_FROM = "Devisyn Leads <onboarding@resend.dev>";

export function chicagoTimestamp(date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export function sourceLabel(lead: LeadContext): string {
  const utm = [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ");
  if (utm) return utm;
  return lead.referrer ? `referrer: ${lead.referrer}` : "direct";
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Which deliveries have credentials. A channel that is not configured is skipped, not failed. */
export function configured(): Record<Delivery, boolean> {
  return {
    sheet: !!(process.env.SHEET_WEBHOOK_URL && process.env.SHEET_WEBHOOK_SECRET),
    email: !!(process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL),
  };
}

/** Appends a row through the Google Apps Script web app (see docs/google-sheet-lead-script.gs). */
export async function sendToSheet(lead: Lead): Promise<void> {
  const response = await fetch(process.env.SHEET_WEBHOOK_URL!, {
    method: "POST",
    // text/plain keeps this a "simple" request; Apps Script answers with a redirect that fetch follows
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    body: JSON.stringify({
      secret: process.env.SHEET_WEBHOOK_SECRET,
      date: lead.receivedAt,
      name: lead.name,
      business: lead.business,
      type: lead.type,
      email: lead.email,
      phone: lead.phone,
      source: sourceLabel(lead),
      page: lead.page,
      referrer: lead.referrer,
      userAgent: lead.userAgent,
    }),
  });
  const text = await response.text();
  let body: { ok?: boolean; error?: string } = {};
  try {
    body = JSON.parse(text);
  } catch {
    // an HTML page here usually means the web app is not deployed for "Anyone"
  }
  if (!response.ok || body.ok !== true) {
    throw new Error(`sheet webhook failed (${response.status}): ${body.error ?? text.slice(0, 120)}`);
  }
}

function emailBodies(lead: Lead) {
  const sheetUrl = process.env.SHEET_URL;
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Business", lead.business],
    ["Type", lead.type],
    ["Email", lead.email],
    ["Phone", lead.phone || "(not given)"],
    ["Source", sourceLabel(lead)],
    ["Page", lead.page || "(unknown)"],
    ["Referrer", lead.referrer || "(none)"],
    ["Received", lead.receivedAt],
    ["Browser", lead.userAgent || "(unknown)"],
  ];

  const text = [
    `New lead: ${lead.business} (${lead.type})`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Reply: mailto:${lead.email}`,
    ...(sheetUrl ? [`Lead sheet: ${sheetUrl}`] : []),
  ].join("\n");

  const cells = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5a5952;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;font-size:15px">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const button = (href: string, label: string, dark: boolean) =>
    `<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 22px;border-radius:999px;border:1.5px solid #121314;background:${dark ? "#121314" : "#ffffff"};color:${dark ? "#fff8e8" : "#121314"};font-weight:600;text-decoration:none">${escapeHtml(label)}</a>`;

  const html = `<!doctype html><html><body style="margin:0;background:#fff8e8;font-family:Arial,Helvetica,sans-serif;color:#121314">
<div style="max-width:560px;margin:0 auto;padding:28px 20px">
<p style="margin:0 0 4px;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#5a5952">New lead</p>
<h1 style="margin:0 0 20px;font-size:24px;line-height:1.2">${escapeHtml(lead.business)} <span style="font-weight:400;color:#5a5952">(${escapeHtml(lead.type)})</span></h1>
<table style="border-collapse:collapse;width:100%">${cells}</table>
<p style="margin:24px 0 0">${button(`mailto:${lead.email}`, "Reply", true)}${sheetUrl ? button(sheetUrl, "Open lead sheet", false) : ""}</p>
</div></body></html>`;

  return { html, text };
}

/** Sends the notification through Resend. `reply_to` is the lead, so Reply goes straight to them. */
export async function sendEmail(lead: Lead): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { html, text } = emailBodies(lead);
  const { error } = await resend.emails.send({
    from: process.env.LEAD_FROM_EMAIL || DEFAULT_FROM,
    to: [process.env.LEAD_TO_EMAIL!],
    replyTo: lead.email,
    subject: `New lead: ${lead.business} (${lead.type})`.replace(/[\r\n]+/g, " "),
    html,
    text,
  });
  if (error) throw new Error(`resend failed: ${error.name}: ${error.message}`);
}

/**
 * Runs both deliveries in parallel. Resolves with what worked; throws only when every configured
 * channel failed. With nothing configured (local development) the lead is logged instead.
 */
export async function deliverLead(lead: Lead): Promise<Delivery[]> {
  const on = configured();
  const channels = (Object.keys(on) as Delivery[]).filter((c) => on[c]);

  if (!channels.length) {
    console.log("[lead] no delivery configured (SHEET_WEBHOOK_* / RESEND_API_KEY + LEAD_TO_EMAIL), logging instead:", lead);
    return [];
  }

  const jobs: Record<Delivery, () => Promise<void>> = { sheet: () => sendToSheet(lead), email: () => sendEmail(lead) };
  const results = await Promise.allSettled(channels.map((c) => jobs[c]()));

  const worked: Delivery[] = [];
  results.forEach((result, i) => {
    if (result.status === "fulfilled") worked.push(channels[i]);
    else console.error(`[lead] ${channels[i]} delivery failed:`, result.reason);
  });

  if (!worked.length) {
    console.error("[lead] every delivery failed, lead was:", lead);
    throw new Error("all deliveries failed");
  }
  return worked;
}
