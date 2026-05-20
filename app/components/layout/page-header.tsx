"use client";

import { Menu } from "lucide-react";
import { Breadcrumbs, type BreadcrumbItem } from "./breadcrumbs";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
  breadcrumbs?: BreadcrumbItem[];
};

export function PageHeader({
  eyebrow = "داربي · ذكاء السفر",
  title,
  subtitle,
  onMenuClick,
  breadcrumbs,
}: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 active:scale-95 lg:hidden"
          aria-label="فتح القائمة"
        >
          <Menu className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <div className="min-w-0 flex-1">
          {breadcrumbs && breadcrumbs.length > 0 ? (
            <Breadcrumbs items={breadcrumbs} className="mb-2" />
          ) : null}
          <p className="text-xs font-medium tracking-wide text-teal-700">
            {eyebrow}
          </p>
          <h1 className="mt-0.5 truncate text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
