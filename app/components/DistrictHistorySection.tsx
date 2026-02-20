import { districtHistory } from "@/src/data/district-history";

interface Props {
  districtId: string;
  districtName: string;
  locale: "en" | "zh";
}

export default function DistrictHistorySection({ districtId, districtName, locale }: Props) {
  const history = districtHistory[districtId];
  if (!history) return null;

  const content = locale === "zh" ? history.zh : history.en;

  return (
    <section style={{ marginTop: 80 }}>
      {/* Frosted glass card */}
      <div style={{
        background: "rgba(10, 12, 18, 0.55)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 28,
        padding: "48px 52px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}>

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <div style={{
            width: 3, height: 32, borderRadius: 2,
            background: "linear-gradient(to bottom, #d4a357, transparent)",
            flexShrink: 0,
          }} />
          <div>
            <p style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: 10,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "#d4a357", marginBottom: 4,
            }}>
              History &amp; Heritage
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 400, fontSize: "clamp(24px, 4vw, 34px)",
              color: "#fff", lineHeight: 1.1,
            }}>
              About {districtName}
            </h2>
          </div>
        </div>

        {/* Summary callout */}
        <blockquote style={{
          borderLeft: "2px solid rgba(212,163,87,0.5)",
          paddingLeft: 24,
          marginBottom: 36,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: "italic",
          fontSize: "clamp(18px, 2.5vw, 22px)",
          lineHeight: 1.65,
          color: "rgba(255,255,255,0.82)",
        }}>
          {content.summary}
        </blockquote>

        {/* Meta chips */}
        {(history.established || history.area_km2 || history.highlights) && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
            {history.established && (
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
                padding: "6px 14px",
                background: "rgba(212,163,87,0.12)",
                border: "1px solid rgba(212,163,87,0.25)",
                borderRadius: 9999, color: "#d4a357",
              }}>
                Est. {history.established}
              </span>
            )}
            {history.area_km2 && (
              <span style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
                padding: "6px 14px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 9999, color: "rgba(255,255,255,0.7)",
              }}>
                {history.area_km2.toLocaleString()} km²
              </span>
            )}
            {history.highlights?.map((tag) => (
              <span key={tag} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
                padding: "6px 14px",
                background: "rgba(99,172,190,0.10)",
                border: "1px solid rgba(99,172,190,0.22)",
                borderRadius: 9999, color: "#63acbe",
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div style={{
          height: 1, marginBottom: 36,
          background: "linear-gradient(90deg, rgba(212,163,87,0.3), transparent)",
        }} />

        {/* Paragraphs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {content.paragraphs.map((para, i) => (
            <p key={i} style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300, fontSize: "clamp(16px, 2vw, 19px)",
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.75)",
            }}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}