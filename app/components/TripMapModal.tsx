"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

// ─── geoBoundaries shapeName aliases ──────────────────────────────────────
const DISTRICT_SHAPE_NAMES: Record<string, string[]> = {
  "mae-ai":     ["Mae Ai", "Mae Aye"],
  "mueang":     ["Mueang Chiang Mai", "Muang Chiang Mai"],
  "doi-saket":  ["Doi Saket"],
  "mae-rim":    ["Mae Rim"],
  "san-sai":    ["San Sai"],
  "hang-dong":  ["Hang Dong"],
  "chom-thong": ["Chom Thong"],
  "fang":       ["Fang"],
  "chiang-dao": ["Chiang Dao"],
  "doi-tao":    ["Doi Tao"],
  "saraphi":    ["Saraphi"],
  "hot":        ["Hot"],
};

const GEOBOUNDARIES_URL =
  "https://raw.githubusercontent.com/wmgeolab/geoBoundaries/main/releaseData/gbOpen/THA/ADM2/geoBoundaries-THA-ADM2_simplified.geojson";

// ─── Default center coordinates per district ──────────────────────────────
const DISTRICT_CENTERS: Record<string, [number, number]> = {
  "mae-ai":          [20.0621, 99.2834],
  "fang":            [19.9197, 99.2248],
  "chiang-dao":      [19.3627, 98.9761],
  "mueang":          [18.7883, 98.9853],
  "doi-saket":       [18.8660, 99.1833],
  "mae-rim":         [18.9142, 98.9530],
  "san-sai":         [18.8548, 99.0611],
  "hang-dong":       [18.6817, 98.9180],
  "chom-thong":      [18.4231, 98.6764],
  "doi-tao":         [17.9614, 98.6397],
  "saraphi":         [18.7164, 99.0151],
  "hot":             [18.1910, 98.5984],
  "mae-wang":        [18.5275, 98.7556],
  "omkoi":           [17.8191, 98.4365],
  "phrao":           [19.3526, 99.1823],
  "wiang-haeng":     [19.5758, 98.6425],
  "chai-prakan":     [19.7301, 99.1164],
  "mae-taeng":       [19.2226, 98.9316],
  "doi-lo":          [18.4839, 98.7725],
  "galyani-vadhana": [18.9167, 98.5833],
};


// ─── Types ────────────────────────────────────────────────────────────────
export interface LocalizedText { en: string; zh: string; }

export interface TripMapEntry {
  id: string;
  title: LocalizedText;
  price: LocalizedText;
  hours: LocalizedText;
  detail: LocalizedText;
  detail_more: {
    img?: string;
    lat?: number;
    lng?: number;
    location?: string;
    video?: string;
    [key: string]: unknown;
  };
}

interface Props {
  trips: TripMapEntry[];
  locale: "en" | "zh";
  districtName: string;
  districtId: string;
  defaultLat?: number;
  defaultLng?: number;
}

function txt(locale: "en" | "zh", v: LocalizedText): string {
  return locale === "zh" ? v.zh : v.en;
}
function imgSrc(trip: TripMapEntry): string | null {
  const p = trip.detail_more.img?.trim();
  if (!p || !/\.(jpg|jpeg|png|webp|gif)$/i.test(p)) return null;
  return p.startsWith("/") ? p : `/${p}`;
}

// ─── Framer Motion variants ───────────────────────────────────────────────
const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2, delay: 0.05 } },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 320,
      damping: 28,
      mass: 0.9,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 24,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
};

const imageVariants = {
  hidden:  { scale: 1.06, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.1 },
  },
};

const contentVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const, delay: 0.18 },
  },
};

