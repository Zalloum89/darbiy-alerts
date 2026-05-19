import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { AirportDefinition } from "@/app/lib/airports-data";
import { severityLabel, severityStyles } from "@/app/components/dashboard/mock-data";
import { cardLinkClass } from "@/app/components/layout/nav-link-styles";

type RelatedAirportsProps = {
  airports: AirportDefinition[];
  currentSlug: string;
};

export function RelatedAirports({ airports, currentSlug }: RelatedAirportsProps) {
  const related = airports.filter((a) => a.slug !== currentSlug);
  if (related.length === 0) return null;

  return (
    <section
      aria-labelledby="related-airports-heading"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="related-airports-heading"
            className="text-base font-semibold tracking-tight text-slate-900"
          >
            مطارات ذات صلة
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            استكشف محاور سفر أخرى على شبكة دربي
          </p>
        </div>
        <Link
          href="/#airports"
          className="text-sm font-medium text-teal-700 transition-colors duration-200 hover:text-teal-800"
        >
          عرض الكل
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((airport) => {
          const style = severityStyles[airport.severity];
          return (
            <Link
              key={airport.slug}
              href={`/airport/${airport.slug}`}
              prefetch
              className={cardLinkClass()}
              aria-label={`صفحة ${airport.nameAr}`}
            >
              <article>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 font-mono text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition-colors duration-200 group-hover:bg-teal-50 group-hover:text-teal-800">
                      {airport.code}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate font-medium text-slate-900 transition-colors duration-200 group-hover:text-teal-800">
                        {airport.cityAr}
                      </h3>
                      <p className="truncate text-xs text-slate-500">
                        {airport.countryAr}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium ring-1 ${style.badge}`}
                  >
                    {severityLabel[airport.severity]}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-slate-600">
                  {airport.nameAr}
                </p>
                <p className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="h-3 w-3" aria-hidden />
                    {airport.statusAr}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-teal-700 transition-transform duration-200 group-hover:-translate-x-0.5">
                    التفاصيل
                    <ArrowLeft className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden />
                  </span>
                </p>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
