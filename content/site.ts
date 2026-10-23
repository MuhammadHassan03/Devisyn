export const SITE_URL = "https://devisyn.vercel.app";

export type Tone = "mint" | "peach" | "lilac";

export interface Service {
  n: string;
  name: string;
  short: string;
  /** starting price in USD */
  priceFrom: number;
  priceUnit: "mo" | "campaign";
  tone: Tone;
  headline: string;
  body: string;
  result: string;
  points: string[];
  chat: { from: "us" | "them"; text: string }[];
  bestFor: string;
}

export interface Plan {
  name: string;
  /** USD per month, billed monthly / billed yearly (per month) */
  priceMonthly: number;
  priceYearly: number;
  /** one-time setup fee in USD */
  setup: number;
  tone: "white" | "dark" | "lilac";
  blurb: string;
  features: string[];
  cta: string;
  badge?: string;
}

export const usd = (amount: number) => `$${amount.toLocaleString("en-US")}`;

export const servicePriceLabel = (s: Pick<Service, "priceFrom" | "priceUnit">) =>
  `from ${usd(s.priceFrom)}${s.priceUnit === "mo" ? "/mo" : " per campaign"}`;

export interface Industry {
  id: string;
  cta: string;
  name: string;
  menuLabel: string;
  audience: string;
  headline: string;
  /** name of the recommended entry in pricing.plans */
  plan: string;
  cards: { big: string; title: string; text: string; tone: "white" | "dark" }[];
}

export interface FeedEvent {
  tone: "miss" | "ok" | "dark";
  icon: string;
  label: string;
  text: string;
  clock: string;
}

