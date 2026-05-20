import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { AirlineDefinition } from "@/app/lib/airlines-data";
import { getAirportBySlug } from "@/app/lib/airports-data";
import { cardLinkClass } from "@/app/components/layout/nav-link-styles";
import { severityLabel, severityStyles } from "@/app/components/dashboard/mock-data";

type AirlineOperatingAirportsProps = {
  airline: AirlineDefinition;
};

export function AirlineOperatingAirports({ airline }: AirlineOperatingAirportsProps) {
  const airports = airline.operatingAirportSlugs
    .map((slug) => getAirportBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => a !== null);

  if (airports.length === 0) return null;

  return (
    <section
      aria-label="المطارات التشغيلية"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-5">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          المطارات التشغيلية
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          محاور {airline.nameAr} على شبكة داربي
        </p>
      </div>

      <div className="space-y-3">
        {airports.map((airport) => {
          const style = severityStyles[airport.severity];
          return (
            <Link
              key={airport.slug}
              href={`/airport/${airport.slug}`}
              prefetch
              className={cardLinkClass()}
              aria-label={`صفحة ${airport.nameAr}`}
            >
              <article className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 font-mono text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition-colors duration-200 group-hover:bg-teal-50 group-hover:text-teal-800">
                    {airport.code}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 transition-colors duration-200 group-hover:text-teal-800">
                      {airport.nameAr}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {airport.cityAr} · {airport.countryAr}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-medium ring-1 ${style.badge}`}
                  >
                    {severityLabel[airport.severity]}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-teal-700">
                    التفاصيل
                    <ArrowLeft
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5 rtl:rotate-180"
                      aria-hidden
                    />
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      <Link
        href="/#airports"
        className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-teal-700 transition-colors duration-200 hover:text-teal-800"
      >
        <MapPin className="h-3.5 w-3.5" aria-hidden />
        عرض جميع المطارات
      </Link>
    </section>
  );
}
