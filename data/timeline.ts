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
    date: "2025",
    title: "Thesis became a product",
    line: "DAILY.CO: a multi-zone canvas editor and order system for a real screen-printing business.",
  },
  {
    date: "early 2026",
    title: "Warung Lupi shipped",
    line: "Laravel web system plus a Flutter Android app with Bluetooth thermal printing, v1.0.1 via CI/CD.",
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
    line: "Informatics Engineering, Universitas Pamulang.",
    tag: "grad",
  },
  {
    date: "now",
    title: "Leveling up: React + Next.js",
    line: "This site is part of the climb. Hermes DevOps still active.",
    tag: "now",
  },
];
