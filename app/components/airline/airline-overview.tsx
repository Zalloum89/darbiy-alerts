import { FileText } from "lucide-react";
import type { AirlineDefinition } from "@/app/lib/airlines-data";

type AirlineOverviewProps = {
  airline: AirlineDefinition;
};

export function AirlineOverview({ airline }: AirlineOverviewProps) {
  return (
    <section
      aria-label="نظرة عامة على الشركة"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-5 w-5 text-teal-600" strokeWidth={1.75} />
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          نظرة عامة
        </h2>
      </div>
      <p className="text-sm leading-relaxed text-slate-600">{airline.overviewAr}</p>
      <dl className="mt-5 grid gap-3 border-t border-slate-100 pt-5 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium text-slate-500">الدولة</dt>
          <dd className="mt-0.5 font-medium text-slate-900">{airline.countryAr}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-500">رمز IATA</dt>
          <dd className="mt-0.5 font-mono font-medium text-slate-900" dir="ltr">
            {airline.code}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-500">المطارات التشغيلية</dt>
          <dd className="mt-0.5 font-medium text-slate-900">
            {airline.operatingAirportSlugs.length.toLocaleString("ar-EG")} محاور
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-slate-500">التنبيهات النشطة</dt>
          <dd className="mt-0.5 font-medium text-teal-700">
            {airline.activeAlerts.toLocaleString("ar-EG")}
          </dd>
        </div>
      </dl>
    </section>
  );
}
