import Link from "next/link";
import { districts } from "@/src/data/chiangmai-districts";
import { districtTrips, type DistrictTrip } from "@/src/data/district-trips";

type TravelPageProps = {
  params: Promise<{ locale: string }>;
};

function getDistrictName(districtId: string): string {
  return districtId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getLocalizedTitle(locale: "en" | "zh", trip: DistrictTrip): string {
  return locale === "zh" ? trip.title.zh : trip.title.en;
}

export default async function TravelPage({ params }: TravelPageProps) {
  const { locale } = await params;
  const normalizedLocale: "en" | "zh" = locale === "zh" ? "zh" : "en";

  return (
    <div className="relative min-h-screen pb-16 text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-300/35 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 md:px-6">
        <div className="mb-8 rounded-3xl border border-white/40 bg-white/60 p-6 shadow-lg backdrop-blur-xl">
          <h1 className="text-3xl font-semibold md:text-4xl">Travel Districts</h1>
          <p className="mt-2 text-sm text-slate-700/80">
            Select a district to open its trip data from src/data.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((district) => {
            const trips = districtTrips[district.id] ?? [];
            const previewItems = trips.slice(0, 2);

            return (
              <Link
                key={district.id}
                href={`/${normalizedLocale}/travel/${district.id}`}
                className="group rounded-3xl border border-white/40 bg-white/60 p-5 shadow-md backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:bg-white/80 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {getDistrictName(district.id)}
                  </h2>
                  <span className="inline-flex min-w-10 items-center justify-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                    {trips.length}
                  </span>
                </div>

                {previewItems.length > 0 ? (
                  <ul className="mt-4 space-y-1 text-sm text-slate-700/85">
                    {previewItems.map((trip) => (
                      <li key={trip.id} className="truncate">
                        {getLocalizedTitle(normalizedLocale, trip)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-4 text-sm text-slate-500">No trip entries yet.</div>
                )}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
