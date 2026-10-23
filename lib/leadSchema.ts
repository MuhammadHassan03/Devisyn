/** Lead validation shared by the browser (inline errors) and the API route (the real check). */

export const LEAD_FIELDS = ["name", "business", "type", "email", "phone"] as const;
export type LeadField = (typeof LEAD_FIELDS)[number];

export interface LeadValues {
  name: string;
  business: string;
  type: string;
  email: string;
  phone: string;
}

export type LeadErrors = Partial<Record<LeadField, "required" | "invalid" | "tooLong">>;

const MAX = { name: 120, business: 160, type: 80, email: 200, phone: 40 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[0-9+()\-.\s]{5,40}$/;

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max + 1) : "";

/** Trims, length-limits and checks one submission. `types` is the list of allowed business types. */
export function validateLead(input: Record<string, unknown>, types: readonly string[]) {
  const values = {} as LeadValues;
  const errors: LeadErrors = {};

  for (const field of LEAD_FIELDS) {
    const value = clean(input[field], MAX[field]);
    values[field] = value.slice(0, MAX[field]);
    if (value.length > MAX[field]) errors[field] = "tooLong";
    else if (!value && field !== "phone") errors[field] = "required";
  }

  if (!errors.email && !EMAIL.test(values.email)) errors.email = "invalid";
  if (!errors.phone && values.phone && !PHONE.test(values.phone)) errors.phone = "invalid";
  if (!errors.type && !types.includes(values.type)) errors.type = "invalid";

  return { values, errors, ok: Object.keys(errors).length === 0 };
}

/** Where the lead came from, captured in the browser and passed through the API untouched except for trimming. */
export interface LeadContext {
  page: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

const CONTEXT_MAX = 500;

export function cleanContext(input: Record<string, unknown>): LeadContext {
  const text = (key: string) => clean(input[key], CONTEXT_MAX).slice(0, CONTEXT_MAX);
  return {
    page: text("page"),
    referrer: text("referrer"),
    utmSource: text("utmSource"),
    utmMedium: text("utmMedium"),
    utmCampaign: text("utmCampaign"),
  };
}