// ─── Component ────────────────────────────────────────────────────────────
export default function TripMapModal({
  trips, locale, districtName, districtId,
  defaultLat = 18.79, defaultLng = 98.98,
}: Props): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<TripMapEntry | null>(null);
  const [boundaryStatus, setBoundaryStatus] = useState<"loading" | "ok" | "error">("loading");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  const geoTrips = trips.filter(
    (tr) => typeof tr.detail_more.lat === "number" && typeof tr.detail_more.lng === "number"
  );

  const centre = geoTrips.length > 0
    ? {
        lat: geoTrips.reduce((s, tr) => s + (tr.detail_more.lat as number), 0) / geoTrips.length,
        lng: geoTrips.reduce((s, tr) => s + (tr.detail_more.lng as number), 0) / geoTrips.length,
      }
    : { lat: (DISTRICT_CENTERS[districtId] ?? [defaultLat, defaultLng])[0], lng: (DISTRICT_CENTERS[districtId] ?? [defaultLat, defaultLng])[1] };

  useEffect(() => {
    if (!mapRef.current) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any;

    async function init() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L: any = (await import("leaflet")).default;

      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      if (!document.getElementById("map-label-css")) {
        const s = document.createElement("style");
        s.id = "map-label-css";
        s.textContent = `
          .map-label {
            background: rgba(15,17,23,0.88) !important;
            border: 1px solid rgba(212,163,87,0.55) !important;
            border-radius: 8px !important;
            color: #fff !important;
            font-size: 11px !important;
            font-family: 'DM Sans', sans-serif !important;
            padding: 3px 9px !important;
            white-space: nowrap !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.6) !important;
            pointer-events: none !important;
          }
          .map-label::before, .map-label::after { display: none !important; }
        `;
        document.head.appendChild(s);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((mapRef.current as any)?._leaflet_id) return;
      if (!mapRef.current) return;

      map = L.map(mapRef.current, {
        center: [centre.lat, centre.lng],
        zoom: 11,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer("https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", { maxZoom: 20 }).addTo(map);

      const aliases = DISTRICT_SHAPE_NAMES[districtId] ?? [districtName];
      try {
        const res = await fetch(GEOBOUNDARIES_URL);
        if (!res.ok) throw new Error("fetch failed");
        const geojson = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const matched = geojson.features.filter((f: any) => {
          const name: string = f.properties?.shapeName ?? "";
          return aliases.some((alias) => name.toLowerCase().includes(alias.toLowerCase()));
        });
        if (matched.length > 0) {
          const layer = L.geoJSON(
            { type: "FeatureCollection", features: matched },
            { style: { color: "#d4a357", weight: 2.5, opacity: 1, dashArray: "7 5", fillColor: "#d4a357", fillOpacity: 0.10 } }
          ).addTo(map);
          map.fitBounds(layer.getBounds(), { padding: [32, 32] });
          setBoundaryStatus("ok");
        } else {
          setBoundaryStatus("error");
        }
      } catch {
        setBoundaryStatus("error");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const goldIcon = L.divIcon({
        className: "",
        html: `<div style="
          width:28px;height:28px;
          background:linear-gradient(135deg,#f0c878 0%,#c4913c 100%);
          border:2px solid rgba(255,255,255,0.85);
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          box-shadow:0 4px 14px rgba(0,0,0,0.4);
          cursor:pointer;
        "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      if (geoTrips.length === 0) {
        L.marker([centre.lat, centre.lng]).addTo(map).bindPopup(`<b>${districtName}</b>`);
        return;
      }

      geoTrips.forEach((trip) => {
        const lat = trip.detail_more.lat as number;
        const lng = trip.detail_more.lng as number;
        const title = locale === "zh" ? trip.title.zh : trip.title.en;
        const marker = L.marker([lat, lng], { icon: goldIcon }).addTo(map);
        marker.bindTooltip(title, { permanent: true, direction: "top", offset: [0, -28], className: "map-label" });
        marker.on("click", () => setActive(trip));
      });
    }

    init();
    return () => { if (map) map.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* ── Map ─────────────────────────────────────────────────────── */}
      <div style={{
        position: "relative", borderRadius: 24, overflow: "hidden",
        border: "1px solid rgba(212,163,87,0.3)", height: 540,
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
      }}>
        <div ref={mapRef} style={{ width: "100%", height: "100%" }} />

        {geoTrips.length > 0 && (
          <div style={{
            position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 500,
            background: "rgba(15,17,23,0.75)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(212,163,87,0.3)", borderRadius: 9999,
            padding: "8px 20px",
            fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
            color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap", pointerEvents: "none",
          }}>
            Tap a pin to explore
          </div>
        )}

        <div style={{
          position: "absolute", bottom: 16, right: 16, zIndex: 500,
          background: "rgba(15,17,23,0.85)", backdropFilter: "blur(12px)",
          border: `1px solid ${boundaryStatus === "ok" ? "rgba(212,163,87,0.5)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: 9999, padding: "6px 16px",
          fontFamily: "'DM Sans', sans-serif", fontSize: 12,
          color: boundaryStatus === "ok" ? "#d4a357" : "rgba(255,255,255,0.4)",
          display: "flex", alignItems: "center", gap: 8,
          pointerEvents: "none",
        }}>
          {boundaryStatus === "loading" && (
            <>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block", animation: "bpulse 1.3s ease-in-out infinite" }} />
              <style>{`@keyframes bpulse{0%,100%{opacity:.2}50%{opacity:1}}`}</style>
              Loading boundary…
            </>
          )}
          {boundaryStatus === "ok" && <>◈ {districtName} District</>}
          {boundaryStatus === "error" && <>Map · {districtName}</>}
        </div>
      </div>

{/* ── Modal (Framer Motion) ────────────────────────────────────── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setActive(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(16px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              // 1. ปรับ padding เพื่อดันลงมาจาก Navbar และเพิ่มสเปซด้านล่าง
              padding: "100px 20px 60px", 
            }}
          >
            <motion.div
              key="modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%", maxWidth: 720,
                // 2. สำคัญ: เปลี่ยนจาก 100% เป็น 75vh หรือ 80vh เพื่อไม่ให้มันยืดสุดจอ
                maxHeight: "75vh", 
                display: "flex", flexDirection: "column",
                borderRadius: 28, position: "relative",
                boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(212,163,87,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
                background: "rgba(18,20,28,0.88)",
                backdropFilter: "blur(32px)",
                overflow: "hidden",
              }}
            >
              {/* Close button */}
              <motion.button
                onClick={() => setActive(null)}
                aria-label="Close"
                whileHover={{ 
                  scale: 1.05, 
                  background: "rgba(255,255,255,0.1)",
                  color: "#d4a357", // เปลี่ยนเป็นสีทองนิดๆ ตอน hover ให้เข้าธีม
                  borderColor: "rgba(212,163,87,0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: "absolute", top: 20, right: 20, zIndex: 50,
                  width: 40, height: 40, // ขยาย tap target ให้กดง่ายขึ้นบนมือถือ
                  borderRadius: "50%",
                  background: "rgba(15,17,23,0.4)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)", // ใช้สีเทาสว่างๆ จะดูละมุนกว่าขาวจั๊วะ
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  transition: "color 0.2s ease, border-color 0.2s ease"
                }}
              >
                <X size={20} strokeWidth={2} />
              </motion.button>

              {/* Scrollable content */}
              <div style={{ overflowY: "auto", width: "100%" }}>

                {/* Hero image */}
                {imgSrc(active) && (
                  <motion.div
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ position: "relative", height: 380, width: "100%", flexShrink: 0 }}
                  >
                    <Image
                      src={imgSrc(active)!}
                      alt={txt(locale, active.title)}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(18,20,28,1) 0%, rgba(18,20,28,0.15) 55%, transparent 100%)",
                    }} />
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
                      background: "linear-gradient(90deg, transparent, rgba(212,163,87,0.6), transparent)",
                    }} />
                  </motion.div>
                )}

                {/* Content */}
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ padding: imgSrc(active) ? "20px 48px 48px" : "48px", position: "relative" }}
                >
                  {/* Label */}
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
                    letterSpacing: "0.25em", textTransform: "uppercase",
                    color: "#d4a357", marginBottom: 12,
                  }}>
                    {districtName} · Attraction
                  </p>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 500, fontSize: "clamp(32px, 5vw, 42px)",
                    color: "#fff", marginBottom: 24, lineHeight: 1.1,
                  }}>
                    {txt(locale, active.title)}
                  </h3>

                  {/* Info grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                    <div style={{
                      background: "linear-gradient(145deg, rgba(212,163,87,0.08) 0%, rgba(212,163,87,0.02) 100%)",
                      border: "1px solid rgba(212,163,87,0.2)", borderRadius: 16, padding: "16px 20px",
                    }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#d4a357", marginBottom: 8 }}>Admission</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{txt(locale, active.price)}</p>
                    </div>
                    <div style={{
                      background: "linear-gradient(145deg, rgba(99,172,190,0.08) 0%, rgba(99,172,190,0.02) 100%)",
                      border: "1px solid rgba(99,172,190,0.2)", borderRadius: 16, padding: "16px 20px",
                    }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#63acbe", marginBottom: 8 }}>Hours</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.5 }}>{txt(locale, active.hours)}</p>
                    </div>
                  </div>

                  {/* Location */}
                  {active.detail_more.location && (
                    <div style={{
                      display: "flex", alignItems: "center", gap: 12, marginBottom: 24,
                      padding: "14px 18px", background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14,
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a357" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.5, flex: 1 }}>
                        {active.detail_more.location as string}
                      </p>
                      {/* Open in Google Maps button */}
                      {active.detail_more.lat && active.detail_more.lng && (
                        <motion.a
                          href={`https://www.google.com/maps?q=${active.detail_more.lat},${active.detail_more.lng}&ll=${active.detail_more.lat},${active.detail_more.lng}&z=17`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "7px 14px",
                            background: "linear-gradient(135deg, rgba(212,163,87,0.18), rgba(212,163,87,0.08))",
                            border: "1px solid rgba(212,163,87,0.35)",
                            borderRadius: 9999,
                            textDecoration: "none",
                            flexShrink: 0,
                            cursor: "pointer",
                          }}
                        >
                          {/* Google Maps pin icon */}
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="#d4a357">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                          <span style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 11, fontWeight: 600,
                            letterSpacing: "0.05em",
                            color: "#d4a357",
                            whiteSpace: "nowrap",
                          }}>
                            Open Map
                          </span>
                        </motion.a>
                      )}
                    </div>
                  )}

                  {/* Divider */}
                  <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "24px 0" }} />

                  {/* Description */}
                  <p style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontWeight: 400, fontStyle: "italic",
                    fontSize: 21, lineHeight: 1.75,
                    color: "rgba(255,255,255,0.75)",
                  }}>
                    {txt(locale, active.detail)}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}