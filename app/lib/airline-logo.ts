import { airlinesCatalog } from "@/app/lib/airlines-data";

const LOGO_CODES = new Set(
  Object.values(airlinesCatalog).map((a) => a.code.toUpperCase()),
);

export function getAirlineLogoUrl(iata: string | null | undefined): string | null {
  if (!iata) return null;
  const code = iata.trim().toUpperCase();
  if (!LOGO_CODES.has(code)) return null;
  return `https://images.kiwi.com/airlines/64/${code}.png`;
}

export function getAirlineMonogram(iata: string | null | undefined): string {
  if (!iata) return "—";
  return iata.trim().toUpperCase().slice(0, 2);
}
