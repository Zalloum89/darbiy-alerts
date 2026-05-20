"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LayoutDashboard, MapPin, Menu } from "lucide-react";

type MobileBottomNavProps = {
  onMenuClick: () => void;
};

const items = [
  { id: "home", label: "الرئيسية", href: "/", icon: LayoutDashboard },
  { id: "alerts", label: "التنبيهات", href: "/#alerts", icon: Bell },
  { id: "airports", label: "المطارات", href: "/#airports", icon: MapPin },
] as const;

export function MobileBottomNav({ onMenuClick }: MobileBottomNavProps) {
  const pathname = usePathname();
  const onHubPage =
    pathname.startsWith("/airport/") || pathname.startsWith("/airline/");

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md lg:hidden"
      aria-label="التنقل السريع"
    >
      <ul className="mx-auto flex max-w-lg items-center justify-around gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            item.id === "home"
              ? pathname === "/"
              : item.id === "alerts"
                ? pathname === "/" && !onHubPage
                : item.id === "airports"
                  ? onHubPage
                  : false;

          return (
            <li key={item.id} className="flex-1">
              <Link
                href={item.href}
                className={[
                  "flex flex-col items-center gap-0.5 rounded-lg px-2 py-2 text-[11px] font-medium transition-all duration-200",
                  active
                    ? "text-teal-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")}
              >
                <Icon
                  className={[
                    "h-5 w-5 transition-transform duration-200",
                    active ? "scale-110 text-teal-600" : "",
                  ].join(" ")}
                  strokeWidth={1.75}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
        <li className="flex-1">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex w-full flex-col items-center gap-0.5 rounded-lg px-2 py-2 text-[11px] font-medium text-slate-500 transition-all duration-200 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
            aria-label="فتح القائمة الكاملة"
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
            القائمة
          </button>
        </li>
      </ul>
    </nav>
  );
}
