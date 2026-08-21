import { ImageResponse } from "next/og";

export const alt = "PLU IA — Analyse de parcelle, urbanisme et bilan promoteur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0e1a33",
          backgroundImage:
            "linear-gradient(135deg, #0e1a33 0%, #1d3a6e 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontFamily: "monospace",
            fontSize: 24,
            letterSpacing: 2,
            color: "#e08a5c",
            textTransform: "uppercase",
          }}
        >
          PLU IA
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#f5f2ec",
              maxWidth: 980,
            }}
          >
            Analyse de parcelle, urbanisme et bilan promoteur
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#a8b7d6",
              maxWidth: 900,
            }}
          >
            Cadastre IGN · GPU · DVF · Géorisques — sources à l&apos;appui, à la parcelle.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
