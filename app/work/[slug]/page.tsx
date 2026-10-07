import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProjectHeader from "@/components/ProjectHeader";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import ProjectMicroPreview from "@/components/ProjectMicroPreview";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };
  return {
    title: project.title,
    description: project.blurb,
    openGraph: {
      title: `${project.title} — Reyon Lau Jiemin`,
      description: project.blurb,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="px-5 pt-28 pb-24 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/#work"
          className="mb-10 min-h-[44px] inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase transition-colors hover:text-accent"
        >
          ← All work
        </Link>

        <ProjectHeader project={project} />

        {/* Live Feature Simulation / Micro-Preview Box */}
        <section className="mt-14">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
              {"// Interactive Micro-Simulation"}
            </h2>
            <span className="font-mono text-[10px] text-muted uppercase">
              Interactive State
            </span>
          </div>
          <div className="h-80 sm:h-96 w-full overflow-hidden rounded-2xl border border-line bg-panel shadow-lg">
            <ProjectMicroPreview slug={project.slug} isHovered={true} mode="detail" />
          </div>
        </section>

        {/* Mini Architecture / Flow Diagram */}
        <section className="mt-14">
          <ArchitectureDiagram slug={project.slug} />
        </section>

        {/* The Honest Version */}
        <section className="mt-16 rounded-2xl border border-line bg-panel p-6 sm:p-8">
          <h2 className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
            {"// the honest version"}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-fg/90">
            {project.detail}
          </p>

          <p className="mt-8 text-xs text-muted font-mono">
            Status: {project.status === "active" ? "actively developed" : "shipped"} ·{" "}
            Numbers and metrics above reflect repository code, zero fabricated claims.
          </p>
        </section>

        <div className="mt-12 flex justify-between items-center border-t border-line pt-6">
          <Link
            href="/#work"
            className="min-h-[44px] inline-flex items-center font-mono text-xs uppercase tracking-wider text-muted hover:text-accent transition-colors"
          >
            ← Back to Selected Work
          </Link>
          <a
            href="mailto:liurey55@gmail.com"
            className="min-h-[44px] inline-flex items-center rounded-full bg-accent px-5 py-2 font-mono text-xs font-bold text-ink uppercase"
          >
            Inquire About This Project
          </a>
        </div>
      </div>
    </main>
  );
}
