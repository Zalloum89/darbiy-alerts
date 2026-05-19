export function navLinkClass(active: boolean) {
  return [
    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
    "transition-all duration-200 ease-out",
    active
      ? "bg-teal-50 text-teal-800 shadow-sm ring-1 ring-teal-100"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm active:scale-[0.98]",
  ].join(" ");
}

export function navIconClass(active: boolean) {
  return [
    "h-[18px] w-[18px] shrink-0 transition-colors duration-200",
    active ? "text-teal-700" : "text-slate-400 group-hover:text-slate-600",
  ].join(" ");
}

export function cardLinkClass() {
  return [
    "group block rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
    "transition-all duration-200 ease-out",
    "hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2",
    "active:translate-y-0 active:shadow-sm",
  ].join(" ");
}
