"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, Languages, Loader2, Radar } from "lucide-react";
import { filterAlertsByAirline } from "@/app/lib/match-airline-alert";
import { filterAlertsByAirport } from "@/app/lib/match-airport-alert";
import { parseAlertsResponse } from "@/app/lib/parse-alerts";
import type { FlightAlert } from "./alert-types";
import { filterAlerts } from "./filter-alerts";
import { useAlertTranslations } from "./use-alert-translations";
import { AlertCard, getAlertCardKey } from "./live-alerts/alert-card";
import { AlertsEmptyState } from "./live-alerts/empty-state";
import { AlertsLoadingSkeleton } from "./live-alerts/loading-skeleton";

const MAX_ALERTS = 10;
const REFRESH_INTERVAL_MS = 30_000;
const RELATIVE_TIME_TICK_MS = 30_000;

function formatLastUpdated(date: Date) {
  return new Intl.DateTimeFormat("ar-SA", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

type LiveAlertsProps = {
  searchQuery?: string;
  airportSearchTerms?: string[];
  airlineSearchTerms?: string[];
  title?: string;
  subtitle?: string;
  emptyMessage?: string;
};

export function LiveAlerts({
  searchQuery = "",
  airportSearchTerms,
  airlineSearchTerms,
  title = "مركز استخبارات السفر المباشر",
  subtitle,
  emptyMessage,
}: LiveAlertsProps) {
  const [alerts, setAlerts] = useState<FlightAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [relativeNow, setRelativeNow] = useState(() => Date.now());

  const refreshControllerRef = useRef<AbortController | null>(null);

  const { translations, translating, t } = useAlertTranslations(alerts);

  const filteredAlerts = filterAlerts(alerts, searchQuery, translations);
  const isSearching = searchQuery.trim().length > 0;
  const isLive = lastUpdated !== null && !error;

  useEffect(() => {
    const id = window.setInterval(() => {
      setRelativeNow(Date.now());
    }, RELATIVE_TIME_TICK_MS);
    return () => window.clearInterval(id);
  }, []);

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

        const json: unknown = await response.json();
        let flights = parseAlertsResponse(json).slice(0, MAX_ALERTS);

        if (airportSearchTerms?.length) {
          flights = filterAlertsByAirport(flights, airportSearchTerms);
        }

        if (airlineSearchTerms?.length) {
          flights = filterAlertsByAirline(flights, airlineSearchTerms);
        }

        setAlerts(flights);
        setLastUpdated(new Date());
        setRelativeNow(Date.now());
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
    [airportSearchTerms, airlineSearchTerms],
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
      aria-label="مركز استخبارات السفر المباشر"
      className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.03]"
    >
      <div className="border-b border-slate-100 bg-gradient-to-l from-teal-50/50 via-white to-white px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/20">
              <Radar className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
                  {title}
                </h2>
                {isLive ? (
                  <span
                    className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-400/30"
                    title="تحديث تلقائي كل ٣٠ ثانية"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    مباشر
                  </span>
                ) : null}
                {translating ? (
                  <span
                    className="flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-medium text-teal-700 ring-1 ring-teal-200"
                    title="ترجمة ذكية"
                  >
                    <Languages className="h-3 w-3" aria-hidden />
                    ترجمة
                  </span>
                ) : null}
                {refreshing ? (
                  <Loader2
                    className="h-3.5 w-3.5 animate-spin text-teal-600"
                    aria-label="جاري التحديث"
                  />
                ) : null}
              </div>
              <p className="mt-1.5 max-w-xl text-xs leading-relaxed text-slate-600 sm:text-sm">
                {subtitle ??
                  "رصد لحظي للرحلات · شعارات الشركات · أولوية ملونة · تحديث نسبي"}
                {!loading && !error && alerts.length > 0
                  ? isSearching
                    ? ` · ${filteredAlerts.length} من ${alerts.length}`
                    : ` · ${alerts.length} رحلة`
                  : ""}
                {lastUpdated ? (
                  <span className="text-slate-400">
                    {" "}
                    · آخر مزامنة {formatLastUpdated(lastUpdated)}
                  </span>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-3 py-4 sm:px-5 sm:py-6">
        {loading ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Loader2
                className="h-4 w-4 animate-spin text-teal-600"
                aria-hidden
              />
              <span>جاري تحميل مركز التنبيهات...</span>
            </div>
            <AlertsLoadingSkeleton />
          </div>
        ) : null}

        {!loading && error ? (
          <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
            <AlertCircle
              className="mt-0.5 h-5 w-5 shrink-0 text-rose-600"
              aria-hidden
            />
            <div>
              <p className="font-semibold">تعذّر تحميل التنبيهات</p>
              <p className="mt-1 text-rose-700/90">{error}</p>
            </div>
          </div>
        ) : null}

        {!loading && !error && alerts.length === 0 ? (
          <AlertsEmptyState variant="empty" message={emptyMessage} />
        ) : null}

        {!loading &&
        !error &&
        alerts.length > 0 &&
        isSearching &&
        filteredAlerts.length === 0 ? (
          <AlertsEmptyState variant="search" />
        ) : null}

        {!loading && !error && filteredAlerts.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {filteredAlerts.map((alert, index) => (
              <AlertCard
                key={getAlertCardKey(alert, index)}
                alert={alert}
                relativeNow={relativeNow}
                translating={translating}
                t={t}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
