"use client";

import { useSyncExternalStore } from "react";

interface LiveTimeBadgeProps {
  className?: string;
  variant?: "full" | "compact";
}

function subscribe(callback: () => void) {
  const interval = setInterval(callback, 1000);
  return () => clearInterval(interval);
}

function getSnapshot() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

function getServerSnapshot() {
  return "";
}

export default function LiveTimeBadge({
  className = "",
  variant = "full",
}: LiveTimeBadgeProps) {
  const timeStr = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-full border border-line bg-panel/90 px-3.5 py-1.5 font-mono text-xs backdrop-blur-md transition-all ${className}`}
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      </span>

      <span className="text-muted">
        Jakarta (WIB)
        {timeStr ? (
          <span className="ml-1 text-fg/90 tabular-nums font-medium">
            [{timeStr}]
          </span>
        ) : (
          <span className="ml-1 text-fg/70">[WIB]</span>
        )}
      </span>

      <span className="text-muted/60">•</span>

      <span className="text-fg/90 font-medium tracking-tight">
        {variant === "full"
          ? "Available for full-time / freelance"
          : "Available for work"}
      </span>
    </div>
  );
}
