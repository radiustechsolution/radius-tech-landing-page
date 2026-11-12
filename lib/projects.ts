export type MockKind = "wallet" | "savings" | "vtu" | "marketplace" | "cards";

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  work: string[];
  stack: string[];
  mock: MockKind;
};

// TODO: confirm descriptions and that each client is happy to be shown
export const projects: Project[] = [
  {
    slug: "deeppaya",
    name: "DeepPaya",
    category: "Financial Services",
    description:
      "A financial services app running on secure cloud infrastructure.",
    work: ["Mobile app", "Backend", "Cloud"],
    stack: ["Flutter", "Laravel", "AWS"],
    mock: "cards",
  },
  {
    slug: "durapay",
    name: "DuraPay",
    category: "Fintech",
    description:
      "A digital banking app with virtual accounts, transfers and bill payments.",
    work: ["Mobile app", "Backend API", "Landing page"],
    stack: ["Flutter", "Laravel", "Next.js"],
    mock: "wallet",
  },
  {
    slug: "securevest",
    name: "SecureVest",
    category: "Savings",
    description:
      "A savings platform that helps users reach their goals with automated plans.",
    work: ["Web app", "Mobile app", "API"],
    stack: ["Next.js", "Flutter", "Laravel"],
    mock: "savings",
  },
  {
    slug: "henzpay",
    name: "HenzPay",
    category: "Payments",
    description: "Airtime, data, electricity and TV payments in one fast app.",
    work: ["Mobile app", "Integrations"],
    stack: ["Flutter", "Firebase"],
    mock: "vtu",
  },
  {
    slug: "miobodo",
    name: "Miobodo",
    category: "Marketplace",
    description: "Connects customers with trusted service providers near them.",
    work: ["Mobile app", "Bookings", "Payments"],
    stack: ["Flutter", "Firebase"],
    mock: "marketplace",
  },
];
