import { Plane } from "lucide-react";
import { airlines, severityLabel, severityStyles } from "./mock-data";

export function AirlinesSection() {
  return (
    <section id="airlines" aria-label="تنبيهات شركات الطيران">
      <div className="mb-5">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          شركات الطيران
        </h2>
        <p className="mt-1 text-sm text-slate-500">تحديثات التشغيل والسياسات</p>
      </div>

      <div className="space-y-3">
        {airlines.map((airline) => {
          const style = severityStyles[airline.severity];
          return (
            <article
              key={airline.id}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-50 font-mono text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                {airline.code}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium text-slate-900">{airline.name}</h3>
                <p className="mt-0.5 text-sm text-slate-500">{airline.status}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {airline.alerts.toLocaleString("ar-EG")} تنبيهات نشطة
                </p>
              </div>
              <span
                className={`shrink-0 rounded-md px-2 py-1 text-xs font-medium ring-1 ${style.badge}`}
              >
                {severityLabel[airline.severity]}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
