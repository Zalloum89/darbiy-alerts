"use client";

import { Menu } from "lucide-react";

type DashboardHeaderProps = {
  onMenuClick: () => void;
};

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
          aria-label="فتح القائمة"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <div>
          <p className="text-xs font-medium tracking-wide text-teal-700">
            منصة ذكاء السفر
          </p>
          <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            لوحة المراقبة
          </h1>
        </div>
      </div>
    </header>
  );
}
