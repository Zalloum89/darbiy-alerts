"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Languages,
  Loader2,
  Plane,
} from "lucide-react";
import {
  buildAlertSummary,
  formatAirportLabel,
} from "@/app/lib/alert-text";
import type { AlertsApiResponse, FlightAlert } from "./alert-types";
import { filterAlerts } from "./filter-alerts";
import { TranslatedText } from "./translated-text";
import { useAlertTranslations } from "./use-alert-translations";

const MAX_ALERTS = 10;
const REFRESH_INTERVAL_MS = 30_000;

const statusLabels: Record<string, string> = {
  scheduled: "مجدولة",
  active: "نشطة",
  landed: "هبطت",
  cancelled: "ملغاة",
  incident: "حادث",
  diverted: "محوّلة",
};

const statusStyles: Record<string, string> = {
  scheduled: "bg-sky-50 text-sky-800 ring-sky-200",
  active: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  landed: "bg-slate-100 text-slate-700 ring-slate-200",
  cancelled: "bg-rose-50 text-rose-800 ring-rose-200",
  incident: "bg-rose-50 text-rose-800 ring-rose-200",
  diverted: "bg-amber-50 text-amber-800 ring-amber-200",
};

function getStatusFallback(status?: string) {
  if (!status) return "غير معروف";
  return statusLabels[status.toLowerCase()] ?? status;
}

function getStatusStyle(status?: string) {
  if (!status) return "bg-slate-100 text-slate-700 ring-slate-200";
  return statusStyles[status.toLowerCase()] ?? statusStyles.scheduled;
}

function getFlightKey(flight: FlightAlert, index: number) {
  const code = flight.flight?.iata ?? flight.flight?.number;
  return `${code ?? "flight"}-${flight.flight_date ?? index}-${index}`;
}

function formatLastUpdated(date: Date) {
  return new Intl.DateTimeFormat("ar-SA", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="جاري تحميل التنبيهات">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-5"
        >
          <div className="h-4 w-1/4 rounded bg-slate-100" />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="h-14 rounded-lg bg-slate-50" />
            <div className="h-14 rounded-lg bg-slate-50" />
          </div>
        </div>
      ))}
    </div>
  );
}

type LiveAlertsProps = {
  searchQuery: string;
};

