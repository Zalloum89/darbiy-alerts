export default function AirportLoading() {
  return (
    <div
      className="flex min-h-screen bg-slate-50"
      aria-busy="true"
      aria-label="جاري تحميل صفحة المطار"
    >
      <div className="hidden w-64 shrink-0 border-e border-slate-200 bg-white lg:block">
        <div className="animate-pulse border-b border-slate-100 px-5 py-6">
          <div className="h-9 w-9 rounded-lg bg-slate-100" />
          <div className="mt-3 h-4 w-24 rounded bg-slate-100" />
        </div>
        <div className="space-y-2 p-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 rounded-lg bg-slate-50" />
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-slate-200 bg-white px-4 py-6 sm:px-8">
          <div className="mx-auto max-w-7xl animate-pulse space-y-2">
            <div className="h-3 w-28 rounded bg-slate-100" />
            <div className="h-8 w-64 max-w-full rounded bg-slate-100" />
            <div className="h-4 w-40 rounded bg-slate-50" />
          </div>
        </div>

        <main className="mx-auto w-full max-w-7xl flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-8">
            <div className="flex gap-4">
              <div className="h-14 w-14 rounded-xl bg-slate-100" />
              <div className="flex-1 space-y-3">
                <div className="h-7 w-2/3 rounded bg-slate-100" />
                <div className="h-4 w-1/3 rounded bg-slate-50" />
                <div className="h-4 w-full rounded bg-slate-50" />
              </div>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="animate-pulse space-y-4 lg:col-span-2">
              <div className="h-64 rounded-2xl border border-slate-200 bg-white" />
            </div>
            <div className="animate-pulse space-y-4">
              <div className="h-48 rounded-2xl border border-slate-200 bg-white" />
              <div className="h-56 rounded-2xl border border-slate-200 bg-white" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
