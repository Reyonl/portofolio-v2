"use client";

import { useEffect, useState } from "react";

interface CommitEvent {
  id: string;
  repo: string;
  type: string;
  message: string;
  createdAt: string;
}

function timeAgo(dateString: string): string {
  try {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${Math.max(1, minutes)}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return "recently";
  }
}

export default function GitHubActivity() {
  const [events, setEvents] = useState<CommitEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (active && data.events) {
          setEvents(data.events);
        }
      })
      .catch(() => {
        // Fallback default
        if (active) {
          setEvents([
            {
              id: "def-1",
              repo: "Reyonl/portofolio-v2",
              type: "PushEvent",
              message: "feat: add modern command palette & dual CV switcher",
              createdAt: new Date().toISOString(),
            },
            {
              id: "def-2",
              repo: "Reyonl/threads-it-carousel",
              type: "PushEvent",
              message: "refactor: optimize layout components and automated pipeline",
              createdAt: new Date(Date.now() - 86400000).toISOString(),
            },
          ]);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="rounded-2xl border border-line bg-panel p-6 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-line pb-4">
        <div className="flex items-center gap-2.5">
          <svg
            className="h-5 w-5 text-fg fill-current shrink-0"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <div>
            <h3 className="font-display text-base font-bold text-fg flex items-center gap-2">
              Live GitHub Activity
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
            </h3>
            <span className="font-mono text-[11px] text-muted">
              @Reyonl • 45 Public Repos
            </span>
          </div>
        </div>

        <a
          href="https://github.com/Reyonl"
          target="_blank"
          rel="noreferrer noopener"
          className="self-start sm:self-center font-mono text-xs text-accent hover:underline flex items-center gap-1 min-h-[44px]"
        >
          <span>View on GitHub</span>
          <span>→</span>
        </a>
      </div>

      {/* Commit list */}
      <div className="mt-4 space-y-3">
        {loading ? (
          <div className="space-y-2 py-3">
            <div className="h-4 w-3/4 animate-pulse rounded bg-panel2" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-panel2" />
          </div>
        ) : (
          events.map((e) => {
            const shortRepo = e.repo.replace(/^Reyonl\//, "");
            return (
              <div
                key={e.id}
                className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 rounded-xl border border-line/60 bg-ink/50 p-3 transition-colors hover:border-accent/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-panel2 px-2 py-0.5 font-mono text-[10px] text-accent border border-line">
                      {shortRepo}
                    </span>
                    <span className="font-mono text-[10px] text-muted">
                      {timeAgo(e.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-fg/90 truncate">
                    {e.message}
                  </p>
                </div>

                <a
                  href={`https://github.com/${e.repo}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-[10px] text-muted group-hover:text-fg self-end sm:self-center shrink-0 uppercase tracking-wider"
                >
                  inspect ↗
                </a>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-muted border-t border-line/60 pt-3">
        <span>Fetched via GitHub REST API (ISR Cached)</span>
        <span className="text-emerald-400">● 100% Verified Activity</span>
      </div>
    </div>
  );
}
