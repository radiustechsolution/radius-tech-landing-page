export const site = {
  name: "Radius Tech Solutions Limited",
  shortName: "Radius",
  url: "https://radiustechsolutions.com",
  description:
    "Radius Tech Solutions Limited builds smart digital products that help businesses streamline operations, scale faster, and achieve measurable growth.",

  // Calls
  phone: "+234 814 131 4105",
  phoneHref: "tel:+2348141314105",

  // WhatsApp
  whatsappNumber: "+234 816 820 8565",
  whatsapp: "https://wa.me/2348168208565",

  email: "radiustechsolution@gmail.com", // TODO: add company email, e.g. hello@yourdomain.com
  socials: [
    // TODO: confirm these links
    { label: "Instagram", href: "https://instagram.com/radiustechsolutions" },
    { label: "TikTok", href: "https://tiktok.com/@radiustechsolutions" },
    { label: "YouTube", href: "https://youtube.com/@radiustechsolutions" },
    { label: "Facebook", href: "https://facebook.com/radiustechsolutions" },
  ],
};

/* Used by the footer */
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Training", href: "/training" },
];

/* Used by the navbar (Solutions opens the mega menu) */
export const mainNav = [
  { label: "Solutions", href: "/solutions", mega: true },
  { label: "About", href: "/about" },
  { label: "Training", href: "/training" },
] as const;

export type ServiceIconName =
  | "mobile"
  | "web"
  | "frontend"
  | "backend"
  | "api"
  | "cloud"
  | "design"
  | "fintech";

export const services: {
  title: string;
  description: string;
  href: string;
  icon: ServiceIconName;
}[] = [
  {
    title: "Mobile App Development",
    description: "iOS & Android apps built with Flutter and React Native.",
    href: "/solutions#mobile",
    icon: "mobile",
  },
  {
    title: "Web Applications",
    description: "Fast, scalable web platforms and SaaS products.",
    href: "/solutions#web",
    icon: "web",
  },
  {
    title: "Frontend Development",
    description: "Clean, responsive interfaces users love.",
    href: "/solutions#frontend",
    icon: "frontend",
  },
  {
    title: "Backend Development",
    description: "Secure, high-performance systems and databases.",
    href: "/solutions#backend",
    icon: "backend",
  },
  {
    title: "API & System Integrations",
    description: "Payment gateways, banking APIs and third-party services.",
    href: "/solutions#integrations",
    icon: "api",
  },
  {
    title: "Cloud & DevOps",
    description: "Deployment, hosting, CI/CD and monitoring.",
    href: "/solutions#cloud",
    icon: "cloud",
  },
  {
    title: "UI/UX Design",
    description: "Product design, prototypes and design systems.",
    href: "/solutions#design",
    icon: "design",
  },
  {
    title: "Fintech Solutions",
    description: "Wallets, payments, savings and banking products.",
    href: "/solutions#fintech",
    icon: "fintech",
  },
];

export const footerServices = services.map((s) => s.title);
