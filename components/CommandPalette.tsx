"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { profile } from "@/data/site";
import { playClick, playSuccess } from "@/lib/sound";

interface CommandItem {
  id: string;
  category: "Projects" | "Navigation" | "Actions" | "Documents";
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: string;
  action: () => void;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  // Keyboard shortcut (Cmd+K / Ctrl+K) & event bus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            setQuery("");
            setSelectedIndex(0);
          }
          return !prev;
        });
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setQuery("");
      setSelectedIndex(0);
      setOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  const copyToClipboard = useCallback(async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(`Copied ${label}!`);
      setTimeout(() => setCopiedText(null), 2500);
    } catch {
      // fallback
    }
  }, []);

  const commands: CommandItem[] = useMemo(() => {
    const projectItems: CommandItem[] = projects.map((p) => ({
      id: `project-${p.slug}`,
      category: "Projects",
      title: p.title,
      subtitle: `${p.category} • ${p.stack.slice(0, 3).join(", ")}`,
      badge: p.index,
      action: () => router.push(`/work/${p.slug}`),
    }));

    const navItems: CommandItem[] = [
      {
        id: "nav-work",
        category: "Navigation",
        title: "Go to Work (Selected Projects)",
        subtitle: "#work section",
        action: () => {
          if (window.location.pathname !== "/") {
            router.push("/#work");
          } else {
            window.location.hash = "#work";
          }
        },
      },
      {
        id: "nav-terminal",
        category: "Navigation",
        title: "Go to Hermes CLI Playground",
        subtitle: "#terminal section • Interactive developer terminal",
        action: () => {
          if (window.location.pathname !== "/") {
            router.push("/#terminal");
          } else {
            window.location.hash = "#terminal";
          }
        },
      },
      {
        id: "nav-stack",
        category: "Navigation",
        title: "Go to Tech Stack & Skills",
        subtitle: "#stack section",
        action: () => {
          if (window.location.pathname !== "/") {
            router.push("/#stack");
          } else {
            window.location.hash = "#stack";
          }
        },
      },
      {
        id: "nav-journey",
        category: "Navigation",
        title: "Go to Journey & Milestones",
        subtitle: "#journey section",
        action: () => {
          if (window.location.pathname !== "/") {
            router.push("/#journey");
          } else {
            window.location.hash = "#journey";
          }
        },
      },
      {
        id: "nav-contact",
        category: "Navigation",
        title: "Go to Contact & Hire Info",
        subtitle: "#contact section",
        action: () => {
          if (window.location.pathname !== "/") {
            router.push("/#contact");
          } else {
            window.location.hash = "#contact";
          }
        },
      },
    ];

    const actionItems: CommandItem[] = [
      {
        id: "action-copy-email",
        category: "Actions",
        title: "Copy Email Address",
        subtitle: profile.links.email,
        badge: "Copy",
        action: () => copyToClipboard(profile.links.email, "Email"),
      },
      {
        id: "action-copy-linkedin",
        category: "Actions",
        title: "Copy LinkedIn URL",
        subtitle: "linkedin.com/in/reyon-lau-jiemin-195026345",
        badge: "Copy",
        action: () =>
          copyToClipboard(
            "https://www.linkedin.com/in/reyon-lau-jiemin-195026345/",
            "LinkedIn link"
          ),
      },
      {
        id: "action-open-github",
        category: "Actions",
        title: "Open GitHub Profile",
        subtitle: "github.com/Reyonl",
        badge: "External",
        action: () => window.open(profile.links.github, "_blank"),
      },
      {
        id: "action-open-linkedin",
        category: "Actions",
        title: "Open LinkedIn Profile",
        subtitle: "View full professional background",
        badge: "External",
        action: () =>
          window.open(
            "https://www.linkedin.com/in/reyon-lau-jiemin-195026345/",
            "_blank"
          ),
      },
    ];

    const docItems: CommandItem[] = [
      {
        id: "doc-cv-id",
        category: "Documents",
        title: "Download CV (Bahasa Indonesia)",
        subtitle: "ATS-compliant PDF (Reyon-Lau-Jiemin-CV.pdf)",
        badge: "PDF ID",
        action: () => window.open("/cv/Reyon-Lau-Jiemin-CV.pdf", "_blank"),
      },
      {
        id: "doc-cv-en",
        category: "Documents",
        title: "Download CV (English Version)",
        subtitle: "ATS-compliant PDF (Reyon-Lau-Jiemin-CV-EN.pdf)",
        badge: "PDF EN",
        action: () => window.open("/cv/Reyon-Lau-Jiemin-CV-EN.pdf", "_blank"),
      },
    ];

    return [...projectItems, ...navItems, ...actionItems, ...docItems];
  }, [router, copyToClipboard]);

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.subtitle && c.subtitle.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      playClick(580, 0.025);
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      playClick(620, 0.025);
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const current = filteredCommands[selectedIndex];
      if (current) {
        playSuccess();
        current.action();
        setOpen(false);
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/80 p-4 pt-[15vh] backdrop-blur-md"
        onClick={() => setOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-panel shadow-2xl ring-1 ring-accent/20"
        >
          {/* Header & Search */}
          <div className="relative flex items-center border-b border-line px-4 py-3.5">
            <svg
              className="mr-3 h-5 w-5 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search projects, sections, copy contacts, CVs..."
              className="w-full bg-transparent font-sans text-sm text-fg placeholder:text-muted focus:outline-none"
            />
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-panel2 px-1.5 py-0.5 font-mono text-[10px] text-muted border border-line">
                ESC
              </span>
            </div>
          </div>

          {/* Feedback banner for copied action */}
          {copiedText && (
            <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-4 py-2 font-mono text-xs text-emerald-400 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              {copiedText}
            </div>
          )}

          {/* Results List */}
          <ul
            ref={listRef}
            className="max-h-[380px] overflow-y-auto p-2 scrollbar-thin"
          >
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, i) => {
                const isSelected = i === selectedIndex;
                return (
                  <li
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      setOpen(false);
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`group flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-3 transition-colors ${
                      isSelected
                        ? "bg-accent text-ink"
                        : "text-fg/90 hover:bg-panel2"
                    }`}
                  >
                    <div className="flex flex-col min-w-0 pr-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider ${
                            isSelected ? "text-ink/70" : "text-muted"
                          }`}
                        >
                          {cmd.category}
                        </span>
                        <span className="font-medium text-sm truncate">
                          {cmd.title}
                        </span>
                      </div>
                      {cmd.subtitle && (
                        <span
                          className={`text-xs truncate mt-0.5 ${
                            isSelected ? "text-ink/80" : "text-muted"
                          }`}
                        >
                          {cmd.subtitle}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {cmd.badge && (
                        <span
                          className={`rounded px-2 py-0.5 font-mono text-[10px] ${
                            isSelected
                              ? "bg-ink text-fg"
                              : "bg-panel2 border border-line text-muted"
                          }`}
                        >
                          {cmd.badge}
                        </span>
                      )}
                      <span
                        className={`font-mono text-[10px] opacity-0 transition-opacity group-hover:opacity-100 ${
                          isSelected ? "opacity-100 text-ink" : "text-muted"
                        }`}
                      >
                        ↵
                      </span>
                    </div>
                  </li>
                );
              })
            ) : (
              <li className="px-4 py-8 text-center font-mono text-xs text-muted">
                No matching results found for &ldquo;{query}&rdquo;.
              </li>
            )}
          </ul>

          {/* Footer Shortcuts Help */}
          <div className="flex items-center justify-between border-t border-line bg-panel2/50 px-4 py-2 font-mono text-[10px] text-muted">
            <div className="flex items-center gap-3">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
            </div>
            <span>Raycast / Linear style palette</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
