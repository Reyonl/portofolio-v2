import type { MetadataRoute } from "next";
import { profile } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Portfolio`,
    short_name: "Reyon Portfolio",
    description: profile.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#07090d",
    theme_color: "#ff8a3d",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
