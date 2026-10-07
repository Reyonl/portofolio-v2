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
  const reyonBuffer = readFileSync(
    path.join(process.cwd(), "public/images/reyon.png"),
  );
  const reyonBase64 = `data:image/png;base64,${reyonBuffer.toString("base64")}`;

  const badges = ["Laravel", "Next.js", "React", "TypeScript", "MySQL", "Flutter"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px 72px",
          background: "#07090d",
          position: "relative",
        }}
      >
        {/* ambient amber glows */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: 9999,
            background: "rgba(255,138,61,0.12)",
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: 200,
            width: 450,
            height: 450,
            borderRadius: 9999,
            background: "rgba(255,138,61,0.14)",
            filter: "blur(90px)",
          }}
        />

        {/* Left column: Info & Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 680,
          }}
        >
          {/* Status badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 9999,
                background: "#22c55e",
              }}
            />
            <span
              style={{
                fontSize: 16,
                fontFamily: "Inter",
                color: "#8b94a4",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Available for Work · Jakarta (WIB)
            </span>
          </div>

          {/* Name */}
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontFamily: "Bricolage",
              fontWeight: 700,
              color: "#e9edf3",
              lineHeight: 0.95,
              letterSpacing: -2,
            }}
          >
            Reyon Lau
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontFamily: "Bricolage",
              fontWeight: 700,
              color: "#ff8a3d",
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Jiemin
          </div>

          {/* Role & Credentials */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 18,
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontFamily: "Inter",
                color: "#e9edf3",
                fontWeight: 600,
              }}
            >
              Junior Software Developer
            </span>
            <span
              style={{
                fontSize: 16,
                fontFamily: "Inter",
                color: "#8b94a4",
              }}
            >
              Univ. Pamulang (2026) · BNSP Certified Web Programmer
            </span>
          </div>

          {/* Tech Stack Badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 28,
            }}
          >
            {badges.map((b) => (
              <div
                key={b}
                style={{
                  display: "flex",
                  padding: "6px 14px",
                  borderRadius: 9999,
                  border: "1px solid #1d2430",
                  background: "#0f1218",
                  color: "#e9edf3",
                  fontSize: 14,
                  fontFamily: "Inter",
                }}
              >
                {b}
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 16,
              fontFamily: "Inter",
              color: "#8b94a4",
            }}
          >
            github.com/Reyonl · liurey55@gmail.com
          </div>
        </div>

        {/* Right column: Die-cut Portrait */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 380,
            height: 500,
            position: "relative",
          }}
        >
          {/* Circular ring around portrait */}
          <div
            style={{
              position: "absolute",
              width: 380,
              height: 380,
              borderRadius: 9999,
              border: "2px dashed rgba(255,138,61,0.3)",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={reyonBase64}
            alt="Reyon Lau Jiemin"
            style={{
              width: 360,
              height: 480,
              objectFit: "contain",
              objectPosition: "bottom center",
            }}
          />
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
