import type { FlightAlert } from "@/app/components/dashboard/alert-types";

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
      flight_status:
        typeof raw.status === "string"
          ? raw.status
          : typeof raw.flight_status === "string"
            ? raw.flight_status
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
    return normalizeNested(raw);
  }

  return null;
}

/**
 * Parses GET /api/alerts body: direct array, or legacy `{ data: [...] }` wrapper.
 */
export function parseAlertsResponse(json: unknown): FlightAlert[] {
  if (Array.isArray(json)) {
    return json
      .map(normalizeAlert)
      .filter((alert): alert is FlightAlert => alert !== null);
  }

  if (json && typeof json === "object") {
    const obj = json as Record<string, unknown>;

    if (Array.isArray(obj.data)) {
      return obj.data
        .map(normalizeAlert)
        .filter((alert): alert is FlightAlert => alert !== null);
    }

    if (obj.error && typeof obj.error === "object") {
      const err = obj.error as { message?: string };
      if (typeof err.message === "string" && err.message.length > 0) {
        throw new Error(err.message);
      }
    }
  }

  return [];
}
