import { Activity } from "lucide-react";
import type { AirportDefinition } from "@/app/lib/airports-data";
import { severityLabel, severityStyles } from "@/app/components/dashboard/mock-data";

type AirportStatusCardProps = {
  airport: AirportDefinition;
};

export function AirportStatusCard({ airport }: AirportStatusCardProps) {
  const style = severityStyles[airport.severity];

  return (
    <section
      aria-label="حالة المطار"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-teal-600" strokeWidth={1.75} />
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          حالة المطار
        </h2>
      </div>

      <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-lg font-semibold text-slate-900">{airport.statusAr}</p>
          <span
            className={`rounded-md px-2.5 py-1 text-xs font-medium ring-1 ${style.badge}`}
          >
            أولوية {severityLabel[airport.severity]}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {airport.statusDetailAr}
        </p>
        <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
          تحديث تشغيلي مباشر
        </p>
      </div>
    </section>
  );
}
