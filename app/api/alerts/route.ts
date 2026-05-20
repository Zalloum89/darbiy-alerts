import { NextResponse } from "next/server";
import type { FlightAlert } from "@/app/components/dashboard/alert-types";
import {
  fetchLiveAlertsFromUpstream,
  toLiveAlertPayloads,
  type LiveAlertPayload,
} from "@/app/lib/fetch-live-alerts";

const CACHE_TTL_MS = 5 * 60 * 1000;

let cachedAlerts: LiveAlertPayload[] | null = null;
let lastFetchTime: number | null = null;

/** Minimal upstream-shaped rows enriched on failure when cache is empty. */
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

function isCacheValid(): boolean {
  if (cachedAlerts === null || lastFetchTime === null) {
    return false;
  }
  return Date.now() - lastFetchTime < CACHE_TTL_MS;
}

export async function GET() {
  if (isCacheValid()) {
    console.log("Serving alerts from cache");
    return NextResponse.json(cachedAlerts);
  }

  console.log("Fetching fresh alerts");

  try {
    const fresh = await fetchLiveAlertsFromUpstream();
    cachedAlerts = fresh;
    lastFetchTime = Date.now();
    return NextResponse.json(cachedAlerts);
  } catch (error) {
    console.error("Alerts API error:", error);

    if (cachedAlerts !== null) {
      console.log("Serving alerts from cache (fallback)");
      return NextResponse.json(cachedAlerts, {
        headers: { "X-Alerts-Source": "stale-cache" },
      });
    }

    console.log("Serving fallback alerts after upstream failure");
    return NextResponse.json(FALLBACK_ALERTS, {
      headers: { "X-Alerts-Source": "fallback" },
    });
  }
}
