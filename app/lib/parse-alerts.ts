import type { FlightAlert } from "@/app/components/dashboard/alert-types";

/** English AviationStack statuses; flat `status` may carry Arabic from the API. */
const FLIGHT_STATUS_IS_ARABIC = /[\u0600-\u06FF]/;

/** Shape returned by GET /api/alerts */
export type ApiAlert = {
  airline?: string;
  departure?: string;
  arrival?: string;
  status?: string;
};

function normalizeNested(raw: Record<string, unknown>): FlightAlert {
  return {
    flight_date:
      typeof raw.flight_date === "string" ? raw.flight_date : undefined,
    flight_status:
      typeof raw.flight_status === "string"
        ? raw.flight_status
        : typeof raw.status === "string"
          ? raw.status
          : undefined,
    departure:
      raw.departure && typeof raw.departure === "object"
        ? (raw.departure as FlightAlert["departure"])
        : typeof raw.departure === "string"
          ? { airport: raw.departure }
          : null,
    arrival:
      raw.arrival && typeof raw.arrival === "object"
        ? (raw.arrival as FlightAlert["arrival"])
        : typeof raw.arrival === "string"
          ? { airport: raw.arrival }
          : null,
    airline:
      raw.airline && typeof raw.airline === "object"
        ? (raw.airline as FlightAlert["airline"])
        : typeof raw.airline === "string"
          ? { name: raw.airline }
          : null,
    flight:
      raw.flight && typeof raw.flight === "object"
        ? (raw.flight as FlightAlert["flight"])
        : undefined,
  };
}

/** Converts a single API item (flat or nested) into the dashboard model. */
export function normalizeAlert(item: unknown): FlightAlert | null {
  if (!item || typeof item !== "object") return null;

  const raw = item as Record<string, unknown>;
  const airlineIsString = typeof raw.airline === "string";
  const departureIsString = typeof raw.departure === "string";
  const arrivalIsString = typeof raw.arrival === "string";

  if (airlineIsString || departureIsString || arrivalIsString) {
    return {
      airline: airlineIsString ? { name: raw.airline as string } : null,
      departure: departureIsString
        ? { airport: raw.departure as string }
        : null,
      arrival: arrivalIsString ? { airport: raw.arrival as string } : null,
      status_ar:
        typeof raw.status_ar === "string"
          ? raw.status_ar
          : typeof raw.status === "string" &&
              FLIGHT_STATUS_IS_ARABIC.test(raw.status)
            ? raw.status
            : undefined,
      airline_name:
        typeof raw.airline_name === "string" ? raw.airline_name : undefined,
      departure_label:
        typeof raw.departure_label === "string"
          ? raw.departure_label
          : undefined,
      arrival_label:
        typeof raw.arrival_label === "string" ? raw.arrival_label : undefined,
      flight_number:
        typeof raw.flight_number === "string" ? raw.flight_number : undefined,
      updated_at:
        typeof raw.updated_at === "string" ? raw.updated_at : undefined,
      severity:
        raw.severity === "low" ||
        raw.severity === "medium" ||
        raw.severity === "high"
          ? raw.severity
          : undefined,
      summary_ar:
        typeof raw.summary_ar === "string" ? raw.summary_ar : undefined,
      flight_status:
        typeof raw.flight_status === "string"
          ? raw.flight_status
          : typeof raw.status === "string" &&
              !FLIGHT_STATUS_IS_ARABIC.test(raw.status)
            ? raw.status
            : undefined,
      flight_date:
        typeof raw.flight_date === "string" ? raw.flight_date : undefined,
      flight:
        raw.flight && typeof raw.flight === "object"
          ? (raw.flight as FlightAlert["flight"])
          : undefined,
    };
  }

  if (
    raw.flight_status ||
    raw.status ||
    raw.airline ||
    raw.departure ||
    raw.arrival
  ) {
    const nested = normalizeNested(raw);
    return {
      ...nested,
      status_ar:
        typeof raw.status_ar === "string" ? raw.status_ar : nested.status_ar,
      airline_name:
        typeof raw.airline_name === "string"
          ? raw.airline_name
          : nested.airline_name,
      departure_label:
        typeof raw.departure_label === "string"
          ? raw.departure_label
          : nested.departure_label,
      arrival_label:
        typeof raw.arrival_label === "string"
          ? raw.arrival_label
          : nested.arrival_label,
      flight_number:
        typeof raw.flight_number === "string"
          ? raw.flight_number
          : nested.flight_number,
      updated_at:
        typeof raw.updated_at === "string" ? raw.updated_at : nested.updated_at,
      severity:
        raw.severity === "low" ||
        raw.severity === "medium" ||
        raw.severity === "high"
          ? raw.severity
          : nested.severity,
      summary_ar:
        typeof raw.summary_ar === "string" ? raw.summary_ar : nested.summary_ar,
    };
  }

  return null;
}

export type AlertsApiMeta = {
  last_real_update_at?: string | null;
  served_at?: string;
  source?: "upstream" | "cache" | "stale-cache" | "fallback";
  next_upstream_refresh_at?: string | null;
};

export type ParsedAlertsResult = {
  alerts: FlightAlert[];
  meta: AlertsApiMeta | null;
};

function parseAlertArray(items: unknown[]): FlightAlert[] {
  return items
    .map(normalizeAlert)
    .filter((alert): alert is FlightAlert => alert !== null);
}

function parseMeta(raw: unknown): AlertsApiMeta | null {
  if (!raw || typeof raw !== "object") return null;
  const m = raw as Record<string, unknown>;
  const source = m.source;
  const validSource =
    source === "upstream" ||
    source === "cache" ||
    source === "stale-cache" ||
    source === "fallback"
      ? source
      : undefined;

  return {
    last_real_update_at:
      typeof m.last_real_update_at === "string"
        ? m.last_real_update_at
        : m.last_real_update_at === null
          ? null
          : undefined,
    served_at: typeof m.served_at === "string" ? m.served_at : undefined,
    source: validSource,
    next_upstream_refresh_at:
      typeof m.next_upstream_refresh_at === "string"
        ? m.next_upstream_refresh_at
        : m.next_upstream_refresh_at === null
          ? null
          : undefined,
  };
}

/**
 * Parses GET /api/alerts body: direct array, `{ data, meta }`, or legacy `{ data }`.
 */
export function parseAlertsResponse(json: unknown): FlightAlert[] {
  return parseAlertsApiResponse(json).alerts;
}

export function parseAlertsApiResponse(json: unknown): ParsedAlertsResult {
  if (Array.isArray(json)) {
    return { alerts: parseAlertArray(json), meta: null };
  }

  if (json && typeof json === "object") {
    const obj = json as Record<string, unknown>;

    if (Array.isArray(obj.data)) {
      return {
        alerts: parseAlertArray(obj.data),
        meta: parseMeta(obj.meta),
      };
    }

    if (obj.error && typeof obj.error === "object") {
      const err = obj.error as { message?: string };
      if (typeof err.message === "string" && err.message.length > 0) {
        throw new Error(err.message);
      }
    }
  }

  return { alerts: [], meta: null };
}
