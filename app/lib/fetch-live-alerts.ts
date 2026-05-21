import type { FlightAlert } from "@/app/components/dashboard/alert-types";
import {
  enrichAlerts,
  type LiveAlertPayload,
} from "@/app/lib/enrich-alert";
import { filterArabTravelerAlerts } from "@/app/lib/filter-arab-traveler-alerts";
import { parseAlertsResponse } from "@/app/lib/parse-alerts";

export type { LiveAlertPayload } from "@/app/lib/enrich-alert";

function upstreamErrorMessage(json: unknown): string | null {
  if (!json || typeof json !== "object") return null;
  const err = (json as { error?: { message?: string; code?: string } }).error;
  if (!err) return null;
  if (typeof err.message === "string" && err.message.length > 0) {
    return err.message;
  }
  if (typeof err.code === "string" && err.code.length > 0) {
    return err.code;
  }
  return null;
}

/** Resolves the upstream flights API URL (ALERTS_API_URL required in production). */
export function resolveAlertsApiUrl(): string {
  const explicit = process.env.ALERTS_API_URL?.trim();
  if (explicit) return explicit;

  const key = process.env.AVIATIONSTACK_API_KEY?.trim();
  if (key) {
    const params = new URLSearchParams({
      access_key: key,
      limit: "50",
    });
    return `https://api.aviationstack.com/v1/flights?${params.toString()}`;
  }

  throw new Error(
    "ALERTS_API_URL is not configured. Add it to .env.local (see AviationStack flights endpoint).",
  );
}

/**
 * Fetches live flights from ALERTS_API_URL, normalizes AviationStack (or flat) JSON,
 * and returns enriched Arabic-friendly payloads for the dashboard.
 */
export async function fetchLiveAlertsFromUpstream(): Promise<LiveAlertPayload[]> {
  const apiUrl = resolveAlertsApiUrl();
  const response = await fetch(apiUrl, { cache: "no-store" });

  const json: unknown = await response.json();

  if (!response.ok) {
    const message = upstreamErrorMessage(json);
    throw new Error(
      message
        ? `Alerts upstream failed (${response.status}): ${message}`
        : `Alerts upstream failed (${response.status})`,
    );
  }

  const apiMessage = upstreamErrorMessage(json);
  if (apiMessage) {
    throw new Error(apiMessage);
  }

  const flights = parseAlertsResponse(json);
  if (flights.length === 0) {
    throw new Error("Alerts upstream returned no flights");
  }

  const enriched = enrichAlerts(flights);
  const filtered = filterArabTravelerAlerts(enriched);

  console.log(
    `Arab-traveler filter: ${enriched.length} → ${filtered.length} flights`,
  );

  if (filtered.length === 0) {
    throw new Error("No Arab-region relevant flights after filtering");
  }

  return filtered;
}

/** Enriches already-parsed alerts (e.g. fallback rows). */
export function toLiveAlertPayloads(alerts: FlightAlert[]): LiveAlertPayload[] {
  return enrichAlerts(alerts);
}
