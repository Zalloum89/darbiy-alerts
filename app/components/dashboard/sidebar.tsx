"use client";

import {
  Bell,
  LayoutDashboard,
  MapPin,
  Plane,
  X,
} from "lucide-react";
import { navItems } from "./mock-data";

const iconMap = {
  dashboard: LayoutDashboard,
  alerts: Bell,
  airports: MapPin,
  airlines: Plane,
} as const;

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
          aria-label="إغلاق القائمة"
        />
      ) : null}

      <aside
        className={[
          "fixed inset-y-0 start-0 z-50 flex w-64 flex-col border-e border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0",
          open ? "translate-x-0" : "translate-x-full lg:translate-x-0",
        ].join(" ")}
        aria-label="القائمة الجانبية"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-sm font-bold text-white">
              د
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight text-slate-900">
                دربي
              </p>
              <p className="text-xs text-slate-500">ذكاء السفر</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
          {navItems.map((item, index) => {
            const Icon = iconMap[item.id as keyof typeof iconMap] ?? LayoutDashboard;
            const active = index === 0;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={[
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-teal-50 text-teal-800"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                ].join(" ")}
              >
                <Icon
                  className={[
                    "h-[18px] w-[18px] shrink-0",
                    active ? "text-teal-700" : "text-slate-400",
                  ].join(" ")}
                  strokeWidth={1.75}
                />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 px-5 py-4">
          <p className="text-xs leading-relaxed text-slate-500">
            بيانات تشغيلية محدّثة من مصادر الطيران العالمية.
          </p>
        </div>
      </aside>
    </>
  );
}
