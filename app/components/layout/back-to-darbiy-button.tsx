import { ArrowLeft } from "lucide-react";

const DARBIY_HOME_URL = "https://darbiy.com";

export function BackToDarbiyButton() {
  return (
    <a
      href={DARBIY_HOME_URL}
      rel="noopener noreferrer"
      className={[
        "group fixed z-50 flex items-center justify-center gap-2 rounded-full font-semibold text-white shadow-lg",
        "bg-teal-600 ring-1 ring-teal-500/30",
        "transition-all duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:bg-teal-700 motion-safe:hover:shadow-xl motion-safe:hover:shadow-teal-600/30",
        "motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2",
        "inset-x-4 bottom-[calc(4.25rem+env(safe-area-inset-bottom,0px))] px-5 py-3 text-sm",
        "lg:inset-x-auto lg:bottom-auto lg:top-4 lg:left-4 lg:px-4 lg:py-2.5",
      ].join(" ")}
      aria-label="العودة إلى موقع داربي الرئيسي"
    >
      <ArrowLeft
        className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out motion-safe:group-hover:-translate-x-0.5 rtl:rotate-180"
        strokeWidth={2}
        aria-hidden
      />
      <span>العودة إلى داربي</span>
    </a>
  );
}
