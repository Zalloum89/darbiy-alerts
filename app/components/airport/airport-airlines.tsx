import Link from "next/link";
import { ArrowLeft, Plane } from "lucide-react";
import type { AirportDefinition } from "@/app/lib/airports-data";
import { getAirlineSlugByCode } from "@/app/lib/airlines-data";
import { cardLinkClass } from "@/app/components/layout/nav-link-styles";

type AirportAirlinesProps = {
  airport: AirportDefinition;
};

export function AirportAirlines({ airport }: AirportAirlinesProps) {
  return (
    <section
      aria-label="شركات الطيران العاملة"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-5">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          شركات الطيران العاملة
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          شركات نشطة في {airport.nameAr}
        </p>
      </div>

      <div className="space-y-3">
        {airport.airlines.map((airline) => {
          const airlineSlug = getAirlineSlugByCode(airline.code);
          const inner = (
            <>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-teal-700 ring-1 ring-slate-200 transition-colors duration-200 group-hover:bg-teal-50">
                  <Plane className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 transition-colors duration-200 group-hover:text-teal-800">
                    {airline.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {airline.flights.toLocaleString("ar-EG")} رحلة اليوم
                  </p>
                </div>
              </div>
              <div className="text-end">
                <span className="rounded-md bg-white px-2 py-0.5 font-mono text-xs text-slate-600 ring-1 ring-slate-200">
                  {airline.code}
                </span>
                <p className="mt-1 text-xs font-medium text-slate-600">
                  {airline.status}
                </p>
                {airlineSlug ? (
                  <span className="mt-1 flex items-center justify-end gap-1 text-xs font-medium text-teal-700">
                    صفحة الشركة
                    <ArrowLeft
                      className="h-3 w-3 rtl:rotate-180"
                      aria-hidden
                    />
                  </span>
                ) : null}
              </div>
            </>
          );

          if (airlineSlug) {
            return (
              <Link
                key={airline.code}
                href={`/airline/${airlineSlug}`}
                prefetch
                className={`group ${cardLinkClass()}`}
                aria-label={`صفحة ${airline.name}`}
              >
                <article className="flex items-center justify-between gap-4">
                  {inner}
                </article>
              </Link>
            );
          }

          return (
            <article
              key={airline.code}
              className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4"
            >
              {inner}
            </article>
          );
        })}
      </div>
    </section>
  );
}
