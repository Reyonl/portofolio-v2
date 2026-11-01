"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ArchitectureStep {
  name: string;
  role: string;
  tag: string;
  details: string;
  highlight?: boolean;
}

interface ArchitectureData {
  title: string;
  description: string;
  badge: string;
  nodes: ArchitectureStep[];
  connectionsNote: string;
}

const ARCHITECTURES: Record<string, ArchitectureData> = {
  saywed: {
    title: "Multi-Panel Invitation SaaS Engine",
    description:
      "Dual Filament 3 workspaces (Admin & Customer App) paired with a dynamic cultural/editorial invitation renderer and Telegram notifications.",
    badge: "Multi-Tenant SaaS",
    nodes: [
      {
        name: "Customer & Admin Panels",
        role: "Dual Workspace",
        tag: "Filament 3 + OAuth",
        details:
          "Google Socialite sign-in, self-service couple workspace (/app), and backoffice verification panel (/admin).",
      },
      {
        name: "Media & WebP Pipeline",
        role: "Asset Optimizer",
        tag: "Intervention Image",
        details:
          "Automatically converts and compresses uploaded pre-wedding covers, bride/groom portraits, and galleries into WebP.",
      },
      {
        name: "Dynamic Theme Engine",
        role: "6 Cultural/Editorial Views",
        tag: "Blade + Tailwind v4",
        details:
          "Renders 3 Modern Editorial (Fusion, Botanica, Noir) and 3 Traditional Adat (Sunda, Jawa, Minang) invitations with RSVP & QRIS gifts.",
        highlight: true,
      },
      {
        name: "Telemetry & Telegram Bot",
        role: "Realtime Alerts",
        tag: "Beacon API + Bot",
        details:
          "Tracks live visitor sessions and dispatches instant order, payment, and RSVP notifications to Telegram.",
      },
    ],
    connectionsNote:
      "Google OAuth & Filament Panels → WebP Media Pipeline → 6-Theme Invitation Engine + Telegram Bot Alerts",
  },
  "warung-lupi-web": {
    title: "Shared Laravel Ledger Architecture",
    description:
      "A unified backend architecture serving desktop React-in-Laravel web reporting and synchronized shop transaction ledgers.",
    badge: "Web Ledger System",
    nodes: [
      {
        name: "React Web Dashboard",
        role: "Desktop Client",
        tag: "React + Laravel",
        details:
          "Admin ledger management, debt tracking (bon), per-item cigarette analytics, and financial auditing.",
      },
      {
        name: "Laravel REST & Web Core",
        role: "Central Core",
        tag: "Shared Controllers",
        details:
          "Single source of truth: ledger rules, debt validation, atomic transactions, and token authentication.",
        highlight: true,
      },
      {
        name: "MySQL 8.0 & Service Layer",
        role: "Data & Rules Engine",
        tag: "ACID Transactions",
        details:
          "Structured relational schemas with foreign key integrity and custom promo rules calculation.",
      },
      {
        name: "Cigarette & Debt Reports",
        role: "Analytics Surface",
        tag: "Date-Filtered SQL",
        details:
          "Aggregates daily/monthly cigarette unit sales, paid slips, and outstanding customer receivables.",
      },
    ],
    connectionsNote:
      "React Dashboard → Laravel Ledger Controllers → MySQL ACID Data Layer → Per-Item Reporting",
  },
  "warung-lupi-android": {
    title: "Cloud Firestore POS & Thermal Print Flow",
    description:
      "Serverless real-time mobile POS with Cloud Firestore sync, PDF/QR receipt generation, and direct Bluetooth thermal printing.",
    badge: "Firestore + Hardware",
    nodes: [
      {
        name: "Flutter Mobile UI",
        role: "Shop Attendant UI",
        tag: "Material 3",
        details:
          "Instant entry keypad, catalog search, customer debt lookup, and automatic promo rule calculator.",
      },
      {
        name: "Cloud Firestore Sync",
        role: "Realtime Serverless DB",
        tag: "Firebase v1.3.7",
        details:
          "Persists customer slips, item catalog, and debt balances with offline-first caching and instant multi-device sync.",
        highlight: true,
      },
      {
        name: "PDF & QR Receipt Engine",
        role: "Digital Slip Export",
        tag: "pdf + share_plus",
        details:
          "Generates digital PDF invoices and QR codes for instant WhatsApp sharing alongside physical slips.",
      },
      {
        name: "Bluetooth Thermal Driver",
        role: "Peripheral Dispatch",
        tag: "ESC/POS 58mm",
        details:
          "Encodes text and receipt formatting sent over Bluetooth socket to a 58mm portable thermal printer.",
      },
    ],
    connectionsNote:
      "Flutter POS UI → Cloud Firestore Sync ↳ Bluetooth 58mm ESC/POS Print + PDF/QR Share",
  },
  "daily-co": {
    title: "Interactive Canvas & Order Flow",
    description:
      "In-browser Fabric.js multi-zone apparel editor pipeline connected to Livewire and production verification.",
    badge: "Client-Side CAD Engine",
    nodes: [
      {
        name: "Fabric.js Canvas Engine",
        role: "Client Vector CAD",
        tag: "Fabric.js 5.3",
        details:
          "Multi-zone coordinates (front, back, left/right sleeve), WCAG contrast warnings, SVG/raster imports, and transforms.",
        highlight: true,
      },
      {
        name: "Livewire 3 Sync Bridge",
        role: "Dynamic Reactive Bridge",
        tag: "Livewire Component",
        details:
          "Transfers canvas JSON and raster snapshots to the server without full-page reloads.",
      },
      {
        name: "Production Image Generator",
        role: "High-Res Render Engine",
        tag: "Canvas Serializer",
        details:
          "Generates print-ready high-resolution files adhering to physical screen-printing dimensions.",
      },
      {
        name: "Order & CI Test Suite",
        role: "Fulfillment Pipeline",
        tag: "46 Automated Tests",
        details:
          "Stores design state in MySQL and verifies workflows with 46 automated integration tests.",
      },
    ],
    connectionsNote:
      "Fabric.js Canvas (4 Zones) → Livewire Sync → High-Res Export → MySQL Order Pipeline",
  },
  "hermes-devops": {
    title: "Gated Safety & Autonomous Execution Engine",
    description:
      "Deterministic developer CLI and autonomous repair pipeline enforcing test gates and append-only audit trails.",
    badge: "Developer Tooling v0.10.0",
    nodes: [
      {
        name: "CLI & Autonomous Runner",
        role: "Command Intake",
        tag: "Node.js / TS",
        details:
          "Parses developer commands and bounded autonomous repair loops (hermes auto) with strict schema validation.",
      },
      {
        name: "Stack & Repo Introspector",
        role: "Environment Inspection",
        tag: "AST / FS Scanner",
        details:
          "Inspects package configs, lockfiles, and git state across Node.js, Next.js, Laravel, PHP, and Flutter repos.",
      },
      {
        name: "Execution Gatekeeper",
        role: "Tri-Gate Policy",
        tag: "SAFE / REVIEW / DANGER",
        details:
          "Blocks dangerous mutations, requires confirmation for review tasks, and executes safe diagnostics automatically.",
        highlight: true,
      },
      {
        name: "Verification & Audit Ledger",
        role: "Post-Condition Engine",
        tag: "249 Tests · JSONL",
        details:
          "Re-verifies world state after every step, backed by 249 automated tests and an immutable append-only audit trail.",
      },
    ],
    connectionsNote:
      "CLI / Auto Intake → Stack Inspection → Safety Policy Tri-Gate → 249 Tests & Append-Only Audit Log",
  },
};

