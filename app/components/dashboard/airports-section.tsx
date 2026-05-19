import { MapPin } from "lucide-react";
import { airports, severityLabel, severityStyles } from "./mock-data";

export function AirportsSection() {
  return (
    <section id="airports" aria-label="تنبيهات المطارات">
      <div className="mb-5">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          المطارات
        </h2>
        <p className="mt-1 text-sm text-slate-500">حالة المطارات والتنبيهات النشطة</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {airports.map((airport) => {
          const style = severityStyles[airport.severity];
          return (
            <article
              key={airport.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-50 font-mono text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                    {airport.code}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">{airport.name}</h3>
                    <p className="text-sm text-slate-500">{airport.city}</p>
                  </div>
                </div>
                <span
                  className={`rounded-md px-2 py-1 text-xs font-medium ring-1 ${style.badge}`}
                >
                  {severityLabel[airport.severity]}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-sm">
                <span className="text-slate-500">{airport.status}</span>
                <span className="font-medium text-slate-700">
                  {airport.alerts.toLocaleString("ar-EG")} تنبيهات
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
