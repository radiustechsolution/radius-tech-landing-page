import { site } from "@/lib/site";

/** A string is a paragraph. A string[] is a bullet list. */
export type LegalBlock = string | string[];
export type LegalSection = {
  id: string;
  title: string;
  short: string;
  body: LegalBlock[];
};
export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  highlights: string[];
  sections: LegalSection[];
};

const contactList: string[] = [
  `Phone: ${site.phone}`,
  `WhatsApp: ${site.whatsappNumber}`,
  ...(site.email ? [`Email: ${site.email}`] : []),
];

/* ------------------------------------------------------------------ */
/* Privacy Policy                                                      */
/* TODO: have a lawyer review before launch                            */
/* ------------------------------------------------------------------ */

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  updated: "November 12, 2026",
  intro: `How ${site.name} collects, uses and protects your personal information.`,
  highlights: [
    "We only collect what you choose to give us.",
    "We never sell your personal information.",
    "Our forms don't store your data. They open WhatsApp.",
    "You can ask us to see, correct or delete your data.",
  ],
  sections: [
    {
      id: "information-we-collect",
      title: "Information we collect",
      short: "Your contact details and what you tell us about your project.",
      body: [
        "We collect information you give us directly, including when you fill a form, message us on WhatsApp, call us or send us an email:",
        [
          "Your name, phone number and email address",
          "Your company name",
          "Details about your project, budget and timeline",
          "Training applications, including your chosen track and experience level",
        ],
        "We may also receive basic technical information such as your browser type and device, through our hosting provider's standard logs.",
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use your information",
      short: "To reply to you, deliver your project and run our business.",
      body: [
        "We use your information to:",
        [
          "Respond to your enquiries and prepare quotes",
          "Plan, build and deliver the services you request",
          "Manage training applications and communicate with students",
          "Improve our website and services",
          "Meet our legal and accounting obligations",
        ],
        "We do not sell your personal information.",
      ],
    },
    {
      id: "whatsapp",
      title: "WhatsApp messages",
      short: "Our forms open WhatsApp. Nothing is stored on our website.",
      body: [
        "Our project and training forms do not store your details on our website. When you submit them, WhatsApp opens with your message already written so you can send it to us.",
        "Messages sent through WhatsApp are also subject to WhatsApp's own terms and privacy policy.",
      ],
    },
    {
      id: "sharing",
      title: "Sharing your information",
      short:
        "Only with services that help us work, or when the law requires it.",
      body: [
        "We only share your information when necessary, for example with:",
        [
          "Service providers who help us run our business, such as hosting and communication tools",
          "Third-party services you ask us to integrate into your product",
          "Authorities, when required by law",
        ],
      ],
    },
    {
      id: "retention",
      title: "How long we keep it",
      short: "Only as long as we need it.",
      body: [
        "We keep your information only for as long as we need it for the purposes in this policy, or as required by law. When it is no longer needed, we delete it or make it anonymous.",
      ],
    },
    {
      id: "security",
      title: "Security",
      short: "We take reasonable steps to keep your data safe.",
      body: [
        "We take reasonable technical and organisational steps to protect your information. However, no method of transmission or storage is completely secure.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      short: "See, correct, delete or limit the use of your data.",
      body: [
        "Under the Nigeria Data Protection Act 2023 and other applicable laws, you may have the right to:",
        [
          "Access the personal information we hold about you",
          "Ask us to correct or update it",
          "Ask us to delete it",
          "Object to or limit how we use it",
          "Withdraw consent you have given",
        ],
        "To make a request, contact us using the details in the last section.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      short: "No advertising or tracking cookies.",
      body: [
        "Our website does not currently use advertising or tracking cookies. If we add analytics in future, we will update this policy.",
      ],
    },
    {
      id: "minors",
      title: "Applicants under 18",
      short: "Apply for training with a parent or guardian's consent.",
      body: [
        "If you are under 18 and want to apply for training, please do so with the consent of a parent or guardian.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      short: "The latest version is always on this page.",
      body: [
        "We may update this policy from time to time. The latest version will always be on this page with the date it was last updated.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      short: "Questions about your data? Reach out anytime.",
      body: [
        "If you have questions about this policy or your information, contact us:",
        contactList,
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Terms of Service                                                    */
/* TODO: have a lawyer review before launch                            */
/* ------------------------------------------------------------------ */

export const terms: LegalDoc = {
  title: "Terms of Service",
  updated: "November 12, 2026",
  intro: `The terms for using our website and working with ${site.name}.`,
  highlights: [
    "Every project starts with a written agreement.",
    "You own your code once it's fully paid for.",
    "Your business information stays confidential.",
    "These terms follow Nigerian law.",
  ],
  sections: [
    {
      id: "services",
      title: "Our services",
      short: "Software design, development and training, agreed in writing.",
      body: [
        "We provide software design and development, including mobile apps, web applications, backend systems, integrations, cloud services, UI/UX design and training.",
        "The scope, timeline and price of each project are set out in a proposal or written agreement. If that agreement conflicts with these terms, the agreement takes priority.",
      ],
    },
    {
      id: "quotes-payments",
      title: "Quotes and payments",
      short: "Payment terms are agreed before work begins.",
      body: [
        "Quotes are based on the information you provide and are valid for the period stated on them.",
        "Payment terms, including any deposit and milestone payments, are agreed in writing before work begins. Work may be paused if agreed payments are late.",
        "Changes to the agreed scope may affect the price and timeline. We will always confirm these with you first.",
      ],
    },
    {
      id: "your-responsibilities",
      title: "Your responsibilities",
      short:
        "Accurate information, timely feedback and rights to your materials.",
      body: [
        "To help us deliver on time, you agree to:",
        [
          "Provide accurate information, content and feedback when needed",
          "Make sure you have the rights to any materials you give us",
          "Review and approve work within reasonable timeframes",
        ],
      ],
    },
    {
      id: "ownership",
      title: "Ownership",
      short: "Paid in full means the deliverables are yours.",
      body: [
        "Once a project is paid for in full, you own the final deliverables created specifically for you, including the source code, unless your agreement says otherwise.",
        "We keep ownership of our pre-existing tools, code libraries and know-how, and grant you a licence to use them as part of your product.",
        "Unless you ask us not to, or we have signed a confidentiality agreement, we may show the project in our portfolio.",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      short: "Your business information stays private. NDAs on request.",
      body: [
        "We keep your business information confidential and only use it to deliver your project. We are happy to sign a non-disclosure agreement on request.",
      ],
    },
    {
      id: "third-party",
      title: "Third-party services",
      short: "App stores, hosting and payment providers have their own terms.",
      body: [
        "Your product may use third-party services such as app stores, hosting providers, payment gateways or APIs. Their terms and fees apply, and we are not responsible for their availability or changes.",
      ],
    },
    {
      id: "training",
      title: "Training",
      short: "Details are confirmed when you're accepted.",
      body: [
        "Training enrolment, fees and schedules are confirmed when you are accepted. Students are expected to attend, complete assignments and treat others with respect.",
      ],
    },
    {
      id: "website",
      title: "Using our website",
      short: "Please don't misuse or copy it.",
      body: [
        "You agree not to misuse our website, including attempting to disrupt it, access it without permission or copy its content for commercial use.",
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      short: "Our liability is limited to what you paid for the project.",
      body: [
        "To the extent allowed by law, we are not liable for indirect or consequential losses, such as lost profits or data, arising from our website or services. Our total liability for any project is limited to the amount you paid for that project.",
      ],
    },
    {
      id: "law",
      title: "Governing law",
      short: "Nigerian law applies.",
      body: [
        "These terms are governed by the laws of the Federal Republic of Nigeria. Any disputes will first be resolved through good-faith discussion.",
      ],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      short: "The latest version is always on this page.",
      body: [
        "We may update these terms from time to time. The latest version will always be on this page with the date it was last updated.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      short: "Questions about these terms? Reach out anytime.",
      body: ["Questions about these terms? Contact us:", contactList],
    },
  ],
};
