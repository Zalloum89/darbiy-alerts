import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { severityLabel, severityStyles } from "./mock-data";
import { getFeaturedAirlines } from "@/app/lib/airlines-data";
import { cardLinkClass } from "@/app/components/layout/nav-link-styles";

export function AirlinesSection() {
  const airlines = getFeaturedAirlines();

  return (
    <section id="airlines" aria-label="تنبيهات شركات الطيران">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-slate-900">
            شركات الطيران
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            تحديثات التشغيل والسياسات — اضغط لعرض التفاصيل
          </p>
        </div>
        <p className="text-xs text-slate-400">
          {airlines.length.toLocaleString("ar-EG")} شركات متاحة
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {airlines.map((airline) => {
          const style = severityStyles[airline.severity];
          const href = `/airline/${airline.slug}`;

          return (
            <Link
              key={airline.slug}
              href={href}
              prefetch
              className={cardLinkClass()}
              aria-label={`عرض صفحة ${airline.nameAr}`}
            >
              <article className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-50 font-mono text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition-all duration-200 group-hover:bg-teal-50 group-hover:text-teal-800 group-hover:ring-teal-100">
                  {airline.code}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-medium text-slate-900 transition-colors duration-200 group-hover:text-teal-800">
                    {airline.nameAr}
                  </h3>
                  <p className="mt-0.5 text-sm text-slate-500">{airline.statusAr}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {airline.countryAr} ·{" "}
                    {airline.activeAlerts.toLocaleString("ar-EG")} تنبيهات نشطة
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ring-1 ${style.badge}`}
                  >
                    {severityLabel[airline.severity]}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-teal-700 transition-all duration-200 group-hover:gap-1.5 group-hover:text-teal-800">
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
    </section>
  );
}
