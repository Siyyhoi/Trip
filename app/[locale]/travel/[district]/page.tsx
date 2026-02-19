import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { districts } from "@/src/data/chiangmai-districts";
import { districtTrips, type DistrictTrip, type LocalizedText } from "@/src/data/district-trips";

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

  if (!districtExists) {
    notFound();
  }

  const trips = districtTrips[district] ?? [];
  const districtName = getDistrictName(district);

  return (
    <div className="relative min-h-screen pb-16 text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 right-10 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mb-8 rounded-3xl border border-white/40 bg-white/65 p-6 shadow-lg backdrop-blur-xl">
          <Link
            href={`/${normalizedLocale}/travel`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            <span aria-hidden="true">{"<-"}</span>
            <span>Back to districts</span>
          </Link>
          <h1 className="mt-4 text-3xl font-semibold md:text-4xl">{districtName}</h1>
          <p className="mt-2 text-sm text-slate-700/80">{trips.length} trip entries from src/data</p>
        </div>

        {trips.length === 0 ? (
          <div className="rounded-3xl border border-white/40 bg-white/65 p-6 text-slate-700 shadow-md backdrop-blur-md">
            No trip entries in src/data for this district yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {trips.map((trip) => {
              const imageSource = getImageSource(trip);

              return (
                <article
                  key={trip.id}
                  className="overflow-hidden rounded-3xl border border-white/40 bg-white/70 shadow-md backdrop-blur-md"
                >
                  {imageSource ? (
                    <Image
                      src={imageSource}
                      alt={getLocalizedText(normalizedLocale, trip.title)}
                      width={1200}
                      height={720}
                      className="h-64 w-full object-cover"
                    />
                  ) : null}

                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      {getLocalizedText(normalizedLocale, trip.title)}
                    </h2>

                    <div className="mt-5 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Price</div>
                        <p className="mt-2 text-slate-800">{getLocalizedText(normalizedLocale, trip.price)}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Hours</div>
                        <p className="mt-2 text-slate-800">{getLocalizedText(normalizedLocale, trip.hours)}</p>
                      </div>
                    </div>

                    <p className="mt-5 leading-relaxed text-slate-700">
                      {getLocalizedText(normalizedLocale, trip.detail)}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

