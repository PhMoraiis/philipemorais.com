import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: "#0a0a0a",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 26,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#a1a1aa",
        }}
      >
        philipemorais.com
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 700 }}>
          Philipe Morais
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 400,
            color: "#d4d4d8",
          }}
        >
          Desenvolvedor Frontend & UX/UI Designer
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          fontSize: 26,
          color: "#a1a1aa",
        }}
      >
        React · Next.js · TypeScript · Web Design
      </div>
    </div>,
    { ...size },
  );
}
