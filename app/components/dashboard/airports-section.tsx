import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { severityLabel, severityStyles } from "./mock-data";
import { getFeaturedAirports } from "@/app/lib/airports-data";
import { cardLinkClass } from "@/app/components/layout/nav-link-styles";

export function AirportsSection() {
  const airports = getFeaturedAirports();

  return (
    <section id="airports" aria-label="تنبيهات المطارات">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-slate-900">
            المطارات
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            حالة المطارات والتنبيهات النشطة — اضغط لعرض التفاصيل
          </p>
        </div>
        <p className="text-xs text-slate-400">
          {airports.length.toLocaleString("ar-EG")} مطارات متاحة
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {airports.map((airport) => {
          const style = severityStyles[airport.severity];
          const href = `/airport/${airport.slug}`;

          return (
            <Link
              key={airport.slug}
              href={href}
              prefetch
              className={cardLinkClass()}
              aria-label={`عرض صفحة ${airport.nameAr}`}
            >
              <article>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-50 font-mono text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition-all duration-200 group-hover:bg-teal-50 group-hover:text-teal-800 group-hover:ring-teal-100">
                      {airport.code}
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 transition-colors duration-200 group-hover:text-teal-800">
                        {airport.nameAr}
                      </h3>
                      <p className="text-sm text-slate-500">{airport.countryAr}</p>
                    </div>
                  </div>
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ring-1 transition-shadow duration-200 ${style.badge}`}
                  >
                    {severityLabel[airport.severity]}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {airport.statusAr}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-teal-700 transition-all duration-200 group-hover:gap-1.5 group-hover:text-teal-800">
                    {airport.activeAlerts.toLocaleString("ar-EG")} تنبيهات
                    <ArrowLeft
                      className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5 rtl:rotate-180"
                      aria-hidden
                    />
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
