import type { AlertSeverity } from "@/app/components/dashboard/mock-data";

/** Severity: high = red, medium = yellow, low = green */
export const severityUi: Record<
  AlertSeverity,
  { strip: string; badge: string; dot: string; label: string }
> = {
  high: {
    strip: "border-s-red-500 bg-gradient-to-l from-red-50/80 to-white",
    badge: "bg-red-100 text-red-800 ring-red-200/80",
    dot: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.55)]",
    label: "عالي",
  },
  medium: {
    strip: "border-s-amber-400 bg-gradient-to-l from-amber-50/70 to-white",
    badge: "bg-amber-100 text-amber-900 ring-amber-200/80",
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.45)]",
    label: "متوسط",
  },
  low: {
    strip: "border-s-emerald-500 bg-gradient-to-l from-emerald-50/60 to-white",
    badge: "bg-emerald-100 text-emerald-800 ring-emerald-200/80",
    dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]",
    label: "منخفض",
  },
};

export const statusStyles: Record<string, string> = {
  scheduled: "bg-sky-50 text-sky-800 ring-sky-200",
  active: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  landed: "bg-slate-100 text-slate-700 ring-slate-200",
  cancelled: "bg-rose-50 text-rose-800 ring-rose-200",
  incident: "bg-rose-50 text-rose-800 ring-rose-200",
  diverted: "bg-amber-50 text-amber-800 ring-amber-200",
  delayed: "bg-amber-50 text-amber-800 ring-amber-200",
};

export function getStatusStyle(status?: string) {
  if (!status) return "bg-slate-100 text-slate-700 ring-slate-200";
  const trimmed = status.trim();
  return (
    statusStyles[trimmed] ??
    statusStyles[trimmed.toLowerCase()] ??
    "bg-slate-100 text-slate-700 ring-slate-200"
  );
}

export const alertCardMotion =
  "transition-all duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md motion-safe:active:scale-[0.99] motion-safe:active:shadow-sm";
