import type { FlightAlert } from "@/app/components/dashboard/alert-types";
import type { AlertSeverity } from "@/app/components/dashboard/mock-data";
import { formatAirportLabel } from "@/app/lib/alert-text";
import {
  airportsCatalog,
  getAirportByIata,
  type AirportDefinition,
} from "@/app/lib/airports-data";
import {
  airlinesCatalog,
  getAirlineBySlug,
  getAirlineSlugByCode,
} from "@/app/lib/airlines-data";
import { getFlightStatusLabelAr } from "@/app/lib/flight-status";

export type AlertAirportEndpoint = NonNullable<FlightAlert["departure"]> & {
  city_ar?: string | null;
  country_ar?: string | null;
};

/** Normalized alert payload returned by GET /api/alerts */
export type LiveAlertPayload = FlightAlert & {
  status_ar: string;
  airline_name: string;
  departure_label: string;
  arrival_label: string;
  flight_number: string | null;
  updated_at: string;
  severity: AlertSeverity;
  summary_ar: string;
};

const severityLabelsAr: Record<AlertSeverity, string> = {
  high: "عالي",
  medium: "متوسط",
  low: "منخفض",
};

function normalizeToken(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function findAirportByLabel(label: string): AirportDefinition | null {
  const norm = normalizeToken(label);
  if (!norm) return null;

  for (const airport of Object.values(airportsCatalog)) {
    const candidates = [
      airport.nameEn,
      airport.nameAr,
      airport.cityAr,
      airport.countryEn,
      airport.countryAr,
      ...airport.searchTerms,
    ];
    if (
      candidates.some((c) => {
        const t = normalizeToken(c);
        return t === norm || t.includes(norm) || norm.includes(t);
      })
    ) {
      return airport;
    }
  }
  return null;
}

function resolveAirlineNameAr(alert: FlightAlert): string {
  const iata = alert.airline?.iata?.trim().toUpperCase();
  if (iata) {
    const slug = getAirlineSlugByCode(iata);
    const catalog = slug ? getAirlineBySlug(slug) : null;
    if (catalog) return catalog.nameAr;
  }

  const rawName = alert.airline?.name?.trim() ?? alert.airline_name?.trim() ?? "";
  if (!rawName) return "";

  const norm = normalizeToken(rawName);
  for (const airline of Object.values(airlinesCatalog)) {
    if (
      normalizeToken(airline.nameEn) === norm ||
      normalizeToken(airline.nameAr) === norm ||
      airline.searchTerms.some((t) => normalizeToken(t) === norm)
    ) {
      return airline.nameAr;
    }
  }

  return rawName;
}

function resolveAirportEndpoint(
  endpoint: FlightAlert["departure"] | FlightAlert["arrival"],
  labelFallback?: string,
): {
  endpoint: AlertAirportEndpoint | null;
  label: string;
} {
  const iata = endpoint?.iata?.trim().toUpperCase();
  let catalog = getAirportByIata(iata);

  if (!catalog) {
    const hint = endpoint?.airport?.trim() || labelFallback?.trim() || "";
    if (hint) catalog = findAirportByLabel(hint);
  }

  if (catalog) {
    const enriched: AlertAirportEndpoint = {
      ...endpoint,
      airport: catalog.nameAr,
      iata: catalog.code,
      city_ar: catalog.cityAr,
      country_ar: catalog.countryAr,
    };
    return {
      endpoint: enriched,
      label: formatAirportLabel(catalog.nameAr, catalog.code),
    };
  }

  const airportName = endpoint?.airport?.trim() ?? labelFallback?.trim() ?? "";
  const label = formatAirportLabel(airportName, iata ?? null);
  if (!airportName && !iata) {
    return { endpoint: endpoint ?? null, label: "" };
  }

  return {
    endpoint: endpoint
      ? { ...endpoint, airport: airportName || endpoint.airport }
      : airportName
        ? { airport: airportName, iata: iata ?? null }
        : null,
    label,
  };
}

export function resolveFlightNumber(alert: FlightAlert): string | null {
  if (alert.flight_number?.trim()) return alert.flight_number.trim();

  const flightIata = alert.flight?.iata?.trim();
  if (flightIata) return flightIata;

  const number = alert.flight?.number?.trim();
  if (!number) return null;

  const airlineCode = alert.airline?.iata?.trim() ?? "";
  if (airlineCode && !number.toUpperCase().startsWith(airlineCode.toUpperCase())) {
    return `${airlineCode}${number}`;
  }
  return number;
}

export function inferAlertSeverity(status: string): AlertSeverity {
  const key = status.trim().toLowerCase();
  if (key === "cancelled" || key === "incident" || key === "diverted") {
    return "high";
  }
  if (key === "delayed" || key === "active") {
    return "medium";
  }
  return "low";
}

export function buildArabicAlertSummary(input: {
  flightNumber: string | null;
  airlineAr: string;
  departureLabel: string;
  departureCity?: string | null;
  departureCountry?: string | null;
  arrivalLabel: string;
  arrivalCity?: string | null;
  arrivalCountry?: string | null;
  statusAr: string;
  severity: AlertSeverity;
}): string {
  const parts: string[] = [];

  if (input.flightNumber) {
    parts.push(`رحلة ${input.flightNumber}`);
  }

  if (input.airlineAr) {
    parts.push(
      input.flightNumber
        ? `على متن ${input.airlineAr}`
        : `تنبيه عن ${input.airlineAr}`,
    );
  }

  const depPlace =
    input.departureCity && input.departureCountry
      ? `${input.departureLabel} (${input.departureCity}، ${input.departureCountry})`
      : input.departureLabel;
  const arrPlace =
    input.arrivalCity && input.arrivalCountry
      ? `${input.arrivalLabel} (${input.arrivalCity}، ${input.arrivalCountry})`
      : input.arrivalLabel;

  if (depPlace && arrPlace) {
    parts.push(`من ${depPlace} إلى ${arrPlace}`);
  } else if (depPlace) {
    parts.push(`من ${depPlace}`);
  } else if (arrPlace) {
    parts.push(`إلى ${arrPlace}`);
  }

  parts.push(`الحالة: ${input.statusAr}`);
  parts.push(`مستوى الأولوية: ${severityLabelsAr[input.severity]}`);

  return parts.join(" — ");
}

/** Enriches a parsed flight with Arabic catalog data, metadata, and summary. */
export function enrichAlert(
  alert: FlightAlert,
  updatedAt: string = new Date().toISOString(),
): LiveAlertPayload {
  const status = alert.flight_status?.trim() ?? "";
  const statusAr = alert.status_ar ?? getFlightStatusLabelAr(status);
  const severity = alert.severity ?? inferAlertSeverity(status);

  const dep = resolveAirportEndpoint(alert.departure, alert.departure_label);
  const arr = resolveAirportEndpoint(alert.arrival, alert.arrival_label);

  const airlineNameAr = resolveAirlineNameAr(alert);
  const airlineIata = alert.airline?.iata ?? null;

  const airline = alert.airline
    ? { ...alert.airline, name: airlineNameAr || alert.airline.name }
    : airlineNameAr
      ? { name: airlineNameAr, iata: airlineIata }
      : null;

  const flightNumber = resolveFlightNumber(alert);

  const summaryAr =
    alert.summary_ar ??
    buildArabicAlertSummary({
      flightNumber,
      airlineAr: airlineNameAr,
      departureLabel: dep.label,
      departureCity: dep.endpoint?.city_ar,
      departureCountry: dep.endpoint?.country_ar,
      arrivalLabel: arr.label,
      arrivalCity: arr.endpoint?.city_ar,
      arrivalCountry: arr.endpoint?.country_ar,
      statusAr,
      severity,
    });

  return {
    ...alert,
    airline,
    airline_name: airlineNameAr,
    departure: dep.endpoint,
    arrival: arr.endpoint,
    departure_label: dep.label,
    arrival_label: arr.label,
    flight_number: flightNumber,
    status_ar: statusAr,
    updated_at: alert.updated_at ?? updatedAt,
    severity,
    summary_ar: summaryAr,
  };
}

export function enrichAlerts(
  alerts: FlightAlert[],
  updatedAt?: string,
): LiveAlertPayload[] {
  const stamp = updatedAt ?? new Date().toISOString();
  return alerts.map((alert) => enrichAlert(alert, stamp));
}
