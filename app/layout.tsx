import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import CommandPalette from "@/components/CommandPalette";
import "./globals.css";

import { SITE_URL } from "@/lib/siteUrl";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Reyon Lau Jiemin — Junior Developer",
    template: "%s — Reyon Lau Jiemin",
  },
  description:
    "Fresh Informatics Engineering graduate (Universitas Pamulang, 2026). PHP + Laravel at home, React + Next.js on the way up. Real shipped projects, built with AI-assisted workflows.",
  keywords: [
    "Reyon Lau Jiemin",
    "Junior Developer",
    "Junior Software Developer",
    "Web Developer Indonesia",
    "Laravel Developer",
    "PHP Developer",
    "Next.js Developer",
    "React",
    "TypeScript",
    "Full Stack Developer",
    "BNSP Web Programmer",
    "Universitas Pamulang",
    "Portfolio",
  ],
  authors: [{ name: "Reyon Lau Jiemin", url: "https://github.com/Reyonl" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Reyon Lau Jiemin — Portfolio",
    title: "Reyon Lau Jiemin — Junior Developer",
    description:
      "Fresh Informatics Engineering graduate (Universitas Pamulang, 2026). PHP + Laravel at home, React + Next.js on the way up. Real shipped projects.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reyon Lau Jiemin — Junior Developer",
    description: "PHP + Laravel at home, React + Next.js on the way up. Real projects, shipped.",
    creator: "@Reyonl",
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
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: "Reyon Lau Jiemin — Developer Profile",
        mainEntity: {
          "@id": `${SITE_URL}/#person`,
        },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Reyon Lau Jiemin",
        givenName: "Reyon",
        familyName: "Lau Jiemin",
        url: SITE_URL,
        jobTitle: "Junior Software Developer",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jakarta",
          addressCountry: "ID",
        },
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
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Reyon Lau Jiemin — Portfolio",
        description:
          "Fresh Informatics Engineering graduate (Universitas Pamulang, 2026). Laravel at home, Next.js on the way up. Real shipped projects.",
        author: {
          "@id": `${SITE_URL}/#person`,
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
