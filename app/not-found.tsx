import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70svh] flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">
        Nothing here yet.
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted">
        This page was never built — I don&apos;t invent things either.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
      >
        Back to the work
      </Link>
    </main>
  );
}
