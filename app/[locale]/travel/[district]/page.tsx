import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { districts } from "@/src/data/chiangmai-districts";
import { districtTrips, type DistrictTrip, type LocalizedText } from "@/src/data/district-trips";
import TripMapModal from "@/app/components/TripMapModal";
import DistrictBg from "@/app/components/DistrictBg";
import DistrictHistorySection from "@/app/components/DistrictHistorySection";

type DistrictPageProps = {
  params: Promise<{ locale: string; district: string }>;
};

function getDistrictName(districtId: string): string {
  return districtId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getLocalizedText(locale: "en" | "zh", value: LocalizedText): string {
  return locale === "zh" ? value.zh : value.en;
}

function getImageSource(trip: DistrictTrip): string | null {
  const imagePath = trip.detail_more.img?.trim();
  if (!imagePath || !/\.(jpg|jpeg|png|webp|gif)$/i.test(imagePath)) {
    return null;
  }
  return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
}

export function generateStaticParams() {
  return districts.map((district) => ({
    district: district.id,
  }));
}

export default async function DistrictPage({ params }: DistrictPageProps) {
  const { locale, district } = await params;
  const normalizedLocale: "en" | "zh" = locale === "zh" ? "zh" : "en";
  const districtExists = districts.some((item) => item.id === district);

  if (!districtExists) notFound();

  const trips = districtTrips[district] ?? [];
  const districtName = getDistrictName(district);

  return (
    <div
      className="relative min-h-screen text-white"
      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
    >
      {/*
        ── Background strategy ────────────────────────────────────────────
        Parent div has no bg → layout gradient (blue→orange) shows through.
        DistrictBg (client component) tries to load the district image.
        If it loads → renders a fixed overlay with dark photo.
        If 404     → overlay is never shown → layout gradient stays visible.
      */}
      <DistrictBg district={district} />
      {/* ── Google Fonts ── */}
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Birthstone&display=swap');        .card-hover {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.5);
        }
        .back-link:hover .arrow { transform: translateX(-4px); }
        .arrow { transition: transform 0.2s ease; display: inline-block; }
        .tag-pill {
          background: rgba(212,163,87,0.15);
          border: 1px solid rgba(212,163,87,0.3);
          color: #d4a357;
          border-radius: 9999px;
          padding: 2px 12px;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
        }
        .map-frame {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          border: 1px solid rgba(212,163,87,0.25);
        }
        .map-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 20px;
          box-shadow: inset 0 0 0 1px rgba(212,163,87,0.15);
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,163,87,0.4), transparent);
        }
        .number-badge {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(212,163,87,0.5);
          color: #d4a357;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          font-family: 'DM Sans', sans-serif;
          flex-shrink: 0;
        }
      `}</style>

      {/* ── Ambient glow ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div style={{
          position: "absolute", top: "-10%", right: "5%",
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,163,87,0.08) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "-5%",
          width: 360, height: 360, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,172,190,0.06) 0%, transparent 70%)",
        }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 md:px-8">

        {/* ── Back link ── */}
        <Link
          href={`/${normalizedLocale}/travel`}
          className="back-link inline-flex items-center gap-2 mb-12 opacity-60 hover:opacity-100 transition-opacity"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: "0.05em", textDecoration: "none", color: "inherit" }}
        >
          <span className="arrow">←</span>
          <span>All Districts</span>
        </Link>

        {/* ── Hero header ── */}
        <header className="mb-16">
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4a357", marginBottom: 12 }}>
            Chiang Mai Province · Thailand
          </p>
          <h1 style={{
            fontFamily: "'Birthstone', cursive", // เพิ่มบรรทัดนี้
            fontSize: "clamp(48px, 8vw, 110px)",
            fontWeight: 400, // แนะนำให้แก้เป็น 400 สำหรับฟอนต์ลายมือ
            lineHeight: 1,
            marginBottom: 20,
            textShadow: "0 6px 40px rgba(0,0,0,0.6)" // เพิ่ม cinematic
          }}>
            {districtName}
          </h1>
          <div className="divider" style={{ maxWidth: 120 }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 16 }}>
            {trips.length} curated experiences
          </p>
        </header>

        {/* ── Interactive Map ── */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span style={{ fontSize: 20 }}>🗺</span>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
              Explore the Area
            </h2>
          </div>
          <TripMapModal
            trips={trips as any}
            locale={normalizedLocale}
            districtName={districtName}
            districtId={district}
          />
        </section>


        
        <DistrictHistorySection
          districtId={district}
          districtName={districtName}
          locale={normalizedLocale}
        />

        {/* ── Footer divider ── */}
        <div className="divider mt-24" />
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          color: "#d4a357",
          textAlign: "center",
          marginTop: 20,
          letterSpacing: "0.1em",
        }}>
          {districtName} · Chiang Mai · Thailand
        </p>
      </div>
    </div>
  );
}