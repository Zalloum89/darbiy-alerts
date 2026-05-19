"use client";

import { Search, X } from "lucide-react";

type AlertsSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function AlertsSearchBar({ value, onChange }: AlertsSearchBarProps) {
  return (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute start-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
        strokeWidth={1.75}
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ابحث عن مطار أو شركة طيران..."
        dir="rtl"
        lang="ar"
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pe-10 ps-11 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        aria-label="بحث في التنبيهات"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute end-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="مسح البحث"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>
      ) : null}
    </div>
  );
}
