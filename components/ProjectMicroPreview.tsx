"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProjectMicroPreviewProps {
  slug: string;
  isHovered?: boolean;
  mode?: "card" | "detail";
}

export default function ProjectMicroPreview({
  slug,
  isHovered = false,
  mode = "card",
}: ProjectMicroPreviewProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Auto-cycle tabs/steps for the micro-loop preview
  useEffect(() => {
    if (!isHovered && mode === "card") return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 2200);
    return () => clearInterval(interval);
  }, [isHovered, mode]);

  if (slug === "daily-co") {
    const zones = ["Front Print (A3)", "Back Neck", "Left Sleeve"];
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-ink/95 p-4 text-xs font-mono">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line pb-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-fg font-semibold tracking-wider text-[11px]">
              FABRIC.JS CANVAS ENGINE
            </span>
          </div>
          <span className="rounded bg-panel2 px-2 py-0.5 text-[10px] text-muted border border-line">
            Multi-Zone Mode
          </span>
        </div>

        {/* Canvas Simulation Area */}
        <div className="relative my-2 flex flex-1 items-center justify-center rounded-xl border border-line/80 bg-panel2/60 p-3 overflow-hidden">
          {/* Grid lines background */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "radial-gradient(circle, #ff8a3d 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Simulated Apparel Silhouette */}
          <div className="relative flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-line/90 bg-panel shadow-inner">
            <span className="text-[10px] text-muted/60 absolute top-2 font-mono">
              GARMENT CANVAS
            </span>

            {/* Draggable Bounding Box Simulation */}
            <motion.div
              animate={{
                scale: activeTab === 0 ? 1 : activeTab === 1 ? 0.85 : 0.7,
                x: activeTab === 0 ? 0 : activeTab === 1 ? -10 : 15,
                y: activeTab === 0 ? 4 : activeTab === 1 ? -12 : 8,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
              className="relative flex h-20 w-20 items-center justify-center rounded border-2 border-dashed border-accent bg-accent/15 p-2"
            >
              <div className="text-center font-mono text-[9px] font-bold text-accent">
                {activeTab === 0
                  ? "VECTOR LOGO"
                  : activeTab === 1
                  ? "TYPOGRAPHY"
                  : "PATCH 4x4"}
              </div>
              {/* Transform handles */}
              <span className="absolute -top-1 -left-1 h-2 w-2 bg-accent" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-accent" />
              <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-accent" />
              <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-accent" />
            </motion.div>
          </div>
        </div>

        {/* Footer Zone Selector & Output */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted">Active Zone:</span>
            <span className="text-accent font-medium">{zones[activeTab]}</span>
          </div>
          <div className="flex gap-1.5">
            {zones.map((z, idx) => (
              <button
                key={z}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(idx);
                }}
                className={`flex-1 rounded py-1 text-center text-[9px] transition-colors ${
                  activeTab === idx
                    ? "bg-accent text-ink font-semibold"
                    : "bg-panel border border-line text-muted hover:text-fg"
                }`}
              >
                Zone {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slug === "warung-lupi-web") {
    const records = [
      { item: "Gudang Garam Filter 12", qty: "3 slop", total: "Rp 720.000", status: "LUNAS" },
      { item: "Sampoerna Mild 16", qty: "2 slop", total: "Rp 640.000", status: "BON" },
      { item: "Djarum Super 12", qty: "5 slop", total: "Rp 1.150.000", status: "LUNAS" },
    ];
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-ink/95 p-4 text-xs font-mono">
        <div className="flex items-center justify-between border-b border-line pb-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-fg font-semibold tracking-wider text-[11px]">
              LAPORAN BON & ROKOK
            </span>
          </div>
          <span className="rounded bg-panel2 px-2 py-0.5 text-[10px] text-emerald-400 border border-emerald-500/30">
            Shared API v1
          </span>
        </div>

        {/* Ledger Table Mockup */}
        <div className="my-2 flex-1 space-y-1.5 overflow-hidden">
          <div className="grid grid-cols-4 gap-1 text-[9px] text-muted border-b border-line/60 pb-1 uppercase">
            <span className="col-span-2">Barang</span>
            <span className="text-right">Total</span>
            <span className="text-right">Status</span>
          </div>
          {records.map((r, i) => (
            <motion.div
              key={r.item}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`grid grid-cols-4 gap-1 rounded p-1.5 text-[10px] transition-colors ${
                activeTab === i ? "bg-accent/15 border border-accent/40" : "bg-panel2/40"
              }`}
            >
              <div className="col-span-2 truncate font-sans text-fg font-medium">
                {r.item}
                <span className="block font-mono text-[9px] text-muted">{r.qty}</span>
              </div>
              <div className="text-right text-fg/90 self-center">{r.total}</div>
              <div className="text-right self-center">
                <span
                  className={`rounded px-1.5 py-0.5 text-[8px] font-bold ${
                    r.status === "LUNAS"
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {r.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Totals Summary */}
        <div className="flex items-center justify-between border-t border-line pt-2 text-[10px]">
          <span className="text-muted">Total Omset Hari Ini</span>
          <span className="font-bold text-accent text-xs">Rp 2.510.000</span>
        </div>
      </div>
    );
  }

  if (slug === "hermes-devops") {
    const steps = [
      "hermes inspect --target ./portfolio-v2",
      "GATING: SAFE ✓ | REVIEW: 0 | DANGEROUS: 0",
      "198/198 tests passed in 1.42s [RELEASE READY]",
    ];
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-ink/95 p-4 text-xs font-mono">
        <div className="flex items-center justify-between border-b border-line pb-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-fg font-semibold tracking-wider text-[11px]">
              HERMES CLI ENGINE
            </span>
          </div>
          <span className="text-[10px] text-muted">v0.7.5</span>
        </div>

        <div className="my-2 flex-1 rounded-lg border border-line bg-panel p-2.5 font-mono text-[10px] text-fg/80 space-y-1.5">
          <p className="text-muted">$ {steps[0]}</p>
          <p className="text-emerald-400">→ Detected: Next.js + React 19 + TypeScript</p>
          <p className="text-accent">{steps[1]}</p>
          <p className="text-emerald-400">✓ {steps[2]}</p>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted border-t border-line pt-1.5">
          <span>Audit trail: APPEND_ONLY</span>
          <span className="text-emerald-400 font-bold">STATUS 200 OK</span>
        </div>
      </div>
    );
  }

  if (slug === "warung-lupi-android") {
    return (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-ink/95 p-4 text-xs font-mono">
        <div className="flex items-center justify-between border-b border-line pb-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-fg font-semibold tracking-wider text-[11px]">
              THERMAL ESC/POS DISPATCH
            </span>
          </div>
          <span className="text-[10px] text-muted">Bluetooth 5.0</span>
        </div>

        <div className="my-2 flex flex-1 items-center justify-center overflow-hidden">
          <motion.div
            animate={{ y: [15, 0, 0], opacity: [0.8, 1, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-44 rounded-md border border-line bg-panel2 p-3 text-[9px] shadow-lg font-mono text-fg"
          >
            <div className="text-center font-bold pb-1 border-b border-dashed border-line">
              WARUNG LUPI
            </div>
            <div className="py-1 space-y-0.5 text-muted">
              <div className="flex justify-between">
                <span>1x Kopi Susu</span>
                <span>Rp 5.000</span>
              </div>
              <div className="flex justify-between">
                <span>1x Sampoerna Mild</span>
                <span>Rp 32.000</span>
              </div>
            </div>
            <div className="pt-1 border-t border-dashed border-line flex justify-between font-bold text-accent">
              <span>TOTAL</span>
              <span>Rp 37.000</span>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted border-t border-line pt-1.5">
          <span>Printer: RPP02N (58mm)</span>
          <span className="text-emerald-400">CONNECTED</span>
        </div>
      </div>
    );
  }

  return null;
}
