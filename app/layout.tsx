import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import CommandPalette from "@/components/CommandPalette";
import "./globals.css";

// Canonical URL: set NEXT_PUBLIC_SITE_URL at deploy time. The placeholder
// keeps metadata absolute locally and is a tracked TODO — the domain itself
// is deliberately PENDING until launch.
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.invalid";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  // Body font — the mobile LCP line is body text. `optional` avoids the
  // font-swap repaint that re-times LCP late on throttled connections;
  // next/font metric overrides keep the fallback visually stable.
  display: "optional",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Reyon Lau Jiemin — Junior Developer",
    template: "%s — Reyon Lau Jiemin",
  },
  description:
    "Fresh Informatics Engineering graduate (Universitas Pamulang, 2026). PHP + Laravel at home, React + Next.js on the way up. Real shipped projects, built with AI-assisted workflows.",
  keywords: [
    "Reyon Lau Jiemin",
    "Junior Developer",
    "Laravel",
    "PHP",
    "Next.js",
    "React",
    "Portfolio",
  ],
  authors: [{ name: "Reyon Lau Jiemin", url: "https://github.com/Reyonl" }],
  openGraph: {
    title: "Reyon Lau Jiemin — Junior Developer",
    description:
      "Laravel at home. Next.js on the way up. Real projects, shipped.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reyon Lau Jiemin — Junior Developer",
    description: "Laravel at home. Next.js on the way up.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE}/#person`,
        name: "Reyon Lau Jiemin",
        givenName: "Reyon",
        familyName: "Lau Jiemin",
        url: BASE,
        jobTitle: "Junior Software Developer",
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universitas Pamulang",
          sameAs: "https://unpam.ac.id",
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "BNSP Certified Web Programmer",
            credentialCategory: "Professional Certification",
            recognizedBy: {
              "@type": "Organization",
              name: "Badan Nasional Sertifikasi Profesi (BNSP)",
            },
          },
        ],
        sameAs: [
          "https://github.com/Reyonl",
          "https://www.linkedin.com/in/reyon-lau-jiemin-195026345/",
        ],
        knowsAbout: [
          "Laravel",
          "PHP",
          "Next.js",
          "React",
          "TypeScript",
          "MySQL",
          "Flutter",
          "Livewire",
          "Tailwind CSS",
          "REST API",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE}/#website`,
        url: BASE,
        name: "Reyon Lau Jiemin — Portfolio",
        description:
          "Fresh Informatics Engineering graduate (Universitas Pamulang, 2026). Laravel at home, Next.js on the way up. Real shipped projects.",
        author: {
          "@id": `${BASE}/#person`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable} ${jetbrains.variable} grain`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh bg-ink text-fg antialiased">
        <CommandPalette />
        {children}
      </body>
    </html>
  );
}
