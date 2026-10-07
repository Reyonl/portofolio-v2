// Tech stack — augmented with real project evidence and honesty metrics.
// Primary = native (Laravel/PHP), Leveling = React/Next.js/TypeScript (current focus).

export interface SkillDetail {
  name: string;
  icon: string; // key into components/Icons.tsx marks
  tier: "primary" | "leveling";
  status: string;
  evidence: string;
  highlightTags: string[];
  projectSlug?: string;
}

export const skillsData: Record<string, SkillDetail> = {
  Laravel: {
    name: "Laravel",
    icon: "laravel",
    tier: "primary",
    status: "Primary Backend Framework",
    evidence:
      "Core framework for DAILY.CO (46 tests in CI, Livewire canvas state) and Warung Lupi (shared REST API, transactions, reporting). Midtrans payment webhook integration in Gadai Enoni Cell.",
    highlightTags: ["Eloquent ORM", "Artisan", "Pest/PHPUnit", "Sanctum", "FormRequests"],
    projectSlug: "daily-co",
  },
  PHP: {
    name: "PHP",
    icon: "php",
    tier: "primary",
    status: "Native Language (PHP 8.3)",
    evidence:
      "Daily backend development using PHP 8.3 features: constructor promotion, match expressions, typed properties, strict types, and robust exception handling.",
    highlightTags: ["PHP 8.3", "Composer", "PSR Standards", "OOP Architecture"],
    projectSlug: "warung-lupi-web",
  },
  Livewire: {
    name: "Livewire",
    icon: "livewire",
    tier: "primary",
    status: "Reactive Fullstack Componentry",
    evidence:
      "Powers the interactive order customization and admin approval dashboard in DAILY.CO. Coordinates reactive canvas events with backend models.",
    highlightTags: ["Component Lifecycle", "Realtime Validation", "State Hydration"],
    projectSlug: "daily-co",
  },
  MySQL: {
    name: "MySQL",
    icon: "mysql",
    tier: "primary",
    status: "Relational Database & Querying",
    evidence:
      "Schema design, indexing on ledger transaction dates, and foreign key integrity across customer slips, cigarette inventories, and multi-tenant store tables.",
    highlightTags: ["Indexed Queries", "ACID Transactions", "Foreign Keys", "Migrations"],
    projectSlug: "warung-lupi-web",
  },
  "Tailwind CSS": {
    name: "Tailwind CSS",
    icon: "tailwindcss",
    tier: "primary",
    status: "Design System & Utility CSS",
    evidence:
      "Crafted responsive UI systems for DAILY.CO, Warung Lupi, and this portfolio v2 with custom dark palette, amber glow tokens, and fluid typography clamps.",
    highlightTags: ["v4 Alpha/Beta", "Fluid Typography", "Custom Color Tokens", "Responsive Grid"],
  },
  Flutter: {
    name: "Flutter",
    icon: "flutter",
    tier: "primary",
    status: "Cross-Platform Mobile App",
    evidence:
      "Built the Warung Lupi Android companion client consuming the shared Laravel REST API for on-the-go cashier slips and daily summaries.",
    highlightTags: ["State Management", "REST Client", "Android Builds", "Offline Cache"],
    projectSlug: "warung-lupi-web",
  },
  React: {
    name: "React",
    icon: "react",
    tier: "leveling",
    status: "Frontend Library (React 19)",
    evidence:
      "Web client dashboard in Warung Lupi and component architecture in this portfolio (Framer Motion animations, custom hooks, useSyncExternalStore).",
    highlightTags: ["React 19", "Hooks", "Framer Motion", "Synthetic Events"],
    projectSlug: "warung-lupi-web",
  },
  "Next.js": {
    name: "Next.js",
    icon: "nextjs",
    tier: "leveling",
    status: "Fullstack React Framework (v16.3)",
    evidence:
      "Architecture backbone of this portfolio v2: Server Components, App Router, ISR dynamic routes, dynamic OpenGraph generation via satori, and SEO JSON-LD.",
    highlightTags: ["App Router", "Server Components", "ISR", "Dynamic OG Image"],
  },
  TypeScript: {
    name: "TypeScript",
    icon: "typescript",
    tier: "leveling",
    status: "Strict Static Typing",
    evidence:
      "Core language of Hermes DevOps CLI: safety gates (SAFE / REVIEW / DANGEROUS), AST inspection, and 198 automated unit/integration tests.",
    highlightTags: ["Strict Mode", "Discriminated Unions", "CLI Architecture", "Generics"],
    projectSlug: "hermes-devops",
  },
  "Node.js": {
    name: "Node.js",
    icon: "nodejs",
    tier: "leveling",
    status: "Runtime & Developer Automation",
    evidence:
      "Runs Hermes DevOps CLI and automated test pipelines. Process lifecycle management, stdout streaming, and filesystem operations.",
    highlightTags: ["Node 25", "Child Process", "Async Streams", "npm Workspaces"],
    projectSlug: "hermes-devops",
  },
  Git: {
    name: "Git",
    icon: "git",
    tier: "leveling",
    status: "Version Control & Branching",
    evidence:
      "Strict conventional commits, trunk-based feature branching, automated git sync pipelines, rebase, and verified tag releases.",
    highlightTags: ["Conventional Commits", "Feature Branching", "Submodules", "CLI Plumbing"],
  },
  GitHub: {
    name: "GitHub",
    icon: "github",
    tier: "leveling",
    status: "CI/CD & Repository Management",
    evidence:
      "GitHub Actions workflow for DAILY.CO running PHPUnit against live MySQL container. Vercel CI/CD automatic deployment on main push.",
    highlightTags: ["GitHub Actions", "Matrix Builds", "Automated Releases", "PR Checks"],
    projectSlug: "daily-co",
  },
};

export const primarySkills = [
  skillsData["Laravel"],
  skillsData["PHP"],
  skillsData["Livewire"],
  skillsData["MySQL"],
  skillsData["Tailwind CSS"],
  skillsData["Flutter"],
];

export const levelingSkills = [
  skillsData["React"],
  skillsData["Next.js"],
  skillsData["TypeScript"],
  skillsData["Node.js"],
  skillsData["Git"],
  skillsData["GitHub"],
];
