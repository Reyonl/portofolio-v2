// Journey — compact, real, dated. Max one short line per milestone.

export interface Milestone {
  date: string;
  title: string;
  line: string; // one short line
  tag?: string;
}

export const timeline: Milestone[] = [
  {
    date: "2022",
    title: "First line of code",
    line: "Started Informatics Engineering at Universitas Pamulang. Wrote PHP in semester one.",
    tag: "start",
  },
  {
    date: "2023 — 2024",
    title: "Home ground: Laravel",
    line: "Coursework and small systems — ledger apps, payment management — built solo in Laravel.",
  },
  {
    date: "09/2024 — 10/2024",
    title: "Laravel Bootcamp — HIMTIF",
    line: "Intensive training on Laravel MVC architecture, relational database design with Eloquent ORM, and CRUD workflows.",
    tag: "bootcamp",
  },
  {
    date: "2025",
    title: "Thesis became a product",
    line: "DAILY.CO: a multi-zone canvas editor and order system for a real screen-printing business.",
  },
  {
    date: "01/2026 — 03/2026",
    title: "Internship: Pusdiklat BPS",
    line: "Database Administrator & Creative Team at Pusdiklat BPS: managed internal database integrity and supported documentation.",
    tag: "internship",
  },
  {
    date: "early 2026",
    title: "Warung Lupi shipped",
    line: "Laravel web system plus a Flutter Android app with Bluetooth thermal printing, v1.0.1 via CI/CD.",
  },
  {
    date: "03/2026",
    title: "Maju Bareng AI — Hacktiv8",
    line: "Hands-on AI prompt engineering and integrating Gemini API into modern web applications.",
    tag: "training",
  },
  {
    date: "mid 2026",
    title: "Vibe coding, ~1 year in",
    line: "Cursor → Antigravity → Hermes Agent. AI-assisted workflow, still reading every diff.",
    tag: "workflow",
  },
  {
    date: "04/2026",
    title: "Certified Web Programmer",
    line: "Earned national certification (BNSP) for Web Programming.",
    tag: "cert",
  },
  {
    date: "07/2026",
    title: "Graduated",
    line: "Informatics Engineering, Universitas Pamulang (GPA 3.56 / 4.00).",
    tag: "grad",
  },
  {
    date: "now",
    title: "Leveling up: React + Next.js",
    line: "This site is part of the climb. Hermes DevOps still active.",
    tag: "now",
  },
];
