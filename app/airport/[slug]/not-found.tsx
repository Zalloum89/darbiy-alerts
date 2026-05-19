import Link from "next/link";
import { MapPin, Plane } from "lucide-react";
import { getFeaturedAirports } from "@/app/lib/airports-data";

export default function AirportNotFound() {
  const airports = getFeaturedAirports();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 text-slate-400 ring-1 ring-slate-200">
          <MapPin className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <h1 className="mt-6 text-xl font-semibold text-slate-900">
          المطار غير موجود
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          لم نتمكن من العثور على صفحة المطار المطلوبة. تحقق من الرابط أو اختر
          أحد المطارات المتاحة أدناه.
        </p>

        <ul className="mt-6 space-y-2 text-start">
          {airports.map((airport) => (
            <li key={airport.slug}>
              <Link
                href={`/airport/${airport.slug}`}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm transition hover:border-teal-200 hover:bg-teal-50/50"
              >
                <span className="font-medium text-slate-900">
                  {airport.nameAr}
                </span>
                <span className="font-mono text-xs text-slate-500">
                  {airport.code}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
        >
          <Plane className="h-4 w-4" aria-hidden />
          العودة للوحة المراقبة
        </Link>
      </div>
    </div>
  );
}
