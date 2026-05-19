import type { FlightAlert } from "@/app/components/dashboard/alert-types";
import { formatAirportLabel } from "@/app/lib/alert-text";

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase();
}

/** Returns true if the alert touches this airport (departure or arrival). */
export function matchesAirportAlert(
  alert: FlightAlert,
  searchTerms: string[],
): boolean {
  if (searchTerms.length === 0) return false;

  const departure = formatAirportLabel(
    alert.departure?.airport,
    alert.departure?.iata,
  );
  const arrival = formatAirportLabel(
    alert.arrival?.airport,
    alert.arrival?.iata,
  );
  const haystack = normalize(`${departure} ${arrival}`);

  return searchTerms.some((term) => haystack.includes(normalize(term)));
}

export function filterAlertsByAirport(
  alerts: FlightAlert[],
  searchTerms: string[],
): FlightAlert[] {
  return alerts.filter((alert) => matchesAirportAlert(alert, searchTerms));
}
