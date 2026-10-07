// Central copy + identity. English first; Indonesian can be added later by
// duplicating this shape — every section reads its text from here, nowhere else.
// Honesty rules: nothing that doesn't exist is shown; missing content is an
// explicit `todo` entry rendered as a marked placeholder, never fabricated.

export type LinkStatus = "ok" | "todo";

export interface ContactLink {
  label: string;
  href: string;
  status: LinkStatus;
  note?: string;
}

export const profile = {
  name: "Reyon Lau Jiemin",
  firstName: "Reyon",
  lastName: "Lau Jiemin",
  role: "Fresh graduate · Informatics Engineering",
  school: "Universitas Pamulang",
  graduation: "07/2026",
  certification: "BNSP Certified IT Programmer (No. 62000 2519 0 0024767, Oct 2026)",
  tagline: "I ship real projects fast — Laravel at home, Next.js on the way up.",
  codedSince: 2022,
  links: {
    email: "liurey55@gmail.com",
    github: "https://github.com/Reyonl",
    githubHandle: "Reyonl",
  },
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Terminal", href: "#terminal" },
  { label: "Stack", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

export const contactLinks: ContactLink[] = [
  { label: "Email", href: "mailto:liurey55@gmail.com", status: "ok" },
  { label: "GitHub", href: "https://github.com/Reyonl", status: "ok" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/reyon-lau-jiemin-195026345/",
    status: "ok",
  },
  {
    label: "CV",
    href: "/cv/Reyon-Lau-Jiemin-CV.pdf",
    status: "ok",
  },
];

export const footer = {
  note: "Built from scratch with Next.js, Tailwind and Framer Motion.",
  builtWith: ["Next.js", "Tailwind CSS", "motion", "Lenis"],
} as const;