export default function ArchitectureDiagram({ slug }: { slug: string }) {
  const data = ARCHITECTURES[slug];
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(
    data ? (data.nodes.findIndex((n) => n.highlight) !== -1 ? data.nodes.findIndex((n) => n.highlight) : 0) : 0
  );

  if (!data) return null;

  return (
    <div className="rounded-2xl border border-line bg-panel p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-line pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase">
              System Architecture & Flow
            </span>
          </div>
          <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-fg">
            {data.title}
          </h3>
          <p className="mt-1 max-w-2xl text-xs sm:text-sm text-muted">
            {data.description}
          </p>
        </div>

        <span className="self-start sm:self-center rounded-full border border-line bg-panel2 px-3 py-1 font-mono text-[10px] text-fg uppercase">
          {data.badge}
        </span>
      </div>

      {/* Architecture Flow Nodes */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.nodes.map((node, i) => {
            const isSelected = selectedNodeIndex === i;
            return (
              <div
                key={node.name}
                onClick={() => setSelectedNodeIndex(i)}
                className={`relative flex cursor-pointer flex-col justify-between rounded-xl border p-4 transition-all duration-200 ${
                  isSelected
                    ? "border-accent bg-panel2 ring-1 ring-accent/50 shadow-lg"
                    : node.highlight
                    ? "border-accent/40 bg-panel hover:border-accent/80"
                    : "border-line bg-ink/60 hover:border-line/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted">
                      0{i + 1}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[9px] uppercase ${
                        isSelected
                          ? "bg-accent text-ink font-bold"
                          : "bg-panel2 text-muted border border-line"
                      }`}
                    >
                      {node.tag}
                    </span>
                  </div>
                  <h4 className="mt-3 font-display text-sm font-bold text-fg">
                    {node.name}
                  </h4>
                  <p className="mt-0.5 font-mono text-[10px] text-accent">
                    {node.role}
                  </p>
                </div>

                <div className="mt-3 border-t border-line/60 pt-2 text-[11px] text-muted line-clamp-2">
                  {node.details}
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeArchitectureIndicator"
                    className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-accent"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Node Inspector Detail */}
        {data.nodes[selectedNodeIndex] && (
          <motion.div
            key={selectedNodeIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-xl border border-line bg-panel2/80 p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs text-accent">
                NODE SPECIFICATION — 0{selectedNodeIndex + 1}: {data.nodes[selectedNodeIndex].name}
              </span>
              <span className="rounded bg-ink px-2 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/30">
                ACTIVE PIPELINE
              </span>
            </div>
            <p className="mt-2 text-sm text-fg/90 leading-relaxed">
              {data.nodes[selectedNodeIndex].details}
            </p>
          </motion.div>
        )}

        {/* Pipeline Summary Line */}
        <div className="mt-5 flex items-center justify-between rounded-lg border border-line/70 bg-ink px-4 py-2.5 font-mono text-xs text-muted">
          <span className="truncate">{data.connectionsNote}</span>
          <span className="ml-3 shrink-0 text-accent font-bold">100% Shipped</span>
        </div>
      </div>
    </div>
  );
}
