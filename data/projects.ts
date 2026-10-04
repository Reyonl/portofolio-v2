// Projects — pulled from the verified V1 content registry. Honesty rules:
// no fabricated metrics, no clients, no job experience. A link with no real
// artifact gets status "todo" and renders as a marked placeholder.

export type ProjectStatus = "active" | "shipped";

export interface Project {
  slug: string;
  index: string; // display number, e.g. "01"
  title: string;
  blurb: string; // ≤ 15 words
  detail: string; // detail page, ≤ ~35 words
  category: string;
  period: string;
  status: ProjectStatus;
  stack: string[];
  image: { src: string; alt: string; width: number; height: number };
  gallery?: { src: string; alt: string; caption: string; width: number; height: number }[];
  repo?: { url: string; label: string };
  release?: string;
  todo?: string; // clearly marked missing content
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "hermes-devops",
    index: "01",
    title: "Hermes DevOps",
    blurb: "TypeScript CLI that runs real build/test/release steps — and refuses success without evidence.",
    detail:
      "Registers local projects, detects their stack, executes their own commands behind SAFE / REVIEW / DANGEROUS gates, re-reads the world before reporting, and keeps an append-only audit trail. 198 tests, released v0.7.5.",
    category: "Developer Automation",
    period: "2026 — present",
    status: "active",
    stack: ["TypeScript", "Node.js", "Git", "GitHub Actions"],
    image: {
      src: "/images/hermes-terminal-wide.jpg",
      alt: "Terminal showing real hermes-devops status output at v0.7.5 with registered projects and health counts.",
      width: 1412,
      height: 564,
    },
    repo: undefined,
    todo: "TODO: repository is currently private — link goes live once publication is approved.",
    featured: true,
  },
  {
    slug: "warung-lupi-web",
    index: "02",
    title: "Warung Lupi — Web",
    blurb: "Laravel ledger for a real food shop: slips, debts, promo rules, cigarette reporting.",
    detail:
      "The source of truth for two clients: a React-in-Laravel web system whose shared API also powers the Android app. Bon/lunas/hutang records, per-item reporting, deployed on a live domain.",
    category: "Web Application",
    period: "2025 — 2026",
    status: "shipped",
    stack: ["Laravel", "PHP 8.3", "MySQL", "React"],
    image: {
      src: "/images/warung-dashboard.jpg",
      alt: "Warung Lupi web dashboard: daily ledger overview with totals and navigation.",
      width: 1440,
      height: 620,
    },
    gallery: [
      {
        src: "/images/warung-rokok.jpg",
        alt: "Warung Lupi cigarette report: date filters, totals with units sold and outstanding debt, per-item tables.",
        caption: "Laporan Rokok — reporting surface of the shared API.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/warung-bon.jpg",
        alt: "Warung Lupi credit slip entry screen.",
        caption: "Bon entry — the daily workflow of the shop.",
        width: 1440,
        height: 760,
      },
    ],
    repo: {
      url: "https://github.com/Reyonl/rekapan_bukunota",
      label: "Repository",
    },
  },
  {
    slug: "daily-co",
    index: "03",
    title: "DAILY.CO",
    blurb: "Browser mockup editor turning screen-print designs into orders — four print zones, no back-and-forth.",
    detail:
      "Thesis-turned-product: a Laravel + Livewire multi-zone Fabric.js canvas editor with persisted design state and an admin-verified order workflow. 46 tests across 11 files run in CI against MySQL.",
    category: "Web Application",
    period: "2025 — 2026",
    status: "shipped",
    stack: ["Laravel", "Livewire", "Fabric.js", "Tailwind CSS", "MySQL"],
    image: {
      src: "/images/dailyco-hero.jpg",
      alt: "DAILY.CO landing hero: bold Indonesian headline with gradient accent over a pastel mesh background.",
      width: 1440,
      height: 860,
    },
    repo: {
      url: "https://github.com/Reyonl/project_TA",
      label: "Repository",
    },
  },
  {
    slug: "warung-lupi-android",
    index: "04",
    title: "Warung Lupi — Android",
    blurb: "Flutter shop app that prints receipts straight to a Bluetooth thermal printer.",
    detail:
      "The mobile half of the Warung Lupi ecosystem: Provider state over the shared Laravel API, Indonesian-language slips, promo rules, real on-device thermal printing. Released v1.0.1 APK through its own CI/CD.",
    category: "Mobile Application",
    period: "2026",
    status: "shipped",
    stack: ["Flutter", "Dio", "Bluetooth", "GitHub Actions"],
    image: {
      src: "/images/warung-pelanggan.jpg",
      alt: "Warung Lupi Android app customer screen from the released build.",
      width: 1440,
      height: 760,
    },
    repo: {
      url: "https://github.com/Reyonl/flutter-warungLupi-",
      label: "Repository",
    },
    release:
      "https://github.com/Reyonl/flutter-warungLupi-/releases/tag/v1.0.1",
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
