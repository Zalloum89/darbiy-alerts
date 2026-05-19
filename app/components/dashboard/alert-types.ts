export type FlightStatus =
  | "scheduled"
  | "active"
  | "landed"
  | "cancelled"
  | "incident"
  | "diverted"
  | string;

export type FlightAlert = {
  flight_date?: string;
  flight_status?: FlightStatus;
  departure?: {
    airport?: string | null;
    iata?: string | null;
    icao?: string | null;
    scheduled?: string | null;
  } | null;
  arrival?: {
    airport?: string | null;
    iata?: string | null;
    icao?: string | null;
  } | null;
  airline?: {
    name?: string | null;
    iata?: string | null;
  } | null;
  flight?: {
    iata?: string | null;
    number?: string | null;
  };
};

export type AlertsApiResponse = {
  data?: FlightAlert[];
  error?: {
    code?: string;
    message?: string;
    type?: string;
  };
};
