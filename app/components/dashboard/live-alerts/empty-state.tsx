import { Plane, Radar, Search } from "lucide-react";

type AlertsEmptyStateProps = {
  variant: "empty" | "search";
  message?: string;
};

function EmptyRadarIllustration() {
  return (
    <div className="relative mx-auto h-28 w-28" aria-hidden>
      <div className="absolute inset-0 rounded-full border border-dashed border-slate-200" />
      <div className="absolute inset-3 rounded-full border border-slate-200/80" />
      <div className="absolute inset-6 rounded-full border border-teal-200/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 to-slate-50 ring-1 ring-teal-100">
          <Radar className="h-7 w-7 text-teal-600/80" strokeWidth={1.5} />
        </div>
      </div>
      <span className="animate-live-sweep absolute start-1/2 top-1/2 h-14 w-0.5 origin-bottom -translate-x-1/2 rounded-full bg-gradient-to-t from-teal-500/80 to-transparent" />
      <Plane
        className="absolute end-2 top-6 h-5 w-5 -rotate-12 text-slate-300"
        strokeWidth={1.5}
      />
    </div>
  );
}

export function AlertsEmptyState({
  variant,
  message,
}: AlertsEmptyStateProps) {
  const isSearch = variant === "search";

  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-gradient-to-b from-slate-50/80 to-white px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-sm text-center">
        {isSearch ? (
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 ring-1 ring-slate-200/80">
            <Search className="h-9 w-9 text-slate-400" strokeWidth={1.5} />
          </div>
        ) : (
          <EmptyRadarIllustration />
        )}
        <p className="mt-5 text-base font-semibold tracking-tight text-slate-800">
          {isSearch ? "لا توجد نتائج" : "لا توجد رحلات مباشرة"}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {message ??
            (isSearch
              ? "جرّب البحث باسم مطار أو شركة طيران أو رقم رحلة"
              : "ستظهر هنا أحدث التنبيهات فور توفرها من مصدر الطيران")}
        </p>
      </div>
    </div>
  );
}
