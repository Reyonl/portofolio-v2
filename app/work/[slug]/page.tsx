import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProjectHeader from "@/components/ProjectHeader";
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
          className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted uppercase transition-colors hover:text-accent"
        >
          ← All work
        </Link>

        <ProjectHeader project={project} />

        <section className="mt-16">
          <h2 className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
            {"// the honest version"}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg/90">
            {project.detail}
          </p>
        </section>

        <p className="mt-12 text-xs text-muted">
          Status: {project.status === "active" ? "actively developed" : "shipped"} ·{" "}
          numbers above come from the project repository, not estimates.
        </p>
      </div>
    </main>
  );
}
