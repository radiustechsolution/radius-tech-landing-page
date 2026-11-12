export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

/*
 * Add REAL quotes from your clients here.
 * Ask each client for 1–3 sentences about working with you,
 * and confirm they're happy for their name and company to be shown.
 *
 * Leave this array empty ([]) to hide the section until you have them.
 */
export const testimonials: Testimonial[] = [
  {
    quote: "Placeholder: paste a real quote from your DeepPaya client here.",
    name: "Client Name",
    role: "Role",
    company: "DeepPaya",
  },
  {
    quote: "Placeholder: paste a real quote from your DuraPay client here.",
    name: "Client Name",
    role: "Role",
    company: "DuraPay",
  },
  {
    quote: "Placeholder: paste a real quote from your SecureVest client here.",
    name: "Client Name",
    role: "Role",
    company: "SecureVest",
  },
  {
    quote: "Placeholder: paste a real quote from your HenzPay client here.",
    name: "Client Name",
    role: "Role",
    company: "HenzPay",
  },
];
