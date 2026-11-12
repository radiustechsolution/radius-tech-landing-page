export type Testimonial = {
  quote: string;
  name: string;
  /** Leave empty ("") if you don't want to show a role */
  role: string;
  company: string;
  /** Only approved testimonials are shown on the website */
  approved: boolean;
};

/*
 * DRAFT quotes: send each one to the client to approve or edit.
 * Set `approved: true` ONLY after they confirm the wording
 * and that they're happy for their name and company to be shown.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Radius Tech built our app and backend and set up our cloud infrastructure. They were reliable, communicated clearly and delivered a product we're proud of.",
    name: "David Nkanta",
    role: "CEO", // TODO: e.g. "Founder" or "CEO"
    company: "DeepPaya",
    approved: false,
  },
  {
    quote:
      "From virtual accounts to transfers and bill payments, Radius Tech delivered a complete banking app and landing page. Professional from start to finish.",
    name: "Bassey Jeremiah",
    role: "CEO",
    company: "DuraPay",
    approved: false,
  },
  {
    quote:
      "Radius Tech built our web platform, mobile app and API. They took our savings idea and turned it into a secure product our users trust.",
    name: "Jude Okoebor",
    role: "CEO",
    company: "SecureVest",
    approved: false,
  },
  {
    quote:
      "Our customers can now buy airtime, data and pay bills in seconds. Radius Tech understood exactly what we needed and delivered a fast, stable app.",
    name: "Kenneth Nnamdi",
    role: "CEO",
    company: "HenzPay",
    approved: false,
  },
];
