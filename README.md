# Devisyn landing page

One-page marketing site. Next.js (App Router) + TypeScript + CSS Modules. No UI or animation library, no database.

## Run it

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev                  # http://localhost:3000
npm run build && npm start   # production check
```

## Lead delivery (contact form)

Every submission goes to `app/api/lead/route.ts`, which validates it, rate-limits it (5 per 10 minutes per IP), and runs two deliveries in parallel: a row in your Google Sheet and an email to you. The visitor sees success if at least one worked. If both fail they see your email address as a fallback. With neither configured (local dev) the lead is logged to the server console instead.

### Environment variables

Put these in `.env.local` for local work and in Vercel (Project Settings, Environment Variables) for production. Never paste keys into chat or commit them. `.env.example` lists them all.

| Name | Required | What it does |
| --- | --- | --- |
| `RESEND_API_KEY` | For email | Resend API key (setup below). |
| `LEAD_TO_EMAIL` | For email | Where leads are emailed: `devisynstudio@gmail.com`. |
| `LEAD_FROM_EMAIL` | No | Sender. Defaults to `Devisyn Leads <onboarding@resend.dev>`. When you own a domain, verify it in Resend and change only this line. |
| `SHEET_WEBHOOK_URL` | For the sheet | The Apps Script Web app URL (setup below). |
| `SHEET_WEBHOOK_SECRET` | For the sheet | The same random string you put in the script's `SECRET` property. |
| `SHEET_URL` | No | Link to the sheet, shown as a button in the lead email. |

### 1. Google Sheet (free)

1. Go to sheets.google.com, signed in as devisynstudio@gmail.com, and create a blank sheet named **Devisyn Leads**. Copy its URL for `SHEET_URL`.
2. In the sheet: **Extensions > Apps Script**.
3. Delete the sample code and paste the whole of `docs/google-sheet-lead-script.gs`. Click **Save**.
4. Click the gear (**Project Settings**), scroll to **Script properties**, click **Add script property**. Name `SECRET`, value a long random string (for example 40 random letters and digits from a password manager). Save. Use the same string for `SHEET_WEBHOOK_SECRET`.
5. Click **Deploy > New deployment**, the gear next to "Select type", choose **Web app**. Set **Execute as: Me** and **Who has access: Anyone**. Click **Deploy** and approve the permissions (Google shows "unverified app" for your own script: Advanced > Go to project).
6. Copy the **Web app URL** (ends in `/exec`) into `SHEET_WEBHOOK_URL`. Opening it in a browser should show `{"ok":true,"service":"devisyn lead webhook"}`.
7. If you edit the script later, use **Deploy > Manage deployments > edit > New version**, otherwise the URL keeps running the old code.

The script creates a `Leads` tab with the columns Date, Name, Business, Type, Email, Phone, Source / UTM, Page, Status (starts as "New"), Notes. Requests without the secret are rejected.

### 2. Email with Resend (free tier)

1. Sign up at resend.com **with devisynstudio@gmail.com** (the default sender only delivers to the account owner's email).
2. In the dashboard open **API Keys > Create API Key**, permission **Sending access**, and copy the key (starts with `re_`). It is shown once. Put it in `RESEND_API_KEY`.
3. Leads arrive from `Devisyn Leads <onboarding@resend.dev>` with subject `New lead: {business} ({type})`. **Reply** goes to the lead (`reply_to`).

Switching to your own domain later: add the domain in Resend, add the DNS records it shows, then set `LEAD_FROM_EMAIL=Devisyn Leads <leads@yourdomain.com>`. No code change.

### 3. Optional: Google Analytics

If GA4 is installed on the page (`window.gtag`), a successful submission fires the `generate_lead` event with the business type and UTM tags. Nothing happens if GA is not there.

### Site URL and booking link

| Name | What it does |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The public URL. Canonical tags, sitemap, robots, Open Graph, JSON-LD and `llms.txt` all read it, so moving to a new domain is this one variable (then redeploy). Defaults to `https://devisyn.vercel.app`. |
| `NEXT_PUBLIC_BOOKING_URL` | Optional. When set, a "Book a 15-minute call" button appears next to the free check (hero, contact, footer, demo summary). Unset, the button is hidden. |

### Founder section

Add the photo as `public/brand/founder.jpg` (about 480 x 560, portrait). Until then the section shows initials. Set `founder.linkedin` in `content/site.ts` to show the LinkedIn link; empty hides it.

### What is captured per lead

Name, business, type, email, phone (optional), page URL, referrer, `utm_source` / `utm_medium` / `utm_campaign` (remembered from the landing URL for the visit), user agent, and a timestamp in America/Chicago.

## Where things live

- `content/site.ts`: every word of copy, plus the site URL. Prices, setup fees and the hero pill live here too.
- `styles/tokens.css`: colours, fonts, radii, shadows, spacing. `styles/animations.css`: all keyframes, all off under `prefers-reduced-motion`.
- `components/ui/`: primitives. `components/sections/`: one file per page section. `app/page.tsx` composes them.
- `app/api/lead/route.ts`: contact form endpoint with honeypot.
- SEO: `app/robots.ts`, `app/sitemap.ts`, `app/llms.txt/route.ts`, `app/opengraph-image.png`, brand kit in `public/brand/`, `lib/jsonld.ts`. See `SEO-NOTES.md`.

Client components (`"use client"`) are only the rotating word, hero call feed, services explorer, pricing toggle, FAQ accordion and contact form.

## Deploy to Vercel

1. Push the repo to GitHub and import it at vercel.com/new (framework is detected automatically).
2. Add the three env vars above under Project Settings, Environment Variables.
3. Deploy. If the domain is not `devisyn.vercel.app`, set `NEXT_PUBLIC_SITE_URL` (see below).
4. After deploy: test the form, run the Rich Results Test, submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Checks

`npm run build` passes. Lighthouse on `/` (local production build): SEO 100, accessibility 100, best practices 100, performance 100 desktop and 93 mobile.
