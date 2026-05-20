export function AlertsLoadingSkeleton() {
  return (
    <div
      className="space-y-3 sm:space-y-4"
      aria-busy="true"
      aria-label="جاري تحميل التنبيهات"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-5"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-start gap-3">
            <div className="alert-shimmer h-11 w-11 shrink-0 rounded-xl" />
            <div className="min-w-0 flex-1 space-y-2.5">
              <div className="alert-shimmer h-4 w-2/5 max-w-[140px] rounded-md" />
              <div className="flex gap-2">
                <div className="alert-shimmer h-6 w-16 rounded-full" />
                <div className="alert-shimmer h-6 w-20 rounded-full" />
              </div>
            </div>
            <div className="alert-shimmer h-8 w-14 rounded-lg" />
          </div>
          <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
            <div className="alert-shimmer h-[72px] rounded-xl sm:h-20" />
            <div className="alert-shimmer h-7 w-7 rounded-full" />
            <div className="alert-shimmer h-[72px] rounded-xl sm:h-20" />
          </div>
          <div className="alert-shimmer mt-3 h-12 rounded-xl" />
        </div>
      ))}
    </div>
  );
}