export function LiveAlerts({ searchQuery = "" }: LiveAlertsProps) {
  const [alerts, setAlerts] = useState<FlightAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refreshControllerRef = useRef<AbortController | null>(null);

  const { translations, translating, t } = useAlertTranslations(alerts);

  const filteredAlerts = filterAlerts(alerts, searchQuery, translations);
  const isSearching = searchQuery.trim().length > 0;
  const isLive = lastUpdated !== null && !error;

  const fetchAlerts = useCallback(
    async (signal: AbortSignal, initial: boolean) => {
      if (initial) {
        setLoading(true);
        setError(null);
      } else {
        setRefreshing(true);
      }

      try {
        const response = await fetch("/api/alerts", { signal });

        if (!response.ok) {
          throw new Error(`فشل تحميل التنبيهات (${response.status})`);
        }

        const json: AlertsApiResponse = await response.json();

        if (json.error?.message) {
          throw new Error(json.error.message);
        }

        const flights = Array.isArray(json.data)
          ? json.data.slice(0, MAX_ALERTS)
          : [];

        setAlerts(flights);
        setLastUpdated(new Date());
        if (!initial) setError(null);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;

        if (initial) {
          setError(
            err instanceof Error ? err.message : "حدث خطأ أثناء تحميل التنبيهات",
          );
          setAlerts([]);
          setLastUpdated(null);
        }
      } finally {
        if (initial) setLoading(false);
        else setRefreshing(false);
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();

    void fetchAlerts(controller.signal, true);

    const intervalId = window.setInterval(() => {
      refreshControllerRef.current?.abort();
      refreshControllerRef.current = new AbortController();
      void fetchAlerts(refreshControllerRef.current.signal, false);
    }, REFRESH_INTERVAL_MS);

    return () => {
      controller.abort();
      refreshControllerRef.current?.abort();
      window.clearInterval(intervalId);
    };
  }, [fetchAlerts]);

  return (
    <section
      id="alerts"
      aria-label="التنبيهات المباشرة"
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              التنبيهات المباشرة
            </h2>
            {isLive ? (
              <span
                className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
                title="تحديث تلقائي كل ٣٠ ثانية"
              >
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
                مباشر
              </span>
            ) : null}
            {translating ? (
              <span
                className="flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-medium text-teal-700 ring-1 ring-teal-200"
                title="ترجمة ذكية عبر DeepSeek"
              >
                <Languages className="h-3 w-3" aria-hidden />
                جاري الترجمة
              </span>
            ) : null}
            {refreshing ? (
              <Loader2
                className="h-3.5 w-3.5 animate-spin text-teal-600"
                aria-label="جاري التحديث"
              />
            ) : null}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
            رحلات مباشرة من مصدر الطيران · ترجمة احترافية بالعربية
            {!loading && !error && alerts.length > 0
              ? isSearching
                ? ` · ${filteredAlerts.length} من ${alerts.length} رحلة`
                : ` · عرض ${alerts.length} من أحدث الرحلات`
              : ""}
            {lastUpdated ? (
              <span className="text-slate-400">
                {" "}
                · آخر تحديث: {formatLastUpdated(lastUpdated)}
              </span>
            ) : null}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
            جاري تحميل التنبيهات...
          </div>
          <LoadingSkeleton />
        </div>
      ) : null}

      {!loading && error ? (
        <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
          <div>
            <p className="font-medium">تعذّر تحميل التنبيهات</p>
            <p className="mt-1 text-rose-700/90">{error}</p>
          </div>
        </div>
      ) : null}

      {!loading && !error && alerts.length === 0 ? (
        <div className="py-12 text-center">
          <Plane className="mx-auto h-8 w-8 text-slate-300" strokeWidth={1.5} />
          <p className="mt-3 text-sm text-slate-500">لا توجد تنبيهات متاحة حالياً</p>
        </div>
      ) : null}

      {!loading && !error && alerts.length > 0 && isSearching && filteredAlerts.length === 0 ? (
        <div className="py-12 text-center">
          <Plane className="mx-auto h-8 w-8 text-slate-300" strokeWidth={1.5} />
          <p className="mt-3 text-sm font-medium text-slate-700">لا توجد نتائج</p>
          <p className="mt-1 text-sm text-slate-500">
            جرّب البحث باسم مطار أو شركة طيران أو حالة الرحلة
          </p>
        </div>
      ) : null}

      {!loading && !error && filteredAlerts.length > 0 ? (
        <div className="space-y-4">
          {filteredAlerts.map((alert, index) => {
            const status = alert.flight_status;
            const airlineName = alert.airline?.name ?? "Unknown airline";
            const departureLabel = formatAirportLabel(
              alert.departure?.airport,
              alert.departure?.iata,
            );
            const arrivalLabel = formatAirportLabel(
              alert.arrival?.airport,
              alert.arrival?.iata,
            );
            const flightCode =
              alert.flight?.iata ??
              (alert.flight?.number
                ? `${alert.airline?.iata ?? ""}${alert.flight.number}`
                : null);
            const summary = buildAlertSummary(alert);
            const statusArabic =
              (status ? t(status) : undefined) ?? getStatusFallback(status);

            return (
              <article
                key={getFlightKey(alert, index)}
                className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-teal-700 ring-1 ring-slate-200">
                      <Plane className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <TranslatedText
                        original={airlineName}
                        translated={t(airlineName)}
                        loading={translating}
                        primaryClassName="font-medium text-slate-900"
                        secondaryClassName="mt-0.5 font-mono text-[11px] text-slate-400"
                      />
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        {flightCode ? (
                          <span className="rounded-md bg-white px-2 py-0.5 font-mono text-xs text-slate-600 ring-1 ring-slate-200">
                            {flightCode}
                          </span>
                        ) : null}
                        {alert.flight_date ? (
                          <span className="text-xs text-slate-500">
                            {alert.flight_date}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-0.5">
                    <span
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ${getStatusStyle(status)}`}
                      dir="rtl"
                      lang="ar"
                    >
                      {statusArabic}
                    </span>
                    {status && t(status) ? (
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

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
                  <div className="rounded-lg border border-slate-200 bg-white p-3.5">
                    <p className="text-xs font-medium text-slate-500">مطار المغادرة</p>
                    <TranslatedText
                      original={departureLabel || undefined}
                      translated={
                        departureLabel ? t(departureLabel) : undefined
                      }
                      loading={translating}
                      className="mt-1"
                      primaryClassName="text-sm font-medium leading-snug text-slate-900"
                      secondaryClassName="mt-0.5 text-[11px] leading-relaxed text-slate-400"
                    />
                  </div>

                  <div className="hidden items-center justify-center sm:flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-400 ring-1 ring-slate-200">
                      <ArrowRight className="h-4 w-4 rtl:rotate-180" strokeWidth={1.75} />
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white p-3.5">
                    <p className="text-xs font-medium text-slate-500">مطار الوصول</p>
                    <TranslatedText
                      original={arrivalLabel || undefined}
                      translated={arrivalLabel ? t(arrivalLabel) : undefined}
                      loading={translating}
                      className="mt-1"
                      primaryClassName="text-sm font-medium leading-snug text-slate-900"
                      secondaryClassName="mt-0.5 text-[11px] leading-relaxed text-slate-400"
                    />
                  </div>
                </div>

                {summary ? (
                  <div className="mt-4 rounded-lg border border-teal-100 bg-teal-50/40 px-3.5 py-3">
                    <p className="text-xs font-medium text-teal-800">ملخص التنبيه</p>
                    <TranslatedText
                      original={summary}
                      translated={t(summary)}
                      loading={translating}
                      className="mt-1.5"
                      primaryClassName="text-sm leading-relaxed text-slate-800"
                      secondaryClassName="mt-1 text-[11px] leading-relaxed text-slate-400"
                    />
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
