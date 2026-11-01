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
  liveUrl?: { url: string; label: string };
  repo?: { url: string; label: string };
  release?: string;
  todo?: string; // clearly marked missing content
  featured?: boolean;
  provenance?: {
    generatedBy: string;
    version: string;
    head: string;
    branch: string;
    verifiedAt: string;
  };
}

export const projects: Project[] = [
  {
    slug: "saywed",
    index: "01",
    title: "SayWed — Boutique Wedding SaaS",
    blurb: "Multi-tenant digital wedding invitation SaaS with dual Filament panels and 6 bespoke cultural/editorial themes.",
    detail:
      "Production SaaS at saywed.my.id built on Laravel, Filament 3, and Tailwind CSS v4. Combines an admin backoffice and customer self-service workspace with Google OAuth, automatic WebP image optimization, RSVP & QRIS digital envelope, and real-time Telegram order/visitor alerts.",
    category: "SaaS Web Application",
    period: "2026 — present",
    status: "shipped",
    stack: ["Laravel", "Filament", "Tailwind CSS", "Alpine.js", "MySQL"],
    image: {
      src: "/images/saywed-hero.jpg",
      alt: "SayWed boutique wedding invitation platform showcasing Fusion Editorial, Botanica Sage, and Noir Royale themes.",
      width: 1440,
      height: 718,
    },
    gallery: [
      {
        src: "/images/saywed-invitation.jpg",
        alt: "Live wedding invitation view on SayWed showing Made & Diah Minangkabau x Bali heritage theme.",
        caption: "Live invitation engine — Minangkabau × Bali heritage edition with dynamic couple typography.",
        width: 1440,
        height: 1248,
      },
      {
        src: "/images/saywed-catalog.jpg",
        alt: "SayWed full template catalog displaying 3 modern editorial and 3 Indonesian traditional adat themes.",
        caption: "6 curated templates — 3 Modern Editorial (Fusion, Botanica, Noir) & 3 Traditional Adat (Sunda, Jawa, Minang).",
        width: 1440,
        height: 898,
      },
    ],
    liveUrl: {
      url: "https://saywed.my.id",
      label: "saywed.my.id",
    },
    repo: {
      url: "https://github.com/Reyonl/saywed",
      label: "Repository",
    },
    featured: true,
  },
  {
    slug: "hermes-devops",
    index: "02",
    title: "Hermes DevOps",
    blurb: "TypeScript CLI & autonomous DevOps engine that refuses success without verified evidence.",
    detail:
      "Registers local projects, detects their stack, executes build/test/deploy steps behind SAFE / REVIEW / DANGEROUS gates, runs a bounded autonomous repair pipeline, and writes an append-only audit trail. 249 tests across Phases 1–8, released v0.10.0.",
    category: "Developer Automation",
    period: "2026 — present",
    status: "active",
    stack: ["TypeScript", "Node.js", "Git", "GitHub Actions"],
    image: {
      src: "/images/hermes-terminal-wide.jpg",
      alt: "Terminal showing real hermes-devops status output with registered projects and health counts.",
      width: 1412,
      height: 564,
    },
    repo: {
      url: "https://github.com/Reyonl/hermes-devops",
      label: "Repository",
    },
    release: "https://github.com/Reyonl/hermes-devops/releases/tag/v0.10.0",
    provenance: {
      generatedBy: "hermes-devops/0.10.0",
      version: "0.10.0",
      head: "a3ba338",
      branch: "main",
      verifiedAt: "2026-10-23",
    },
  },
  {
    slug: "warung-lupi-web",
    index: "03",
    title: "Warung Lupi — Web",
    blurb: "Laravel ledger for a real food shop: slips, debts, promo rules, cigarette reporting.",
    detail:
      "The source of truth for a real daily shop: a React-in-Laravel web system tracking bon/lunas/hutang records, automatic promo rules, and per-item cigarette reporting, deployed on a live production domain.",
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
        caption: "Laporan Rokok — per-item cigarette sales and outstanding debt tracking.",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/warung-bon.jpg",
        alt: "Warung Lupi credit slip entry screen.",
        caption: "Riwayat Bon — credit slip ledger and daily shop workflow.",
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
    slug: "warung-lupi-android",
    index: "04",
    title: "Warung Lupi — Android",
    blurb: "Flutter shop POS migrated to Cloud Firestore with Bluetooth thermal printing & QR/PDF receipts.",
    detail:
      "Mobile POS for Warung Lupi powered by Cloud Firestore real-time sync: Indonesian-language slips, automatic promo rules, PDF & QR receipt sharing, and direct 58mm Bluetooth ESC/POS thermal printing. Released v1.3.7 APK via GitHub Actions CI/CD.",
    category: "Mobile Application",
    period: "2026",
    status: "shipped",
    stack: ["Flutter", "Firebase Firestore", "Bluetooth ESC/POS", "GitHub Actions"],
    image: {
      src: "/images/warung-pelanggan.jpg",
      alt: "Warung Lupi customer management and ledger view.",
      width: 1440,
      height: 760,
    },
    repo: {
      url: "https://github.com/Reyonl/warung-lupi-firebase",
      label: "Repository",
    },
    release:
      "https://github.com/Reyonl/warung-lupi-firebase/releases/tag/v1.3.7",
  },
  {
    slug: "daily-co",
    index: "05",
    title: "DAILY.CO",
    blurb: "Browser mockup editor turning screen-print designs into orders — four print zones, no back-and-forth.",
    detail:
      "Thesis-turned-product: a Laravel + Livewire multi-zone Fabric.js canvas editor with WCAG contrast detection, persisted design state, and an admin-verified order workflow. 46 tests across 11 files run in CI against MySQL.",
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
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
