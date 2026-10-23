import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { chicagoTimestamp, deliverLead, type Lead } from "@/lib/leadDelivery";
import { cleanContext, validateLead } from "@/lib/leadSchema";
import { rateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 10_000;

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (forwarded?.split(",")[0] ?? request.headers.get("x-real-ip") ?? "unknown").trim();
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ ok: false, reason: "invalid" }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid" }, { status: 400 });
  }

  // Honeypot: people never see this field. Pretend it worked and drop the lead.
  if (typeof body.website === "string" && body.website.trim()) return NextResponse.json({ ok: true });

  const ip = clientIp(request);
  if (rateLimited(ip)) return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });

  const { values, errors, ok } = validateLead(body, site.contact.form.businessTypes);
  if (!ok) return NextResponse.json({ ok: false, reason: "invalid", errors }, { status: 422 });

  const lead: Lead = {
    ...values,
    ...cleanContext(body),
    userAgent: (request.headers.get("user-agent") ?? "").slice(0, 300),
    ip,
    receivedAt: chicagoTimestamp(),
  };

  try {
    await deliverLead(lead);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, reason: "delivery_failed" }, { status: 502 });
  }
}
