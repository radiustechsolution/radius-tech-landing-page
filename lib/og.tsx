import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };

const domain = site.url.replace(/^https?:\/\//, "");

/** Logo drawn with solid colours (works inside generated images) */
export function OgLogo({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path
        d="M95 50 A45 45 0 1 1 81.82 18.18"
        stroke="#1D5DFF"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M50 21 A29 29 0 1 0 75.11 35.5"
        stroke="#C8CCD4"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path d="M50 50 L84 16" stroke="#C8CCD4" strokeWidth="8" />
      <polygon
        points="59.66,52.59 52.59,59.66 42.93,57.07 40.34,47.41 47.41,40.34 57.07,42.93"
        fill="#C8CCD4"
        stroke="#C8CCD4"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function renderOg({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#000000",
        padding: "64px 72px",
        position: "relative",
      }}
    >
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Silver glow */}
      <div
        style={{
          position: "absolute",
          top: -260,
          left: 250,
          width: 800,
          height: 560,
          display: "flex",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220,224,232,0.22) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      {/* Top line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          display: "flex",
          background:
            "linear-gradient(to right, rgba(255,255,255,0), rgba(217,220,227,0.6), rgba(255,255,255,0))",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <OgLogo size={60} />
          <span
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -1,
            }}
          >
            Radius
          </span>
        </div>
        <span style={{ fontSize: 22, color: "#747a85" }}>{domain}</span>
      </div>

      {/* Title */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontSize: 20,
            color: "#9aa0ab",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            marginTop: 20,
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.05,
            letterSpacing: -2.5,
            maxWidth: 960,
          }}
        >
          {title}
        </span>
        <span
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#9aa0ab",
            maxWidth: 860,
          }}
        >
          {subtitle}
        </span>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 24,
          fontSize: 20,
          color: "#747a85",
        }}
      >
        <span>Mobile / Web / Backend / Fintech / Cloud</span>
        <span>{site.name}</span>
      </div>
    </div>,
    { ...ogSize },
  );
}
