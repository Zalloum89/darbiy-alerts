import type { FlightAlert } from "@/app/components/dashboard/alert-types";
import {
  fetchLiveAlertsFromUpstream,
  toLiveAlertPayloads,
  type LiveAlertPayload,
} from "@/app/lib/fetch-live-alerts";

/** AviationStack is fetched at most once per this interval. */
export const UPSTREAM_CACHE_TTL_MS = 30 * 60 * 1000;

export type AlertsDataSource = "upstream" | "cache" | "stale-cache" | "fallback";

export type AlertsApiMeta = {
  /** ISO timestamp of the last successful AviationStack fetch */
  last_real_update_at: string | null;
  /** ISO timestamp when this response was built */
  served_at: string;
  source: AlertsDataSource;
  /** ISO timestamp when upstream may be fetched again (null for fallback) */
  next_upstream_refresh_at: string | null;
};

export type AlertsApiResponse = {
  data: LiveAlertPayload[];
  meta: AlertsApiMeta;
};

const FALLBACK_RAW: FlightAlert[] = [
  {
    airline: { name: "Emirates", iata: "EK" },
    departure: { iata: "DXB" },
    arrival: { iata: "LHR" },
    flight: { iata: "EK001" },
    flight_status: "delayed",
  },
  {
    airline: { name: "Qatar Airways", iata: "QR" },
    departure: { iata: "DOH" },
    arrival: { iata: "CDG" },
    flight: { number: "815" },
    flight_status: "active",
  },
  {
    airline: { name: "Saudia", iata: "SV" },
    departure: { iata: "JED" },
    arrival: { iata: "CAI" },
    flight: { iata: "SV302" },
    flight_status: "cancelled",
  },
  {
    airline: { name: "Turkish Airlines", iata: "TK" },
    departure: { iata: "IST" },
    arrival: { iata: "DXB" },
    flight: { number: "760" },
    flight_status: "delayed",
  },
  {
    airline: { name: "Lufthansa", iata: "LH" },
    departure: { iata: "FRA" },
    arrival: { iata: "RUH" },
    flight: { iata: "LH920" },
    flight_status: "scheduled",
  },
];

const FALLBACK_ALERTS = toLiveAlertPayloads(FALLBACK_RAW);

let cachedAlerts: LiveAlertPayload[] | null = null;
/** When AviationStack was last fetched successfully */
let lastRealUpdateAt: number | null = null;
/** In-flight upstream fetch — prevents duplicate external API calls */
let upstreamInFlight: Promise<LiveAlertPayload[]> | null = null;

function isUpstreamCacheValid(): boolean {
  if (cachedAlerts === null || lastRealUpdateAt === null) {
    return false;
  }
  return Date.now() - lastRealUpdateAt < UPSTREAM_CACHE_TTL_MS;
}

function buildMeta(
  source: AlertsDataSource,
  servedAt: number = Date.now(),
): AlertsApiMeta {
  const nextRefresh =
    lastRealUpdateAt !== null && source !== "fallback"
      ? new Date(lastRealUpdateAt + UPSTREAM_CACHE_TTL_MS).toISOString()
      : null;

  return {
    last_real_update_at:
      lastRealUpdateAt !== null
        ? new Date(lastRealUpdateAt).toISOString()
        : null,
    served_at: new Date(servedAt).toISOString(),
    source,
    next_upstream_refresh_at: nextRefresh,
  };
}

function buildResponse(
  data: LiveAlertPayload[],
  source: AlertsDataSource,
): AlertsApiResponse {
  return { data, meta: buildMeta(source) };
}

async function fetchUpstreamOnce(): Promise<LiveAlertPayload[]> {
  if (upstreamInFlight) {
    return upstreamInFlight;
  }

  upstreamInFlight = (async () => {
    try {
      const fresh = await fetchLiveAlertsFromUpstream();
      cachedAlerts = fresh;
      lastRealUpdateAt = Date.now();
      console.log("AviationStack upstream fetch completed");
      return fresh;
    } finally {
      upstreamInFlight = null;
    }
  })();

  return upstreamInFlight;
}

/**
 * Returns cached flight alerts. Refreshes AviationStack only when the 30-minute
 * TTL expires; concurrent callers share one in-flight upstream request.
 */
export async function getCachedAlertsResponse(): Promise<AlertsApiResponse> {
  if (isUpstreamCacheValid() && cachedAlerts !== null) {
    console.log("Serving alerts from server cache");
    return buildResponse(cachedAlerts, "cache");
  }

  console.log("Upstream cache expired or empty — refreshing from AviationStack");

  try {
    const fresh = await fetchUpstreamOnce();
    return buildResponse(fresh, "upstream");
  } catch (error) {
    console.error("Alerts upstream error:", error);

    if (cachedAlerts !== null) {
      console.log("Serving alerts from stale server cache");
      return buildResponse(cachedAlerts, "stale-cache");
    }

    console.log("Serving fallback alerts");
    return buildResponse(FALLBACK_ALERTS, "fallback");
  }
}
