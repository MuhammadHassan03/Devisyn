"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { LEAD_FIELDS, validateLead, type LeadErrors, type LeadField } from "@/lib/leadSchema";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "sent" | "error" | "rate_limited";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const UTM_STORAGE = "devisyn:utm";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** UTM tags from the landing URL, remembered for the visit in case the visitor navigates around first. */
function readUtm(): Record<string, string> {
  const fromUrl: Record<string, string> = {};
  const params = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }
  try {
    if (Object.keys(fromUrl).length) sessionStorage.setItem(UTM_STORAGE, JSON.stringify(fromUrl));
    return Object.keys(fromUrl).length ? fromUrl : JSON.parse(sessionStorage.getItem(UTM_STORAGE) ?? "{}");
  } catch {
    return fromUrl;
  }
}

export function ContactForm() {
  const { form, email } = site.contact;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<LeadErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  // remember campaign tags as soon as the page loads
  useEffect(() => {
    readUtm();
  }, []);

  const messageFor = (field: LeadField) => {
    const error = errors[field];
    if (!error) return "";
    if (error === "invalid") {
      return field === "email" ? form.fieldErrors.invalidEmail : field === "phone" ? form.fieldErrors.invalidPhone : form.fieldErrors.invalid;
    }
    return form.fieldErrors[error];
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;

    const checked = validateLead(data, form.businessTypes);
    setErrors(checked.errors);
    if (!checked.ok) {
      const first = LEAD_FIELDS.find((field) => checked.errors[field]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const utm = readUtm();
    setStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          page: window.location.href,
          referrer: document.referrer,
          utmSource: utm.utm_source ?? "",
          utmMedium: utm.utm_medium ?? "",
          utmCampaign: utm.utm_campaign ?? "",
        }),
      });
      if (response.ok) {
        setStatus("sent");
        window.gtag?.("event", "generate_lead", {
          business_type: checked.values.type,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
        });
        return;
      }
      if (response.status === 422) {
        const body = (await response.json()) as { errors?: LeadErrors };
        setErrors(body.errors ?? {});
        setStatus("idle");
        return;
      }
      setStatus(response.status === 429 ? "rate_limited" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className={`anim-pop ${styles.success}`} role="status">
        <svg className={`anim-check ${styles.successIcon}`} width="64" height="64" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="11" fill="var(--mint)" stroke="var(--ink)" strokeWidth="1.2" />
          <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className={styles.successTitle}>{form.successTitle}</p>
        <p className={styles.successText}>{form.successText}</p>
      </div>
    );
  }

  const field = (name: LeadField, label: string, control: React.ReactNode) => (
    <div className={styles.field}>
      <label htmlFor={`lead-${name}`}>{label}</label>
      {control}
      {errors[name] && (
        <p id={`lead-${name}-error`} className={styles.fieldError}>
          {messageFor(name)}
        </p>
      )}
    </div>
  );
  const a11y = (name: LeadField) => ({
    id: `lead-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `lead-${name}-error` : undefined,
  });

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
      <h3 className={styles.title}>{form.title}</h3>

      {field("name", form.fields.name, <input {...a11y("name")} required autoComplete="name" maxLength={120} />)}
      {field("business", form.fields.business, <input {...a11y("business")} required autoComplete="organization" maxLength={160} />)}
      {field(
        "type",
        form.fields.type,
        <select {...a11y("type")}>
          {form.businessTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>,
      )}
      {field("email", form.fields.email, <input {...a11y("email")} type="email" required autoComplete="email" maxLength={200} />)}
      {field("phone", form.fields.phone, <input {...a11y("phone")} type="tel" autoComplete="tel" maxLength={40} />)}

      {/* honeypot: hidden from people, bots fill it in */}
      <div className={styles.trap} aria-hidden="true">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Button type="submit" size="lg" block disabled={status === "sending"} aria-busy={status === "sending"} className={styles.submit}>
        {status === "sending" ? form.sending : form.submit}
      </Button>

      {(status === "error" || status === "rate_limited") && (
        <p className={styles.error} role="alert">
          {status === "rate_limited" ? form.rateLimited : `${form.error} ${form.errorFallback}`}{" "}
          <a href={`mailto:${email}`}>{email}</a>.
        </p>
      )}
      <p className={styles.note}>{form.note}</p>
    </form>
  );
}
