"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  LayoutDashboard,
  MapPin,
  Plane,
  Sparkles,
  X,
} from "lucide-react";
import { getFeaturedAirports } from "@/app/lib/airports-data";
import { navIconClass, navLinkClass } from "./nav-link-styles";

const mainNav = [
  { id: "dashboard", label: "نظرة عامة", href: "/", icon: LayoutDashboard },
  { id: "alerts", label: "التنبيهات المباشرة", href: "/#alerts", icon: Bell },
  { id: "airports-hub", label: "قسم المطارات", href: "/#airports", icon: MapPin },
  { id: "airlines", label: "شركات الطيران", href: "/#airlines", icon: Plane },
] as const;

const quickLinks = [
  { label: "دبي DXB", href: "/airport/dubai" },
  { label: "الدوحة DOH", href: "/airport/doha" },
  { label: "إسطنبول IST", href: "/airport/istanbul" },
  { label: "لندن LHR", href: "/airport/london" },
] as const;

type AppSidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function AppSidebar({ open, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const airports = getFeaturedAirports();
  const onAirportPage = pathname.startsWith("/airport/");

  return (
    <>
      <button
        type="button"
        className={[
          "fixed inset-0 z-40 bg-slate-900/25 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onClose}
        aria-label="إغلاق القائمة"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
      />

      <aside
        className={[
          "fixed inset-y-0 start-0 z-50 flex w-[min(100vw-3rem,18rem)] flex-col border-e border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-out lg:static lg:w-64 lg:translate-x-0 lg:shadow-none",
          open ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        ].join(" ")}
        aria-label="القائمة الجانبية"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-6">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity duration-200 hover:opacity-90"
            onClick={onClose}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              د
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight text-slate-900">
                دربي
              </p>
              <p className="text-xs text-slate-500">ذكاء السفر</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 active:scale-95 lg:hidden"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          <div>
            <p className="mb-2 px-3 text-xs font-semibold tracking-wide text-slate-400">
              التنقل الرئيسي
            </p>
            <div className="space-y-0.5">
              {mainNav.map((item) => {
                const Icon = item.icon;
                const active =
                  item.id === "dashboard"
                    ? pathname === "/"
                    : item.id === "airports-hub"
                      ? onAirportPage
                      : false;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onClose}
                    prefetch={item.href.startsWith("/airport")}
                    className={`group ${navLinkClass(active)}`}
                  >
                    <Icon className={navIconClass(active)} strokeWidth={1.75} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1.5 px-3 text-xs font-semibold tracking-wide text-slate-400">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              روابط سريعة
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {quickLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    prefetch
                    className={[
                      "rounded-lg px-2.5 py-2 text-xs font-medium transition-all duration-200",
                      active
                        ? "bg-teal-50 text-teal-800 ring-1 ring-teal-100"
                        : "bg-slate-50 text-slate-600 hover:bg-teal-50/60 hover:text-teal-800 hover:shadow-sm active:scale-[0.98]",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 px-3 text-xs font-semibold tracking-wide text-slate-400">
              جميع المطارات
            </p>
            <div className="space-y-0.5">
              {airports.map((airport) => {
                const href = `/airport/${airport.slug}`;
                const active = pathname === href;
                return (
                  <Link
                    key={airport.slug}
                    href={href}
                    onClick={onClose}
                    prefetch
                    className={`group ${navLinkClass(active)}`}
                  >
                    <MapPin className={navIconClass(active)} strokeWidth={1.75} />
                    <span className="min-w-0 truncate">{airport.nameAr}</span>
                    <span className="ms-auto shrink-0 font-mono text-[10px] text-slate-400">
                      {airport.code}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <div className="border-t border-slate-100 px-5 py-4">
          <Link
            href="/#airports"
            onClick={onClose}
            className="text-xs font-medium text-teal-700 transition-colors duration-200 hover:text-teal-800"
          >
            عرض كل المطارات على اللوحة ←
          </Link>
          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            بيانات تشغيلية محدّثة من مصادر الطيران العالمية.
          </p>
        </div>
      </aside>
    </>
  );
}
