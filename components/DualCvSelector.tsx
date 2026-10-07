"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CVVersion {
  id: "id" | "en";
  flag: string;
  lang: string;
  title: string;
  audience: string;
  pdfUrl: string;
  previewUrl: string;
  format: string;
}

const CV_DATA: Record<"id" | "en", CVVersion> = {
  id: {
    id: "id",
    flag: "🇮🇩",
    lang: "Bahasa Indonesia",
    title: "Curriculum Vitae (ID)",
    audience: "Untuk Rekruter Lokal / Perusahaan Indonesia",
    pdfUrl: "/cv/Reyon-Lau-Jiemin-CV.pdf",
    previewUrl: "/cv/Reyon-Lau-Jiemin-CV-preview.png",
    format: "ATS-Friendly PDF · Updated 2026",
  },
  en: {
    id: "en",
    flag: "🇬🇧",
    lang: "English (Global)",
    title: "Curriculum Vitae (EN)",
    audience: "For International & Remote Recruiters",
    pdfUrl: "/cv/Reyon-Lau-Jiemin-CV-EN.pdf",
    previewUrl: "/cv/Reyon-Lau-Jiemin-CV-EN-preview.png",
    format: "ATS-Friendly PDF · Updated 2026",
  },
};

export default function DualCvSelector() {
  const [selectedLang, setSelectedLang] = useState<"id" | "en">("en");
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const activeCv = CV_DATA[selectedLang];

  return (
    <div className="rounded-2xl border border-line bg-panel p-6 sm:p-7 shadow-xl">
      {/* Top Header & Segmented Pill Switcher */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-5">
        <div>
          <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase">
            Recruiter Quick Download
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-fg mt-1">
            Dual CV Selector
          </h3>
          <p className="text-xs text-muted mt-0.5">
            Choose language version tailored for local or global recruiters.
          </p>
        </div>

        {/* Tab Switcher with Framer Motion layoutId */}
        <div className="flex items-center rounded-xl bg-ink p-1 border border-line shrink-0">
          {(["id", "en"] as const).map((langKey) => {
            const isSelected = selectedLang === langKey;
            const item = CV_DATA[langKey];
            return (
              <button
                key={langKey}
                type="button"
                onClick={() => setSelectedLang(langKey)}
                className={`relative min-h-[44px] min-w-[110px] rounded-lg px-3.5 py-2 font-mono text-xs font-medium transition-colors focus:outline-none flex items-center justify-center gap-2 ${
                  isSelected ? "text-ink font-bold" : "text-muted hover:text-fg"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="cvTabPill"
                    className="absolute inset-0 rounded-lg bg-accent shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10 text-sm">{item.flag}</span>
                <span className="relative z-10 uppercase">{langKey}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Card Body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCv.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-center"
        >
          {/* Thumbnail preview button */}
          <div
            onClick={() => setShowPreviewModal(true)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-line bg-panel2 aspect-[3/4] max-w-[140px] shadow-md transition-transform hover:scale-[1.02]"
          >
            <Image
              src={activeCv.previewUrl}
              alt={`${activeCv.title} preview`}
              fill
              sizes="140px"
              className="object-cover object-top filter brightness-95 group-hover:brightness-100 transition-[filter]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="rounded bg-accent px-2 py-1 font-mono text-[9px] font-bold text-ink uppercase">
                Zoom Preview
              </span>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeCv.flag}</span>
                <h4 className="font-display text-lg font-bold text-fg">
                  {activeCv.title}
                </h4>
                <span className="rounded bg-panel2 px-2 py-0.5 font-mono text-[10px] text-accent border border-line">
                  {activeCv.lang}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted">
                {activeCv.audience}
              </p>
              <div className="mt-2 flex items-center gap-3 font-mono text-xs text-muted/80">
                <span>{activeCv.format}</span>
                <span>•</span>
                <span className="text-emerald-400">Verified & Clean</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={activeCv.pdfUrl}
                download
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-mono text-xs font-bold text-ink uppercase tracking-wider transition-transform hover:scale-[1.02] shadow-sm"
              >
                <span>Download {activeCv.id.toUpperCase()}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>

              <a
                href={activeCv.pdfUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-panel2 px-5 py-2.5 font-mono text-xs font-medium text-fg uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
              >
                <span>Open in Tab</span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>

              <button
                type="button"
                onClick={() => setShowPreviewModal(true)}
                className="inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2 font-mono text-xs text-muted hover:text-fg transition-colors"
              >
                Quick Preview
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm"
          onClick={() => setShowPreviewModal(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-2xl border border-line bg-panel p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-line mb-3">
              <span className="font-mono text-xs text-accent">
                {activeCv.title} — Preview
              </span>
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="rounded-lg bg-panel2 px-3 py-1 font-mono text-xs text-muted hover:text-fg"
              >
                Close (ESC)
              </button>
            </div>
            <div className="relative h-[70vh] w-full overflow-y-auto rounded-lg">
              <Image
                src={activeCv.previewUrl}
                alt={activeCv.title}
                width={800}
                height={1131}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="mt-3 flex justify-end gap-3 pt-2">
              <a
                href={activeCv.pdfUrl}
                download
                className="rounded-full bg-accent px-5 py-2 font-mono text-xs font-bold text-ink"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
