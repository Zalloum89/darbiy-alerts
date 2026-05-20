import type { FlightAlert } from "@/app/components/dashboard/alert-types";

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase();
}

/** Returns true if the alert belongs to this airline (name or IATA code). */
export function matchesAirlineAlert(
  alert: FlightAlert,
  searchTerms: string[],
): boolean {
  if (searchTerms.length === 0) return false;

  const airlineName = alert.airline?.name ?? "";
  const airlineCode = alert.airline?.iata ?? "";
  const flightCode = alert.flight?.iata ?? alert.flight?.number ?? "";
  const haystack = normalize(`${airlineName} ${airlineCode} ${flightCode}`);

  return searchTerms.some((term) => haystack.includes(normalize(term)));
}

export function filterAlertsByAirline(
  alerts: FlightAlert[],
  searchTerms: string[],
): FlightAlert[] {
  return alerts.filter((alert) => matchesAirlineAlert(alert, searchTerms));
}
