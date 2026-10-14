import { footer, profile } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line/70 bg-[#07080D] px-5 py-8 sm:px-8 font-mono">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center text-xs text-muted">
        <p className="text-[11px] tracking-[0.18em] uppercase text-fg/80 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
          © {new Date().getFullYear()} [TERMINAL: {profile.name.toUpperCase()}]
        </p>
        <p className="text-[11px] text-muted">
          [STACK]: {footer.builtWith.join(" • ")}
        </p>
        <p className="text-[10px] text-[#F59E0B] tracking-wider uppercase bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-2 py-0.5 rounded">
          TACTICAL HUD v2.0 // DEPLOYED
        </p>
      </div>
    </footer>
  );
}
