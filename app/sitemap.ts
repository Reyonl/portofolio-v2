import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.invalid"; // TODO: real domain at deploy time (domain is PENDING by decision — never deploy blindly)

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${BASE}/work/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
