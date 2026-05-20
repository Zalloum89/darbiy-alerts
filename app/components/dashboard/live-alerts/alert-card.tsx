"use client";

import { ArrowRight, Radio } from "lucide-react";
import {
  buildAlertSummary,
  formatAirportLabel,
} from "@/app/lib/alert-text";
import { formatRelativeTimeAr } from "@/app/lib/format-relative-time-ar";
import { getFlightStatusLabelAr } from "@/app/lib/flight-status";
import type { FlightAlert } from "@/app/components/dashboard/alert-types";
import type { AlertSeverity } from "@/app/components/dashboard/mock-data";
import { TranslatedText } from "@/app/components/dashboard/translated-text";
import { AirlineLogo } from "./airline-logo";
import { alertCardMotion, getStatusStyle, severityUi } from "./alert-ui";

type AlertCardProps = {
  alert: FlightAlert;
  relativeNow: number;
  translating: boolean;
  t: (text: string) => string | undefined;
};

function IataBadge({ code }: { code?: string | null }) {
  if (!code?.trim()) return null;
  return (
    <span
      className="inline-flex min-w-[2.75rem] items-center justify-center rounded-md bg-slate-900 px-2 py-1 font-mono text-xs font-bold tracking-wider text-white shadow-sm"
      dir="ltr"
      lang="en"
    >
      {code.trim().toUpperCase()}
    </span>
  );
}

function FlightNumberBadge({ code }: { code: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-teal-600 px-2.5 py-1 font-mono text-xs font-semibold text-white shadow-sm ring-2 ring-teal-600/20"
      dir="ltr"
      lang="en"
    >
      <span className="opacity-80" aria-hidden>
        ✈
      </span>
      {code}
    </span>
  );
}

function isLatinText(value: string) {
  return /[a-z]/i.test(value);
}

function isActiveFlight(status?: string) {
  return status?.trim().toLowerCase() === "active";
}

