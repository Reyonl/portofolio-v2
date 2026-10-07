"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { playKeystroke, playSuccess, playClick } from "@/lib/sound";

interface TerminalLine {
  id: string;
  type: "command" | "output" | "error" | "system";
  content: string;
  badge?: string;
  badgeColor?: "green" | "amber" | "cyan" | "purple";
}

const PRESET_COMMANDS = [
  { label: "hermes doctor", cmd: "hermes doctor", desc: "Check toolchains & environment health" },
  { label: "hermes status", cmd: "hermes status", desc: "Overview of registered projects" },
  { label: "hermes test daily-co", cmd: "hermes test daily-co", desc: "Run 46 tests against MySQL" },
  { label: "bnsp verify", cmd: "bnsp verify", desc: "Inspect BNSP Web Programmer credentials" },
  { label: "cat cv.summary", cmd: "cat cv.summary", desc: "View developer background profile" },
];

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "init-1",
      type: "system",
      content: "Hermes DevOps v0.7.5 (x86_64-pc-windows / node v25.2)",
    },
    {
      id: "init-2",
      type: "system",
      content: "Gated developer-automation pipeline. Type 'help' or click presets below.",
    },
    {
      id: "init-3",
      type: "command",
      content: "hermes doctor",
    },
    {
      id: "init-4",
      type: "output",
      content:
        "✔ node v25.2.1 [PASS]\n✔ git v2.52.0 [PASS]\n✔ php 8.3.16 + composer [PASS]\n✔ flutter 3.38.5-stable [PASS]\n✔ mysql connection pool [ONLINE]\nAll 5 toolchains verified. Operational ready.",
      badge: "EVIDENCE VERIFIED",
      badgeColor: "green",
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>(["hermes doctor"]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isExecuting, setIsExecuting] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = useCallback((rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    playKeystroke();
    setIsExecuting(true);

    const cmdLineId = `cmd-${Date.now()}`;
    const outLineId = `out-${Date.now()}`;

    setHistory((prev) => [
      ...prev,
      { id: cmdLineId, type: "command", content: cmd },
    ]);

    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);
    setInputVal("");

    setTimeout(() => {
      let output = "";
      let badge: string | undefined = undefined;
      let badgeColor: "green" | "amber" | "cyan" | "purple" = "green";
      const lower = cmd.toLowerCase();

      if (lower === "help") {
        output =
          "Available commands:\n" +
          "  hermes doctor             Verify tools, runtime & config health\n" +
          "  hermes status             Inspect project registry & sync state\n" +
          "  hermes test <project>     Run verified tests (e.g. daily-co, hermes-devops)\n" +
          "  hermes inspect <project>  Deep-dive into stack, APIs and database\n" +
          "  bnsp verify               Verify BNSP Web Programmer certified units\n" +
          "  cat cv.summary            Read developer bio and core competencies\n" +
          "  whoami                    Display active profile identity\n" +
          "  clear                     Clear terminal buffer";
        badge = "SAFE";
        badgeColor = "cyan";
      } else if (lower === "clear") {
        setHistory([]);
        setIsExecuting(false);
        return;
      } else if (lower === "whoami") {
        output =
          "Reyon Lau Jiemin\n" +
          "• Role: Junior Software Developer\n" +
          "• Education: Universitas Pamulang (Informatics Engineering, 2026)\n" +
          "• Primary: Laravel, PHP 8.3, MySQL, Livewire, Flutter\n" +
          "• Ecosystem: Next.js, TypeScript, React, Node.js\n" +
          "• GitHub: https://github.com/Reyonl";
        badge = "PERSON";
        badgeColor = "purple";
      } else if (lower === "hermes doctor") {
        output =
          "Toolchain Diagnostics:\n" +
          "  ✔ Node.js runtime: v25.2.1 [PASS]\n" +
          "  ✔ Git porcelain: v2.52.0 [PASS]\n" +
          "  ✔ PHP / Composer: v8.3.16 CLI [PASS]\n" +
          "  ✔ MySQL engine: 8.0.30 via Laragon [PASS]\n" +
          "  ✔ Flutter SDK: 3.38.5-stable [PASS]\n" +
          "5/5 probes answered with fresh fact. Zero fabricated claims.";
        badge = "HEALTHY";
        badgeColor = "green";
      } else if (lower === "hermes status") {
        output =
          "Projects Registered in Hermes DevOps:\n" +
          "  [01] hermes-devops    — TS CLI / Developer Automation (198 tests, v0.7.5)\n" +
          "  [02] warung-lupi-web  — Laravel 11 / React Shared API (Live domain)\n" +
          "  [03] daily-co         — Laravel Livewire + Fabric.js (46 CI tests)\n" +
          "  [04] gadai-enoni-cell — Laravel 10 + Midtrans Snap Core (In-production)\n" +
          "Audit Trail: append-only log under ~/.config/hermes-devops/data/audit/";
        badge = "4 REGISTERED";
        badgeColor = "green";
      } else if (lower.includes("test") && (lower.includes("daily") || lower.includes("daily-co"))) {
        output =
          "Running PHPUnit/Pest suite for DAILY.CO against MySQL test database:\n" +
          "  ✓ tests/Feature/DesignCanvasOrderTest.php (14 assertions)\n" +
          "  ✓ tests/Feature/MultiZonePrintCalculationTest.php (18 assertions)\n" +
          "  ✓ tests/Feature/AdminOrderWorkflowTest.php (14 assertions)\n" +
          "Tests:  46 passed (11 files, 84 assertions)\n" +
          "Duration: 1.42s | Memory: 24.50MB | Status: PASS";
        badge = "46/46 PASS";
        badgeColor = "green";
      } else if (lower.includes("test") && lower.includes("hermes")) {
        output =
          "Running hermes test engine:\n" +
          "  ✓ test/step-engine.test.ts (42 specs)\n" +
          "  ✓ test/gate-safety-model.test.ts (65 specs)\n" +
          "  ✓ test/detection-adapters.test.ts (51 specs)\n" +
          "  ✓ test/evidence-verifier.test.ts (40 specs)\n" +
          "Suites: 4 passed, 4 total | Tests: 198 passed | Exit: 0";
        badge = "198/198 PASS";
        badgeColor = "green";
      } else if (lower.includes("bnsp")) {
        output =
          "BADAN NASIONAL SERTIFIKASI PROFESI (BNSP)\n" +
          "Credential: Certified Web Programmer\n" +
          "Competency Units Verified:\n" +
          "  • J.620100.005.02: Mengimplementasikan Pemrograman Terstruktur\n" +
          "  • J.620100.007.01: Mengimplementasikan Struktur Data\n" +
          "  • J.620100.009.01: Menggunakan Spesifikasi Program\n" +
          "  • J.620100.010.01: Menerapkan Perintah SQL Dasar & Lanjut\n" +
          "  • J.620100.016.01: Menulis Kode dengan Prinsip Clean Code & Security\n" +
          "Status: Terverifikasi Kompeten (LSP / BNSP Republik Indonesia)";
        badge = "BNSP KOMPETEN";
        badgeColor = "green";
      } else if (lower.includes("cat") && lower.includes("cv")) {
        output =
          "Reyon Lau Jiemin — ATS CV Profile Summary:\n" +
          "• Available: Full-time Junior Developer / Freelance Laravel\n" +
          "• Formats: ATS PDF & DOCX (Bilingual: ID & EN)\n" +
          "• Downloads available via /cv/Reyon-Lau-Jiemin-CV.pdf\n" +
          "• Verified Work: Midtrans payment webhooks, Laravel REST APIs, Next.js frontend";
        badge = "ATS READY";
        badgeColor = "cyan";
      } else {
        output =
          `Command not recognized: '${cmd}'.\n` +
          "Type 'help' to see list of runnable commands or use one-click buttons above.";
        badge = "NOT FOUND";
        badgeColor = "amber";
      }

      setHistory((prev) => [
        ...prev,
        {
          id: outLineId,
          type: badgeColor === "amber" ? "error" : "output",
          content: output,
          badge,
          badgeColor,
        },
      ]);

      if (badgeColor === "green" || badgeColor === "cyan") {
        playSuccess();
      }
      setIsExecuting(false);
    }, 280);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? cmdHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(cmdHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInputVal("");
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-line bg-[#080b10] font-mono shadow-2xl shadow-black/80">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-line/70 bg-[#0d1117] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]/90 transition-opacity hover:opacity-100" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/90 transition-opacity hover:opacity-100" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]/90 transition-opacity hover:opacity-100" />
          <span className="ml-2 font-mono text-[11px] text-muted">
            hermes-devops@terminal: ~ (interactive CLI)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded bg-panel px-2 py-0.5 text-[10px] text-accent border border-line">
            LIVE ENGINE
          </span>
          <button
            type="button"
            onClick={() => {
              playClick(900, 0.02);
              setHistory([]);
            }}
            className="text-[10px] text-muted hover:text-fg uppercase transition-colors px-1.5"
            title="Clear buffer"
          >
            clear
          </button>
        </div>
      </div>

      {/* Preset Command Quick-Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line/40 bg-ink/60 px-4 py-2 text-xs">
        <span className="text-[10px] text-muted tracking-wider uppercase mr-1">
          Quick Run:
        </span>
        {PRESET_COMMANDS.map((p) => (
          <button
            key={p.cmd}
            type="button"
            onClick={() => {
              playClick(720, 0.03);
              executeCommand(p.cmd);
            }}
            className="rounded-full border border-line/70 bg-panel/70 px-2.5 py-1 text-[10px] text-fg/80 transition-colors hover:border-accent hover:text-accent hover:bg-panel2 flex items-center gap-1"
          >
            <span className="text-accent font-bold">$</span> {p.label}
          </button>
        ))}
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalBodyRef}
        className="max-h-[380px] min-h-[260px] overflow-y-auto p-4 sm:p-5 text-xs leading-relaxed space-y-3.5"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line) => {
          if (line.type === "command") {
            return (
              <div key={line.id} className="flex items-center gap-2 text-fg font-medium">
                <span className="text-accent font-bold">➜</span>
                <span className="text-muted/80">~</span>
                <span className="text-fg">{line.content}</span>
              </div>
            );
          }

          if (line.type === "system") {
            return (
              <div key={line.id} className="text-muted/60 text-[11px]">
                {line.content}
              </div>
            );
          }

          return (
            <div
              key={line.id}
              className={`rounded-lg border border-line/40 bg-panel/40 p-3 ${
                line.type === "error"
                  ? "border-amber-500/30 text-amber-200"
                  : "text-fg/90"
              }`}
            >
              {line.badge && (
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                      line.badgeColor === "green"
                        ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/40"
                        : line.badgeColor === "cyan"
                        ? "bg-cyan-950/80 text-cyan-400 border border-cyan-800/40"
                        : line.badgeColor === "purple"
                        ? "bg-purple-950/80 text-purple-400 border border-purple-800/40"
                        : "bg-amber-950/80 text-amber-400 border border-amber-800/40"
                    }`}
                  >
                    {line.badge}
                  </span>
                </div>
              )}
              <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-fg/80">
                {line.content}
              </pre>
            </div>
          );
        })}

        {isExecuting && (
          <div className="flex items-center gap-2 text-muted text-[11px] animate-pulse">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Executing command via pipeline...
          </div>
        )}
      </div>

      {/* Terminal Input Bar */}
      <div className="flex items-center border-t border-line/70 bg-[#0d1117] px-4 py-2.5">
        <span className="text-accent font-bold mr-2">➜</span>
        <span className="text-muted mr-2 text-xs">~</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => {
            setInputVal(e.target.value);
            playKeystroke();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type 'help', 'hermes doctor', 'bnsp verify'..."
          disabled={isExecuting}
          className="w-full bg-transparent font-mono text-xs text-fg placeholder:text-muted/50 focus:outline-none"
        />
        <span className="rounded bg-panel2 px-1.5 py-0.5 text-[9px] text-muted border border-line">
          ↵ ENTER
        </span>
      </div>
    </div>
  );
}
