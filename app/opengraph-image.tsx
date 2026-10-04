import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import path from "node:path";

// OG card: same quiet-dark/amber language as the site. Fonts are bundled
// under /assets/fonts (downloaded from Google Fonts) so this renders offline.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const bricolage = readFileSync(
    path.join(process.cwd(), "assets/fonts/bricolage-bold.ttf"),
  );
  const inter = readFileSync(
    path.join(process.cwd(), "assets/fonts/inter-semibold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "#07090d",
          position: "relative",
        }}
      >
        {/* ambient amber glow */}
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(255,138,61,0.16)",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontFamily: "Inter",
            color: "#8b94a4",
            letterSpacing: 4,
            marginBottom: 20,
          }}
        >
          FRESH GRADUATE · LARAVEL → NEXT.JS
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontFamily: "Bricolage",
            fontWeight: 700,
            color: "#e9edf3",
            lineHeight: 1,
          }}
        >
          Reyon Lau
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontFamily: "Bricolage",
            fontWeight: 700,
            color: "#ff8a3d",
            lineHeight: 1.05,
          }}
        >
          Jiemin
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 24,
            fontFamily: "Inter",
            color: "#8b94a4",
          }}
        >
          github.com/Reyonl
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: bricolage, style: "normal", weight: 700 },
        { name: "Inter", data: inter, style: "normal", weight: 600 },
      ],
    },
  );
}
