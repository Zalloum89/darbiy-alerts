import type { FlightAlert } from "@/app/components/dashboard/alert-types";

export function formatAirportLabel(
  airport?: string | null,
  iata?: string | null,
): string {
  if (airport && iata) return `${airport} (${iata})`;
  return airport ?? iata ?? "";
}

export function buildAlertSummary(alert: FlightAlert): string {
  const airline = alert.airline?.name?.trim();
  const flightCode =
    alert.flight?.iata ??
    (alert.flight?.number
      ? `${alert.airline?.iata ?? ""}${alert.flight.number}`
      : null);
  const departure = formatAirportLabel(
    alert.departure?.airport,
    alert.departure?.iata,
  );
  const arrival = formatAirportLabel(
    alert.arrival?.airport,
    alert.arrival?.iata,
  );
  const status = alert.flight_status?.trim();

  const parts: string[] = [];
  if (airline) parts.push(airline);
  if (flightCode) parts.push(`Flight ${flightCode}`);
  if (departure && arrival) parts.push(`${departure} → ${arrival}`);
  else if (departure) parts.push(`From ${departure}`);
  else if (arrival) parts.push(`To ${arrival}`);
  if (status) parts.push(`Status: ${status}`);
  if (alert.flight_date) parts.push(`Date: ${alert.flight_date}`);

  return parts.join(" · ");
}

/** Unique English strings to send to DeepSeek for a set of alerts. */
export function collectTranslatableTexts(alerts: FlightAlert[]): string[] {
  const texts = new Set<string>();

  for (const alert of alerts) {
    const status = alert.flight_status?.trim();
    if (status) texts.add(status);

    const airline = alert.airline?.name?.trim();
    if (airline) texts.add(airline);

    const departure = formatAirportLabel(
      alert.departure?.airport,
      alert.departure?.iata,
    );
    if (departure) texts.add(departure);

    const arrival = formatAirportLabel(
      alert.arrival?.airport,
      alert.arrival?.iata,
    );
    if (arrival) texts.add(arrival);

    const summary = buildAlertSummary(alert);
    if (summary) texts.add(summary);
  }

  return [...texts];
}
