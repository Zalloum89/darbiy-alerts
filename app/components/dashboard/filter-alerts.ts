import { formatAirportLabel } from "@/app/lib/alert-text";
import { getFlightStatusLabelAr } from "@/app/lib/flight-status";
import type { FlightAlert } from "./alert-types";

/** Safely normalize any API value for case-insensitive comparison. */
function normalize(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim().toLocaleLowerCase();
}

function normalizeQuery(query: string): string {
  return query.trim().toLocaleLowerCase();
}

/**
 * Collects real AviationStack fields used for search:
 * airline name, departure/arrival airport (name + IATA/ICAO), flight status (EN + AR).
 */
function getSearchableFields(
  alert: FlightAlert,
  translations?: Record<string, string>,
): string[] {
  const status = alert.flight_status;
  const departureLabel = formatAirportLabel(
    alert.departure?.airport,
    alert.departure?.iata,
  );
  const arrivalLabel = formatAirportLabel(
    alert.arrival?.airport,
    alert.arrival?.iata,
  );

  const raw: unknown[] = [
    alert.airline?.name,
    alert.airline?.iata,
    alert.airline_name,
    alert.flight_number,
    alert.flight?.iata,
    alert.flight?.number,
    alert.departure?.airport,
    alert.departure?.iata,
    alert.departure?.icao,
    alert.departure?.city_ar,
    alert.departure?.country_ar,
    alert.arrival?.airport,
    alert.arrival?.iata,
    alert.arrival?.icao,
    alert.arrival?.city_ar,
    alert.arrival?.country_ar,
    departureLabel,
    arrivalLabel,
    alert.summary_ar,
    alert.severity,
    status,
    alert.status_ar,
    status ? getFlightStatusLabelAr(status) : null,
    alert.airline?.name ? translations?.[alert.airline.name.trim()] : null,
    departureLabel ? translations?.[departureLabel] : null,
    arrivalLabel ? translations?.[arrivalLabel] : null,
    status ? translations?.[status.trim()] : null,
  ];

  return raw.map(normalize).filter((field) => field.length > 0);
}

export function matchesAlert(
  alert: FlightAlert,
  query: string,
  translations?: Record<string, string>,
): boolean {
  const normalizedQuery = normalizeQuery(query);
  if (!normalizedQuery) return true;

  const fields = getSearchableFields(alert, translations);
  if (fields.length === 0) return false;

  return fields.some((field) => field.includes(normalizedQuery));
}

export function filterAlerts(
  alerts: FlightAlert[],
  query: string,
  translations?: Record<string, string>,
): FlightAlert[] {
  const normalizedQuery = normalizeQuery(query);
  if (!normalizedQuery) return alerts;

  return alerts.filter((alert) =>
    matchesAlert(alert, normalizedQuery, translations),
  );
}
