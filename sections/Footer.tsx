import { footer, profile } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line/60 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="text-xs text-muted">{footer.note}</p>
        <p className="font-mono text-[11px] text-muted">
          {footer.builtWith.join(" · ")}
        </p>
      </div>
    </footer>
  );
}
