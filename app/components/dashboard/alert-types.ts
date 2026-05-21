import type { AlertSeverity } from "./mock-data";

export type FlightStatus =
  | "scheduled"
  | "active"
  | "landed"
  | "cancelled"
  | "incident"
  | "diverted"
  | string;

export type AlertAirportEndpoint = {
  airport?: string | null;
  iata?: string | null;
  icao?: string | null;
  scheduled?: string | null;
  /** Upstream country name when provided (e.g. AviationStack) */
  country?: string | null;
  city_ar?: string | null;
  country_ar?: string | null;
};

export type FlightAlert = {
  flight_date?: string;
  flight_status?: FlightStatus;
  flight_number?: string | null;
  updated_at?: string;
  severity?: AlertSeverity;
  summary_ar?: string;
  /** Arabic status label from GET /api/alerts when available */
  status_ar?: string;
  airline_name?: string;
  departure_label?: string;
  arrival_label?: string;
  departure?: AlertAirportEndpoint | null;
  arrival?: AlertAirportEndpoint | null;
  airline?: {
    name?: string | null;
    iata?: string | null;
  } | null;
  flight?: {
    iata?: string | null;
    number?: string | null;
  };
};

/** Flat alert item from GET /api/alerts */
export type ApiAlert = {
  airline?: string;
  departure?: string;
  arrival?: string;
  status?: string;
};
