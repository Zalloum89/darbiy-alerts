"use client";

import { useState } from "react";
import { Plane } from "lucide-react";
import {
  getAirlineLogoUrl,
  getAirlineMonogram,
} from "@/app/lib/airline-logo";

type AirlineLogoProps = {
  iata?: string | null;
  airlineName?: string;
  size?: "sm" | "md";
  className?: string;
};

const sizeClasses = {
  sm: "h-9 w-9 text-[10px]",
  md: "h-11 w-11 text-xs",
};

export function AirlineLogo({
  iata,
  airlineName,
  size = "md",
  className = "",
}: AirlineLogoProps) {
  const [failed, setFailed] = useState(false);
  const code = iata?.trim().toUpperCase() ?? "";
  const logoUrl = !failed ? getAirlineLogoUrl(code) : null;
  const box = sizeClasses[size];

  if (logoUrl) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200/90 ${box} ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={airlineName ? `شعار ${airlineName}` : `شعار ${code}`}
          width={44}
          height={44}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-1.5"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 font-bold tracking-tight text-slate-600 ring-1 ring-slate-200/90 ${box} ${className}`}
      aria-hidden={!airlineName}
      title={airlineName}
    >
      {code ? (
        <span dir="ltr" lang="en">
          {getAirlineMonogram(code)}
        </span>
      ) : (
        <Plane className="h-4 w-4 text-teal-600" strokeWidth={1.75} />
      )}
    </div>
  );
}