export function AlertCard({
  alert,
  relativeNow,
  translating,
  t,
}: AlertCardProps) {
  const status = alert.flight_status;
  const isActive = isActiveFlight(status);
  const airlineName = alert.airline_name ?? alert.airline?.name ?? "شركة طيران غير معروفة";
  const airlineIata = alert.airline?.iata;

  const departureName =
    alert.departure?.airport ||
    alert.departure_label?.replace(/\s*\([A-Z]{3}\)\s*$/, "") ||
    "";
  const arrivalName =
    alert.arrival?.airport ||
    alert.arrival_label?.replace(/\s*\([A-Z]{3}\)\s*$/, "") ||
    "";

  const departureLabel =
    alert.departure_label ||
    formatAirportLabel(alert.departure?.airport, alert.departure?.iata);
  const arrivalLabel =
    alert.arrival_label ||
    formatAirportLabel(alert.arrival?.airport, alert.arrival?.iata);

  const flightCode =
    alert.flight_number ??
    alert.flight?.iata ??
    (alert.flight?.number
      ? `${alert.airline?.iata ?? ""}${alert.flight.number}`
      : null);

  const summary = alert.summary_ar?.trim() || buildAlertSummary(alert);
  const summaryIsArabic = Boolean(alert.summary_ar?.trim());
  const statusArabic =
    alert.status_ar ??
    (status ? t(status) : undefined) ??
    getFlightStatusLabelAr(status);

  const severity = alert.severity as AlertSeverity | undefined;
  const severityTheme = severity ? severityUi[severity] : null;

  const relativeUpdated = formatRelativeTimeAr(alert.updated_at, relativeNow);
  const departureMeta = [alert.departure?.city_ar, alert.departure?.country_ar]
    .filter(Boolean)
    .join(" · ");
  const arrivalMeta = [alert.arrival?.city_ar, alert.arrival?.country_ar]
    .filter(Boolean)
    .join(" · ");

  const stripClass = severityTheme?.strip ?? "border-s-slate-200 bg-white";

  return (
    <article
      className={[
        "relative overflow-hidden rounded-2xl border border-slate-200/90 border-s-4 shadow-sm",
        stripClass,
        alertCardMotion,
        isActive ? "animate-live-card-pulse ring-1 ring-emerald-300/40" : "",
      ].join(" ")}
    >
      <div className="p-3.5 sm:p-5">
        <div className="flex items-start gap-2.5 sm:gap-3">
          <AirlineLogo
            iata={airlineIata}
            airlineName={airlineName}
            size="md"
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {flightCode ? <FlightNumberBadge code={flightCode} /> : null}
              {isActive ? (
                <span
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-300/50"
                  aria-label="رحلة نشطة"
                >
                  <Radio className="h-3 w-3 animate-pulse-dot" strokeWidth={2} />
                  مباشرة
                </span>
              ) : null}
              {severity && severityTheme ? (
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${severityTheme.badge}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${severityTheme.dot}`}
                    aria-hidden
                  />
                  {severityTheme.label}
                </span>
              ) : null}
            </div>

            <div className="mt-2">
              {/[\u0600-\u06FF]/.test(airlineName) ? (
                <p className="text-sm font-semibold leading-snug text-slate-900 sm:text-base">
                  {airlineName}
                </p>
              ) : (
                <TranslatedText
                  original={airlineName}
                  translated={t(airlineName)}
                  loading={translating}
                  primaryClassName="text-sm font-semibold leading-snug text-slate-900 sm:text-base"
                  secondaryClassName="mt-0.5 font-mono text-[11px] text-slate-400"
                />
              )}
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
              {relativeUpdated ? (
                <span className="font-medium text-slate-600">
                  {relativeUpdated}
                </span>
              ) : null}
              {alert.flight_date ? (
                <>
                  {relativeUpdated ? (
                    <span className="text-slate-300" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <span>{alert.flight_date}</span>
                </>
              ) : null}
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1">
            <span
              className={`rounded-lg px-2 py-1 text-xs font-semibold ring-1 ${getStatusStyle(status)}`}
              dir="rtl"
              lang="ar"
            >
              {statusArabic}
            </span>
            {status && isLatinText(status) ? (
              <span
                className="text-[10px] font-medium uppercase tracking-wide text-slate-400"
                dir="ltr"
                lang="en"
              >
                {status}
              </span>
            ) : null}
          </div>
        </div>

        {/* Compact route row — mobile-first */}
        <div className="mt-3.5 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 sm:mt-4 sm:gap-3">
          <div className="rounded-xl border border-slate-200/80 bg-white/90 p-2.5 sm:p-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:text-xs">
              مغادرة
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <IataBadge code={alert.departure?.iata} />
            </div>
            <p className="mt-1.5 line-clamp-2 text-xs font-medium leading-snug text-slate-900 sm:text-sm">
              {departureName || departureLabel || "—"}
            </p>
            {departureMeta ? (
              <p className="mt-1 line-clamp-1 text-[10px] text-slate-500 sm:text-[11px]">
                {departureMeta}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col items-center justify-center gap-0.5 self-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 ring-1 ring-slate-200/80 sm:h-9 sm:w-9">
              <ArrowRight
                className="h-4 w-4 rtl:rotate-180"
                strokeWidth={1.75}
                aria-hidden
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200/80 bg-white/90 p-2.5 sm:p-3.5">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:text-xs">
              وصول
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <IataBadge code={alert.arrival?.iata} />
            </div>
            <p className="mt-1.5 line-clamp-2 text-xs font-medium leading-snug text-slate-900 sm:text-sm">
              {arrivalName || arrivalLabel || "—"}
            </p>
            {arrivalMeta ? (
              <p className="mt-1 line-clamp-1 text-[10px] text-slate-500 sm:text-[11px]">
                {arrivalMeta}
              </p>
            ) : null}
          </div>
        </div>

        {summary ? (
          <div className="mt-3 rounded-xl border border-teal-100/90 bg-teal-50/50 px-3 py-2.5 sm:mt-4 sm:px-3.5 sm:py-3">
            <p className="text-[10px] font-semibold text-teal-800 sm:text-xs">
              ملخص استخباراتي
            </p>
            {summaryIsArabic ? (
              <p className="mt-1 text-xs leading-relaxed text-slate-800 sm:text-sm">
                {summary}
              </p>
            ) : (
              <TranslatedText
                original={summary}
                translated={t(summary)}
                loading={translating}
                className="mt-1"
                primaryClassName="text-xs leading-relaxed text-slate-800 sm:text-sm"
                secondaryClassName="mt-1 text-[11px] leading-relaxed text-slate-400"
              />
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function getAlertCardKey(alert: FlightAlert, index: number) {
  const code =
    alert.flight_number ?? alert.flight?.iata ?? alert.flight?.number;
  const airline = alert.airline?.name ?? "";
  const dep = alert.departure?.iata ?? alert.departure?.airport ?? "";
  const arr = alert.arrival?.iata ?? alert.arrival?.airport ?? "";
  return `${code ?? airline}-${dep}-${arr}-${index}`;
}
