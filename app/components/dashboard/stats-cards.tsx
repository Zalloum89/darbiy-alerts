import { Activity, Building2, Globe2, Plane } from "lucide-react";
import { stats } from "./mock-data";

const icons = [Activity, Building2, Plane, Globe2] as const;

export function StatsCards() {
  return (
    <section aria-label="إحصائيات سريعة">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = icons[index] ?? Activity;
          const trendUp = stat.trend === "up";
          const trendDown = stat.trend === "down";

          return (
            <article
              key={stat.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 ring-1 ring-slate-100">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs">
                <span
                  className={[
                    "font-medium",
                    trendUp && "text-emerald-600",
                    trendDown && "text-rose-600",
                    !trendUp && !trendDown && "text-slate-600",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {stat.change}
                </span>
                <span className="text-slate-400">{stat.changeLabel}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