export const site = {
  name: "Devisyn",

  seo: {
    title: "Devisyn: Never lose a call or lead again",
    description:
      "Devisyn answers the calls you miss, replies to new leads in under a minute, and books them into your calendar. Keep your number. Live in about a week.",
    keywords: [
      "missed call text back",
      "24/7 call answering",
      "instant lead reply",
      "appointment reminders",
      "Google review booster",
      "real estate lead follow-up",
    ],
  },

  nav: {
    services: {
      label: "Services",
      /** items are built from `services` below */
    },
    industries: { label: "Industries" },
    links: [
      { label: "Live demo", href: "#demo" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: { label: "Free call check", href: "#contact" },
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },

  hero: {
    pill: "Now taking 5 founding clients",
    headlineStart: "Never lose a",
    rotatingWords: ["call", "lead", "booking", "customer"],
    headlineEnd: "again.",
    body: "We answer the calls you miss, reply to new leads in under a minute, and book them straight into your calendar. Then we remind them, get you the review, and bring them back. You keep your number. You don't learn anything new.",
    primaryCta: { label: "Get my free missed-call check →", href: "#contact" },
    secondaryCta: { label: "See what you get", href: "#services" },
    checks: ["Live in about a week", "Keep your number", "Cancel any time"],
    badgeText: "ANSWERED IN 2 RINGS • DAY OR NIGHT • ",
    feedTitle: "Live · Riverwalk Dental",
    exampleTag: "example, plays on loop",
    quote: "“I can book that for you right now. Does Thursday at 10:30 work?”",
    feed: [
      { tone: "miss", icon: "!", label: "Missed call · 9:38 PM", text: "A new caller, after hours", clock: "9:38 PM" },
      { tone: "ok", icon: "☎", label: "Answered · ring 2", text: "Question answered, caller wants a slot", clock: "9:38 PM" },
      { tone: "ok", icon: "✓", label: "Booked", text: "New patient cleaning, Thu 10:30 AM", clock: "9:40 PM" },
      { tone: "dark", icon: "✉", label: "Texted", text: "Confirmation and reminder sent", clock: "9:40 PM" },
      { tone: "ok", icon: "★", label: "Day after visit", text: "Google review request sent", clock: "next day" },
    ] as FeedEvent[],
  },

  marquee: {
    label: "Free missed-call check. More booked jobs. Leads answered in 60 seconds.",
    top: ["FREE MISSED-CALL CHECK", "MORE BOOKED JOBS", "LEADS ANSWERED IN 60 SECONDS"],
    bottom: [
      "real estate teams",
      "dental clinics",
      "med spas",
      "chiropractors",
      "salons",
      "auto repair",
      "law firms",
      "home services",
    ],
  },

  stats: {
    eyebrow: "Where your sales leak",
    headlineStart: "Every unanswered ring is a customer",
    accent: "walking",
    headlineEnd: "to your competitor.",
    items: [
      { value: "27%", text: "of calls to small businesses go unanswered during business hours.", tone: "white" },
      { value: "40–60%", text: "go unanswered after hours, when people finally have time to call.", tone: "peach" },
      { value: "60–80%", text: "of callers who reach voicemail hang up and call someone else.", tone: "mint" },
    ] as { value: string; text: string; tone: "white" | "peach" | "mint" }[],
    source: "Figures from 2025–2026 small business call studies, summarized by Beancount (Aug 2026).",
  },

  servicesSection: {
    headlineStart: "Six ways we get you",
    accent: "more sales.",
    intro:
      "We set it up and run it for you. Start with one and add more later. Tap a service to see exactly what you get.",
    serviceLabel: "Service",
    resultLabel: "What you get",
    chatLabel: "What your customer sees",
    bestForLabel: "Best for:",
  },

  services: [
    {
      n: "01", name: "24/7 Call Answering", short: "Every call picked up, even after hours", priceFrom: 247, priceUnit: "mo", tone: "mint",
      headline: "Every call answered, even when you are busy or closed.",
      body: "When nobody picks up, we answer in a friendly, natural voice that knows your services, prices and hours, and book the appointment on the spot.",
      result: "Bookings from the calls you used to miss.",
      points: ["Picked up within 2 rings, day or night", "Appointments go straight into your calendar", "Urgent calls sent to you right away"],
      chat: [
        { from: "them", text: "“Hi, do you have anything open this week?”" },
        { from: "us", text: "“We do. Thursday at 10:30 or Friday at 2. Which works?”" },
      ],
      bestFor: "clinics, salons, law firms, home services, real estate",
    },
    {
      n: "02", name: "Missed-Call Text-Back", short: "Hang-ups get a text in seconds", priceFrom: 67, priceUnit: "mo", tone: "peach",
      headline: "Hang-ups get a friendly text before they call someone else.",
      body: "Anyone who hangs up or reaches voicemail gets a text within seconds with a way to book or ask a question.",
      result: "Customers who would have gone to a competitor, back in your calendar.",
      points: ["Sent within seconds of the missed call", "A booking link in every text", "All replies in one simple inbox"],
      chat: [
        { from: "us", text: "Sorry we missed you at Riverwalk Dental! Book here or reply with your question." },
        { from: "them", text: "Do you take Delta Dental?" },
      ],
      bestFor: "any business that misses calls while busy",
    },
    {
      n: "03", name: "Instant Lead Reply", short: "New leads answered in under a minute", priceFrom: 97, priceUnit: "mo", tone: "lilac",
      headline: "New leads hear back in under a minute, not tomorrow.",
      body: "Website forms, Facebook, Google and portal leads get an instant personal text and follow-ups until they answer.",
      result: "More of the leads you pay for turned into appointments.",
      points: ["Reply in under 60 seconds", "Follows up until they answer", "Works with your website and ad accounts"],
      chat: [
        { from: "them", text: "Form: “Thinking about selling my house this spring”" },
        { from: "us", text: "Hi Sam, thanks for reaching out! Want a free home value check? I have Tue 5 PM or Wed 11 AM." },
      ],
      bestFor: "real estate agents and anyone running ads",
    },
    {
      n: "04", name: "Appointment Reminders", short: "Fewer no-shows and empty slots", priceFrom: 67, priceUnit: "mo", tone: "mint",
      headline: "Fewer empty slots from people who simply forgot.",
      body: "Confirmations, reminders and one-tap rescheduling go out automatically, so a cancellation becomes a new booking instead of a gap.",
      result: "A fuller calendar without chasing anyone.",
      points: ["Confirmation right after booking", "Reminders the day before and same day", "One-tap reschedule"],
      chat: [
        { from: "us", text: "Reminder: your showing at 42 Elm St is tomorrow at 10:30. Reply C to confirm or R to reschedule." },
        { from: "them", text: "C" },
      ],
      bestFor: "appointment-based businesses and showings",
    },
    {
      n: "05", name: "Google Review Booster", short: "More 5-star reviews every month", priceFrom: 67, priceUnit: "mo", tone: "peach",
      headline: "More 5-star Google reviews, asked at the right moment.",
      body: "After each visit or closing, happy customers get a short text with a direct link to your Google review page. Unhappy ones reach you privately first.",
      result: "Rank higher on Google and win more first-time customers.",
      points: ["Sent automatically after every visit", "Direct link to your Google review page", "Problems come to you privately first"],
      chat: [
        { from: "us", text: "Thanks for coming in today, Maria! Would you leave us a quick Google review?" },
        { from: "them", text: "Done, you guys were great!" },
      ],
      bestFor: "anyone competing on Google Maps",
    },
    {
      n: "06", name: "Past Customer Win-Back", short: "Old customers booking again", priceFrom: 347, priceUnit: "campaign", tone: "lilac",
      headline: "Bring back customers who have not booked in months.",
      body: "We text your past customers or old leads with a personal check-in and a reason to come back, and handle replies until they book.",
      result: "New sales from the list you already have, with no ad spend.",
      points: ["Uses the customer list you already have", "Personal, not spammy, messages", "Replies handled and booked for you"],
      chat: [
        { from: "us", text: "Hi James, it has been a year since you bought on Oak Ave. Curious what your home is worth now?" },
        { from: "them", text: "Actually yes, we might sell next year." },
      ],
      bestFor: "real estate databases and businesses with past customers",
    },
  ] as Service[],

  industries: {
    eyebrow: "Industries",
    headlineStart: "Built for how your business",
    accent: "gets customers.",
    recommendedLabel: "Recommended plan",
    items: [
      {
        id: "real-estate",
        cta: "Get the real estate setup →",
        name: "Real estate",
        menuLabel: "Real estate",
        audience: "Real estate agents and teams",
        headline: "More showings and listings from leads you already paid for.",
        plan: "Complete",
        cards: [
          { big: "60 sec", title: "Every portal lead answered", tone: "white", text: "Zillow, Realtor.com, Facebook ads, website forms and sign calls get a reply in under a minute, before they call the next agent." },
          { big: "24/7", title: "Showings booked for you", tone: "white", text: "Buyers and sellers are asked the right questions and booked straight into your calendar, even while you're at a closing." },
          { big: "Old list", title: "Turned into new listings", tone: "dark", text: "We text your past leads and clients with a friendly check-in and hand you the ones thinking about buying or selling." },
        ],
      },
      {
        id: "dental-medical",
        cta: "Get the dental & medical setup →",
        name: "Dental & medical",
        menuLabel: "Dental & medical",
        audience: "Dental and medical clinics",
        headline: "New patients book with whoever answers first.",
        plan: "Growth",
        cards: [
          { big: "24/7", title: "New patients booked after hours", tone: "white", text: "After-hours new-patient calls are answered and booked into your schedule while the office is closed." },
          { big: "Fewer", title: "No-shows", tone: "white", text: "Appointment reminders cut no-shows so the day stays full." },
          { big: "5-star", title: "A Google review after every visit", tone: "dark", text: "Happy patients get a short text with a direct link, right after they leave." },
        ],
      },
      {
        id: "med-spas-salons",
        cta: "Get the med spa & salon setup →",
        name: "Med spas & salons",
        menuLabel: "Med spas & salons",
        audience: "Med spas and salons",
        headline: "Fill the chair, not the voicemail.",
        plan: "Complete",
        cards: [
          { big: "0 missed", title: "Bookings taken while you're with a client", tone: "white", text: "Calls and messages are answered and booked while your hands are busy." },
          { big: "Rebook", title: "Reminders that bring clients back", tone: "white", text: "Friendly rebooking reminders go out when it is time for the next visit." },
          { big: "90 days", title: "Win back clients who haven't visited", tone: "dark", text: "We text clients who have not been in for 90 days and book the ones who reply." },
        ],
      },
      {
        id: "home-services",
        cta: "Get the home services setup →",
        name: "Home services",
        menuLabel: "Home services",
        audience: "Home service companies (HVAC, plumbing, roofing)",
        headline: "The first company to answer gets the job.",
        plan: "Growth",
        cards: [
          { big: "24/7", title: "Emergency calls answered and flagged to you", tone: "white", text: "Urgent calls are answered at any hour and sent to you right away with a short summary." },
          { big: "60 sec", title: "Ad and form leads replied to", tone: "white", text: "Leads from your ads and website forms get a personal text in under a minute." },
          { big: "5-star", title: "A review after every job", tone: "dark", text: "Every finished job gets a text asking for a Google review." },
        ],
      },
      {
        id: "auto-repair",
        cta: "Get the auto repair setup →",
        name: "Auto repair",
        menuLabel: "Auto repair",
        audience: "Auto repair shops",
        headline: "Keep every bay full.",
        plan: "Growth",
        cards: [
          { big: "Answered", title: "Calls picked up while techs are busy", tone: "white", text: "Nobody has to drop a wrench to catch the phone, and every caller gets an answer." },
          { big: "Due", title: "Service-due reminders", tone: "white", text: "Customers get a text when their next service is due, with a way to book." },
          { big: "5-star", title: "Reviews after every visit", tone: "dark", text: "Each finished repair gets a quick text asking for a Google review." },
        ],
      },
      {
        id: "law-firms",
        cta: "Get the law firm setup →",
        name: "Law firms",
        menuLabel: "Law firms",
        audience: "Law firms",
        headline: "Every intake call could be a case.",
        plan: "Growth",
        cards: [
          { big: "24/7", title: "Intake calls answered and qualified", tone: "white", text: "Callers are answered at any hour and asked the questions your team needs." },
          { big: "Urgent", title: "Urgent matters sent to you right away", tone: "white", text: "You set the rules, and time-sensitive matters reach you with a short summary." },
          { big: "Booked", title: "Consultations booked", tone: "dark", text: "Qualified callers are booked straight into your calendar." },
        ],
      },
    ] as Industry[],
  },

  journey: {
    eyebrow: "How it fits together",
    headlineStart: "From first call to",
    accent: "repeat customer,",
    headlineEnd: "handled for you.",
    steps: [
      { title: "They call", text: "Answered in 2 rings", tone: "mint" },
      { title: "Or fill a form", text: "Texted within 60 seconds", tone: "mint" },
      { title: "They book", text: "Straight into your calendar", tone: "peach" },
      { title: "They show up", text: "Reminders cut no-shows", tone: "peach" },
      { title: "They review", text: "Asked at the right moment", tone: "lilac" },
      { title: "They come back", text: "Win-back texts months later", tone: "lilac" },
    ] as { title: string; text: string; tone: Tone }[],
  },

  comparison: {
    headlineStart: "Same business,",
    accent: "more",
    headlineEnd: "sales.",
    beforeLabel: "Today",
    afterLabel: "With Devisyn",
    before: [
      "Calls ring out while you're with a customer",
      "Web and ad leads wait hours for a reply",
      "No-shows leave empty slots",
      "Happy customers never leave a review",
      "Past customers quietly drift away",
    ],
    after: [
      "Every call answered, day or night",
      "Every new lead texted in under a minute",
      "Reminders keep your calendar full",
      "More 5-star Google reviews every month",
      "Past customers booking again",
    ],
  },

  pricing: {
    headlineStart: "Simple plans.",
    accent: "No surprises.",
    monthly: "Monthly",
    yearly: "Yearly · save 10%",
    billedMonthly: "billed monthly, cancel any time",
    billedYearly: "billed yearly, 10% off",
    perMonth: "/mo",
    footnote:
      "One-time setup: $350 Starter, $1,050 Growth, $1,750 Complete. Phone line and call minutes billed at cost. Month to month, no contracts. Real estate teams of 3+ agents: ask about team pricing.",
    plans: [
      {
        name: "Starter", priceMonthly: 147, priceYearly: 132, setup: 350, tone: "white", blurb: "Stop losing people who already reached out.",
        features: ["Missed-call text-back", "Instant lead reply", "Weekly report of every lead caught"],
        cta: "Start with Starter",
      },
      {
        name: "Growth", priceMonthly: 277, priceYearly: 249, setup: 1050, tone: "dark", blurb: "Every call answered and every booking kept.", badge: "Most popular",
        features: ["Everything in Starter", "24/7 call answering", "Appointment reminders", "A short summary after every call"],
        cta: "Choose Growth",
      },
      {
        name: "Complete", priceMonthly: 557, priceYearly: 501, setup: 1750, tone: "lilac", blurb: "All six services, working together.",
        features: ["Everything in Growth", "Google review booster", "Past customer win-back", "Monthly results call"],
        cta: "Talk to us",
      },
    ] as Plan[],
  },

  faq: {
    headlineStart: "Questions?",
    accent: "Answers.",
    items: [
      { q: "Who actually answers my calls?", a: "A virtual receptionist we set up and train on your business. It sounds natural, follows your rules, and if a caller asks, it tells them it is automated." },
      { q: "Do I need a new phone number?", a: "No. Calls you do not pick up forward to us from the number you already have. Nothing changes for your customers." },
      { q: "Can I start with just one service?", a: "Yes. Most businesses start with call answering or text-back and add reviews, reminders and win-back later." },
      { q: "Do you work with real estate agents?", a: "Yes. We answer portal and ad leads in under a minute, book showings, and turn your old database into new listing conversations." },
      { q: "What if a call needs me personally?", a: "You set the rules. Urgent calls are sent to you right away with a short summary." },
      { q: "How fast can I go live?", a: "About a week: one call to learn your business, a few days to set up and test, then you are live." },
      { q: "Will this spam my customers?", a: "No. We only reply to people who contacted you and check in with customers who already know you. Anyone can opt out with one word." },
    ],
  },

  contact: {
    email: "devisynstudio@gmail.com",
    linkedin: "https://linkedin.com/company/devisynstudio",
    instagram: "https://www.instagram.com/devisynstudio/",
    eyebrow: "Free, no commitment",
    headlineStart: "See how many customers you're",
    accent: "missing.",
    body: "We call your business after hours, test your website form, and send you a short report of every place you're losing sales. Free, in 2 business days.",
    checks: ["A recording of what your callers hear", "How fast your leads get a reply", "The 3 fixes worth the most money"],
    badgeText: "FREE CHECK • 2 MINUTES • NO COMMITMENT • ",
    form: {
      title: "Get my free check",
      fields: {
        name: "Your name",
        business: "Business name",
        type: "Type of business",
        email: "Email",
        phone: "Business phone (we'll test it)",
      },
      businessTypes: [
        "Real estate agent or team",
        "Dental or medical clinic",
        "Med spa or salon",
        "Home services",
        "Auto repair",
        "Law firm",
        "Other",
      ],
      submit: "Send me my free report →",
      sending: "Sending…",
      fieldErrors: {
        required: "This field is required.",
        invalid: "Please check this one.",
        invalidEmail: "Enter a valid email address.",
        invalidPhone: "Enter a phone number, or leave it empty.",
        tooLong: "That is too long.",
      },
      error: "We couldn't send that just now.",
      errorFallback: "Please email us directly at",
      rateLimited: "That is a lot of tries in a row. Please wait a few minutes, or email us directly at",
      note: "No spam. We only use this to send your report.",
      successTitle: "You're on the list.",
      successText: "We'll send your free report within 2 business days.",
    },
  },

  demo: {
    id: "demo",
    pill: "Simulated demo",
    headlineStart: "Watch it handle a",
    accent: "customer.",
    intro: "Pick a business and a situation, press play, and watch the whole sequence run. Everything below is scripted for illustration.",
    industryLabel: "Business type",
    scenarioLabel: "Situation",
    scenarios: [
      { id: "after-hours", label: "After-hours call" },
      { id: "web-lead", label: "Website lead" },
      { id: "no-show", label: "No-show risk" },
    ] as { id: ScenarioId; label: string }[],
    play: "Play",
    replay: "Replay",
    playing: "Playing…",
    idlePhone: "Press play to start",
    phoneFooter: "Simulated demo, not a real customer",
    timelineTitle: "What happens, step by step",
    timelineEmpty: "The timeline fills in as the demo runs.",
    summary: { booked: "Booked", rebooked: "Rebooked", reply: "Time to reply", staff: "Staff time", staffValue: "0 min" },
    cta: { label: "Get this for my business", href: "#contact" },
  },

  calculator: {
    id: "calculator",
    eyebrow: "The numbers",
    headlineStart: "What missed calls",
    accent: "cost you.",
    intro: "Move the sliders to match your business. The starting values are editable estimates, not promises.",
    industryLabel: "Business type",
    callsLabel: "Calls per week",
    missedLabel: "Calls you miss",
    bookLabel: "Callers who would have booked",
    valueLabel: "Average customer value",
    realEstateValueHint: "Real estate preset: typical commission",
    sourceNote: "27% is the small business figure from the call studies cited above.",
    outputs: {
      customers: "Customers lost per month",
      month: "Revenue lost per month",
      year: "Revenue lost per year",
    },
    breakEvenPlan: "Growth",
    breakEven: { lead: "Devisyn", middle: "pays for itself after", one: "customer", many: "customers" },
    formula:
      "Customers lost per month = calls per week × 52 ÷ 12 × % missed × % who would have booked. Revenue lost = customers lost × average customer value. Break-even = Growth monthly price ÷ average customer value, rounded up.",
    defaults: { calls: 60, missed: 27, book: 30 },
    values: {
      "real-estate": 8000,
      "dental-medical": 250,
      "med-spas-salons": 200,
      "home-services": 450,
      "auto-repair": 350,
      "law-firms": 1500,
    } as Record<string, number>,
    cta: { label: "Stop the leak: get my free check →", href: "#contact" },
  },

  footer: {
    ctaTitle: "Ready to stop losing customers?",
    cta: { label: "Get my free check", href: "#contact" },
    tagline: "More booked customers from the calls and leads you already get.",
    columns: {
      services: "Services",
      industries: "Industries",
      company: "Company",
      contact: "Contact",
    },
    company: [
      { label: "Live demo", href: "#demo" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
    copyEmail: "Copy email",
    copied: "Copied",
    legal: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
    copyright: "© 2026 Devisyn",
    backToTop: "Back to top ↑",
  },

  legal: {
    updated: "Last updated: 24 October 2026",
    privacy: {
      title: "Privacy policy",
      description: "What Devisyn collects through its website, why, and how to ask us to delete it.",
      sections: [
        {
          heading: "What we collect",
          body: [
            "If you use the contact form on this site we collect what you type into it: your name, business name, type of business, email address and, if you choose to give it, your business phone number.",
            "Like most websites, our hosting provider records basic technical data when you visit, such as IP address, browser type and the pages requested. We also use privacy-friendly analytics that count visits (pages viewed, country, device type) without cookies and without identifying you personally.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your form details only to respond to your request, which is usually sending you the free missed-call report and following up about it. We do not sell your information and we do not send marketing to people who have not asked for it.",
          ],
        },
        {
          heading: "Where it goes",
          body: [
            "Form submissions are sent to us by email through our email delivery provider. We do not keep them in a database on this site. They stay in our inbox until we delete them.",
            "This site is hosted on Vercel. The hosting, email and analytics providers process data on our behalf.",
          ],
        },
        {
          heading: "How long we keep it",
          body: ["We keep form emails for as long as we need them to deal with your request or run the work you asked us to do, then delete them."],
        },
        {
          heading: "Your choices and deletion requests",
          body: [
            "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Email devisynstudio@gmail.com from the address you used and we will act on it.",
          ],
        },
        {
          heading: "Contact",
          body: ["Questions about this policy: devisynstudio@gmail.com."],
        },
      ],
    },
    terms: {
      title: "Terms of use",
      description: "The plain-language terms for using the Devisyn website.",
      sections: [
        {
          heading: "Using this site",
          body: [
            "This website describes Devisyn's services. You can browse it and use the contact form for genuine enquiries. Please do not misuse the form, try to break the site or send spam.",
          ],
        },
        {
          heading: "No promise of results",
          body: [
            "The numbers and examples on this site, including the calculator and the live demo, are illustrations. The live demo is simulated and the calculator uses editable estimates. Real results depend on your business, so nothing here is a guarantee of revenue or bookings.",
          ],
        },
        {
          heading: "Pricing and services",
          body: [
            "Prices shown are the current published prices and can change. Anything we agree with you for paid work is set out in the terms we agree with you directly, not on this page.",
          ],
        },
        {
          heading: "Our content",
          body: ["The text, design and brand on this site belong to Devisyn. Please ask before reusing them."],
        },
        {
          heading: "Changes and contact",
          body: ["We may update these terms and the date above will change when we do. Questions: devisynstudio@gmail.com."],
        },
      ],
    },
  },
};

export type ScenarioId = "after-hours" | "web-lead" | "no-show";

export interface DemoSlot {
  day: string;
  time: string;
}

export type DemoStepKind = "call" | "transcript" | "lead" | "text" | "slot";

export interface DemoStep {
  kind: DemoStepKind;
  /** ms to wait after the previous step finishes */
  after: number;
  /** simulated clock label */
  clock: string;
  label: string;
  text: string;
  from?: "us" | "them";
  speaker?: "caller" | "agent";
  slot?: DemoSlot;
  /** slot being freed when a booking moves */
  moved?: DemoSlot;
  /** the event "Time to reply" is measured from */
  trigger?: boolean;
  /** the first reply, where "Time to reply" stops */
  reply?: boolean;
}

export interface DemoScript {
  business: string;
  calendar: { days: string[]; times: string[]; busy: DemoSlot[]; booked?: DemoSlot };
  steps: DemoStep[];
  summaryLabel: "booked" | "rebooked";
}

interface DemoIndustry {
  business: string;
  customer: string;
  days: string[];
  times: string[];
  busy: DemoSlot[];
  call: { service: string; ask: string; offer: string; pick: string; slot: DemoSlot };
  lead: { service: string; source: string; message: string; reply: string; pick: string; slot: DemoSlot };
  noShow: { service: string; first: DemoSlot; cant: string; offer: string; pick: string; slot: DemoSlot };
  review: string;
  reviewReply: string;
}

const at = (day: string, time: string): DemoSlot => ({ day, time });
const slotText = (s: DemoSlot) => `${s.day} ${s.time}`;

const DEMO_INDUSTRIES: Record<string, DemoIndustry> = {
  "dental-medical": {
    business: "Riverwalk Dental", customer: "Alex",
    days: ["Tue", "Wed", "Thu", "Fri"], times: ["9:00 AM", "10:30 AM", "1:00 PM", "2:00 PM"],
    busy: [at("Tue", "9:00 AM"), at("Wed", "10:30 AM"), at("Fri", "10:30 AM")],
    call: { service: "New patient cleaning", ask: "Hi, I'm new in town and need a cleaning. Do you have anything this week?", offer: "We do. Thursday at 10:30 or Friday at 2:00. Which works better?", pick: "Thursday at 10:30, please.", slot: at("Thu", "10:30 AM") },
    lead: { service: "First visit and cleaning", source: "Website form", message: "“Looking for a new dentist. Anything open this week?”", reply: "Hi Alex, thanks for reaching out to Riverwalk Dental! I can book your first visit. Thursday 10:30 or Friday 2:00?", pick: "Thursday works.", slot: at("Thu", "10:30 AM") },
    noShow: { service: "Cleaning", first: at("Thu", "10:30 AM"), cant: "I can't make Thursday, sorry!", offer: "No problem! I have Friday at 2:00 PM or Tuesday at 1:00 PM. Which is better?", pick: "Friday at 2:00.", slot: at("Fri", "2:00 PM") },
    review: "Thanks for coming in, Alex! Would you leave us a quick Google review?", reviewReply: "Done, great team!",
  },
  "real-estate": {
    business: "Harper Realty", customer: "Sam",
    days: ["Fri", "Sat", "Sun", "Mon"], times: ["10:00 AM", "11:00 AM", "1:00 PM", "3:30 PM"],
    busy: [at("Fri", "3:30 PM"), at("Sat", "10:00 AM"), at("Sun", "3:30 PM")],
    call: { service: "Showing at 42 Elm St", ask: "Hi, I saw the sign at 42 Elm St. Can I see it this weekend?", offer: "Yes! Saturday at 11:00 or Sunday at 1:00. Which works?", pick: "Saturday at 11:00.", slot: at("Sat", "11:00 AM") },
    lead: { service: "Showing at 42 Elm St", source: "Zillow lead", message: "“Is 42 Elm St still available?”", reply: "Hi Sam, yes it is! I can show it Saturday at 11:00 or Sunday at 1:00. Which suits you?", pick: "Sunday at 1:00 works.", slot: at("Sun", "1:00 PM") },
    noShow: { service: "Showing at 42 Elm St", first: at("Sat", "11:00 AM"), cant: "Something came up, I can't do Saturday.", offer: "No worries! Sunday at 1:00 PM or Monday at 10:00 AM?", pick: "Sunday at 1:00.", slot: at("Sun", "1:00 PM") },
    review: "Thanks for touring 42 Elm St, Sam! If you have a minute, a quick Google review would mean a lot.", reviewReply: "Happy to, you were great to work with!",
  },
  "med-spas-salons": {
    business: "Glow Med Spa", customer: "Maria",
    days: ["Wed", "Thu", "Fri", "Sat"], times: ["10:00 AM", "12:00 PM", "2:30 PM", "4:00 PM"],
    busy: [at("Wed", "12:00 PM"), at("Thu", "10:00 AM"), at("Sat", "12:00 PM")],
    call: { service: "Facial", ask: "Hi, I'd like to book a facial before my event on Saturday.", offer: "Lovely! I have Friday at 2:30 or Saturday at 10:00. Which works?", pick: "Friday at 2:30, please.", slot: at("Fri", "2:30 PM") },
    lead: { service: "Hydrafacial", source: "Instagram message", message: "“Do you have any openings this week for a hydrafacial?”", reply: "Hi Maria, thanks for messaging Glow Med Spa! I have Thursday at 12:00 or Friday at 4:00. Which works?", pick: "Thursday at 12:00!", slot: at("Thu", "12:00 PM") },
    noShow: { service: "Facial", first: at("Fri", "2:30 PM"), cant: "I need to move my facial, sorry!", offer: "Of course! I have Saturday at 10:00 AM or Thursday at 4:00 PM.", pick: "Saturday at 10:00.", slot: at("Sat", "10:00 AM") },
    review: "Thanks for visiting Glow, Maria! Would you share a quick Google review?", reviewReply: "Absolutely, loved it!",
  },
  "home-services": {
    business: "Northside Home Services", customer: "Chris",
    days: ["Tue", "Wed", "Thu", "Fri"], times: ["8:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"],
    busy: [at("Tue", "8:00 AM"), at("Wed", "1:00 PM"), at("Thu", "3:00 PM")],
    call: { service: "Emergency water heater visit", ask: "Hi, my water heater is leaking all over the garage.", offer: "I'm sorry, that sounds stressful. Please shut off the water to it. I've flagged this as urgent for our on-call tech. Can we send someone Wednesday at 8:00 AM?", pick: "Yes, please.", slot: at("Wed", "8:00 AM") },
    lead: { service: "AC replacement estimate", source: "Google Ads lead", message: "“Need a quote to replace my AC before the weekend.”", reply: "Hi Chris, thanks for contacting Northside Home Services! I can book an estimate Thursday at 10:00 or Friday at 1:00. Which works?", pick: "Thursday at 10:00.", slot: at("Thu", "10:00 AM") },
    noShow: { service: "AC estimate", first: at("Tue", "10:00 AM"), cant: "Can we do later in the day?", offer: "Sure! I have Tuesday at 3:00 PM or Wednesday at 10:00 AM.", pick: "Tuesday at 3:00.", slot: at("Tue", "3:00 PM") },
    review: "Thanks for choosing Northside, Chris! How did we do? A quick Google review helps a lot.", reviewReply: "Great service, thank you!",
  },
  "auto-repair": {
    business: "Eastside Auto Care", customer: "Dana",
    days: ["Mon", "Tue", "Wed", "Thu"], times: ["8:00 AM", "9:30 AM", "12:00 PM", "3:00 PM"],
    busy: [at("Mon", "8:00 AM"), at("Wed", "12:00 PM"), at("Thu", "9:30 AM")],
    call: { service: "Diagnostic", ask: "Hi, my check engine light came on and the car is shaking. Can you look at it?", offer: "We can. Tuesday at 8:00 or Wednesday at 9:30. Which works?", pick: "Tuesday at 8:00.", slot: at("Tue", "8:00 AM") },
    lead: { service: "Brake inspection", source: "Website form", message: "“Need my brakes checked. They squeal when I stop.”", reply: "Hi Dana, thanks for contacting Eastside Auto Care! I can fit in a brake inspection Wednesday at 9:30 or Thursday at 3:00. Which works?", pick: "Wednesday at 9:30.", slot: at("Wed", "9:30 AM") },
    noShow: { service: "Oil change and inspection", first: at("Tue", "12:00 PM"), cant: "Running late today, can we move it?", offer: "Sure. I have Tuesday at 3:00 PM or Wednesday at 8:00 AM.", pick: "Tuesday at 3:00.", slot: at("Tue", "3:00 PM") },
    review: "Thanks for trusting Eastside Auto Care, Dana! Would you leave us a quick Google review?", reviewReply: "Done, fast and fair!",
  },
  "law-firms": {
    business: "Hale & Partners Law", customer: "Jordan",
    days: ["Mon", "Tue", "Wed", "Thu"], times: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    busy: [at("Mon", "2:00 PM"), at("Tue", "11:00 AM"), at("Thu", "9:00 AM")],
    call: { service: "Consultation: car accident", ask: "Hi, I was in a car accident last week and I need to speak with a lawyer.", offer: "I'm sorry to hear that. I've noted the details and flagged it as urgent for the attorney. Can we book a consultation Monday at 9:00 or Tuesday at 2:00?", pick: "Monday at 9:00.", slot: at("Mon", "9:00 AM") },
    lead: { service: "Consultation: landlord dispute", source: "Website form", message: "“I need help with a landlord dispute.”", reply: "Hi Jordan, thanks for contacting Hale & Partners. I can book a consultation Tuesday at 2:00 or Wednesday at 11:00. Which works?", pick: "Tuesday at 2:00.", slot: at("Tue", "2:00 PM") },
    noShow: { service: "Consultation", first: at("Mon", "11:00 AM"), cant: "I have to reschedule, work came up.", offer: "No problem. I have Wednesday at 4:00 PM or Thursday at 11:00 AM.", pick: "Wednesday at 4:00.", slot: at("Wed", "4:00 PM") },
    review: "Thanks for meeting with us, Jordan. If you're comfortable, a Google review helps others find help.", reviewReply: "Sure, you were very kind.",
  },
};

const confirmText = (i: DemoIndustry, service: string, slot: DemoSlot) =>
  `Hi ${i.customer}, you're booked: ${service}, ${slotText(slot)} at ${i.business}. Reply C to confirm.`;
const reminderText = (service: string, slot: DemoSlot) =>
  `Reminder: ${service} is ${slotText(slot)}. Reply R to reschedule.`;

/** Builds the scripted sequence for one business type and situation. */
export function buildDemoScript(industryId: string, scenario: ScenarioId): DemoScript {
  const i = DEMO_INDUSTRIES[industryId];
  const base = { business: i.business, calendar: { days: i.days, times: i.times, busy: i.busy } };

  const wrapUp = (service: string, slot: DemoSlot): DemoStep[] => [
    { kind: "slot", after: 700, clock: "9:40 PM", label: "Calendar updated", text: `${service}, ${slotText(slot)}`, slot },
    { kind: "text", after: 900, clock: "9:40 PM", label: "Confirmation sent", text: confirmText(i, service, slot), from: "us" },
    { kind: "text", after: 1400, clock: "Day before", label: "Reminder sent", text: reminderText(service, slot), from: "us" },
    { kind: "text", after: 1600, clock: "Day after", label: "Review request sent", text: i.review, from: "us" },
    { kind: "text", after: 1200, clock: "Day after", label: "Customer replied", text: i.reviewReply, from: "them" },
  ];

  if (scenario === "after-hours") {
    const c = i.call;
    return {
      ...base,
      summaryLabel: "booked",
      steps: [
        { kind: "call", after: 500, clock: "9:38 PM", label: "Incoming call", text: `New caller, after hours. ${i.business} is closed.`, trigger: true },
        { kind: "transcript", after: 5000, clock: "9:38 PM", label: "Answered in 2 rings", text: `Thanks for calling ${i.business}, this is the virtual assistant. How can I help?`, speaker: "agent", reply: true },
        { kind: "transcript", after: 500, clock: "9:38 PM", label: "Caller", text: c.ask, speaker: "caller" },
        { kind: "transcript", after: 400, clock: "9:39 PM", label: "Assistant", text: c.offer, speaker: "agent" },
        { kind: "transcript", after: 400, clock: "9:39 PM", label: "Caller", text: c.pick, speaker: "caller" },
        ...wrapUp(c.service, c.slot),
      ],
    };
  }

  if (scenario === "web-lead") {
    const l = i.lead;
    return {
      ...base,
      summaryLabel: "booked",
      steps: [
        { kind: "lead", after: 500, clock: "9:38 PM", label: `New lead · ${l.source}`, text: l.message, trigger: true },
        { kind: "text", after: 8000, clock: "9:38 PM", label: "Texted back", text: l.reply, from: "us", reply: true },
        { kind: "text", after: 1500, clock: "9:39 PM", label: "Customer replied", text: l.pick, from: "them" },
        ...wrapUp(l.service, l.slot),
      ],
    };
  }

  const n = i.noShow;
  return {
    ...base,
    calendar: { ...base.calendar, booked: n.first },
    summaryLabel: "rebooked",
    steps: [
      { kind: "text", after: 600, clock: "Day before", label: "Reminder sent", text: `Reminder: ${n.service} is ${slotText(n.first)}. Reply C to confirm or R to reschedule.`, from: "us" },
      { kind: "text", after: 2500, clock: "Day before", label: "Customer replied: can't make it", text: n.cant, from: "them", trigger: true },
      { kind: "text", after: 7000, clock: "Day before", label: "New times offered", text: n.offer, from: "us", reply: true },
      { kind: "text", after: 1500, clock: "Day before", label: "Customer replied", text: n.pick, from: "them" },
      { kind: "slot", after: 700, clock: "Day before", label: "Calendar updated", text: `Moved to ${slotText(n.slot)}. The old slot is free again.`, slot: n.slot, moved: n.first },
      { kind: "text", after: 900, clock: "Day before", label: "Confirmation sent", text: confirmText(i, n.service, n.slot), from: "us" },
      { kind: "text", after: 1600, clock: "Day after", label: "Review request sent", text: i.review, from: "us" },
      { kind: "text", after: 1200, clock: "Day after", label: "Customer replied", text: i.reviewReply, from: "them" },
    ],
  };
}
