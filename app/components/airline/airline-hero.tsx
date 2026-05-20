import Link from "next/link";
import { Globe2, Radio } from "lucide-react";
import type { AirlineDefinition } from "@/app/lib/airlines-data";
import { severityLabel, severityStyles } from "@/app/components/dashboard/mock-data";

type AirlineHeroProps = {
  airline: AirlineDefinition;
};

export function AirlineHero({ airline }: AirlineHeroProps) {
  const style = severityStyles[airline.severity];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <Link
        href="/#airlines"
        className="mb-4 inline-flex text-xs font-medium text-teal-700 transition-colors duration-200 hover:text-teal-800"
      >
        ← العودة إلى قائمة شركات الطيران
      </Link>
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex min-w-0 flex-1 items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-teal-50 font-mono text-sm font-bold text-teal-800 ring-1 ring-teal-100">
            {airline.code}
          </div>
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              {airline.nameAr}
            </h2>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <Globe2 className="h-4 w-4 shrink-0 text-slate-400" aria-hidden />
              <span>{airline.countryAr}</span>
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
              {airline.overviewAr}
            </p>
            <p className="mt-1 text-xs text-slate-400" dir="ltr" lang="en">
              {airline.nameEn} · {airline.countryEn}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`rounded-md px-2.5 py-1 text-xs font-medium ring-1 ${style.badge}`}
          >
            {severityLabel[airline.severity]}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <Radio className="h-4 w-4 text-emerald-600" aria-hidden />
            {airline.activeAlerts.toLocaleString("ar-EG")} تنبيهات نشطة
          </span>
        </div>
      </div>
    </section>
  );
}
