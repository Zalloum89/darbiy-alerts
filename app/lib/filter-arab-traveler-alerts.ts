import type { FlightAlert } from "@/app/components/dashboard/alert-types";
import { airportsCatalog } from "@/app/lib/airports-data";
import { airlinesCatalog } from "@/app/lib/airlines-data";

/** Countries prioritized for Arab travelers (English catalog names). */
const PRIORITY_COUNTRY_EN = new Set([
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Jordan",
  "Egypt",
  "Turkey",
  "Lebanon",
  "Morocco",
]);

/** Morocco hubs not yet in airports catalog */
const MOROCCO_IATA = new Set([
  "CMN",
  "RAK",
  "FEZ",
  "TNG",
  "AGA",
  "OUD",
  "NDZ",
  "ESU",
  "ERH",
  "TTU",
]);

const PRIORITY_AIRLINE_IATA = new Set([
  "EK", // Emirates
  "QR", // Qatar Airways
  "SV", // Saudia
  "FZ", // Flydubai
  "G9", // Air Arabia
  "TK", // Turkish Airlines
  "MS", // EgyptAir
  "RJ", // Royal Jordanian
  "KU", // Kuwait Airways
  "WY", // Oman Air
  "GF", // Gulf Air
  "ME", // Middle East Airlines
]);

const PRIORITY_AIRLINE_NAMES = new Set(
  [
    "Emirates",
    "Qatar Airways",
    "Saudia",
    "flydubai",
    "Flydubai",
    "Air Arabia",
    "Turkish Airlines",
    "EgyptAir",
    "Royal Jordanian",
    "Kuwait Airways",
    "Oman Air",
    "Gulf Air",
    "Middle East Airlines",
    "الإمارات",
    "طيران الإمارات",
    "الخطوط الجوية القطرية",
    "الخطوط القطرية",
    "السعودية",
    "فلاي دبي",
    "العربية للطيران",
    "الخطوط التركية",
    "مصر للطيران",
    "الملكية الأردنية",
    "الخطوط الكويتية",
    "الطيران العماني",
    "طيران الخليج",
    "طيران الشرق الأوسط",
  ].map((n) => n.trim().toLocaleLowerCase()),
);

const PRIORITY_IATA = new Set<string>([...MOROCCO_IATA]);

for (const airport of Object.values(airportsCatalog)) {
  if (PRIORITY_COUNTRY_EN.has(airport.countryEn)) {
    PRIORITY_IATA.add(airport.code.toUpperCase());
  }
}

const PRIORITY_COUNTRY_TOKENS = new Set(
  [
    ...PRIORITY_COUNTRY_EN,
    "uae",
    "emirates",
    "ksa",
    "morocco",
    "الإمارات",
    "السعودية",
    "المملكة العربية السعودية",
    "قطر",
    "الكويت",
    "البحرين",
    "عُمان",
    "سلطنة عُمان",
    "الأردن",
    "مصر",
    "تركيا",
    "لبنان",
    "المغرب",
  ].map((c) => c.trim().toLocaleLowerCase()),
);

/** Exclude purely domestic / regional Australia legs with no Arab hub. */
const AUSTRALIA_IATA = new Set([
  "SYD",
  "MEL",
  "BNE",
  "PER",
  "ADL",
  "CBR",
  "OOL",
  "HBA",
  "DRW",
  "CNS",
  "TSV",
  "MCY",
  "AKL",
  "WLG",
  "CHC",
]);

const AUSTRALIA_COUNTRY_TOKENS = new Set([
  "australia",
  "new zealand",
  "أستراليا",
  "نيوزيلندا",
]);

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase();
}

function countryMatchesPriority(country?: string | null): boolean {
  if (!country?.trim()) return false;
  const norm = normalize(country);
  for (const token of PRIORITY_COUNTRY_TOKENS) {
    if (norm === token || norm.includes(token) || token.includes(norm)) {
      return true;
    }
  }
  return false;
}

function isAustraliaCountry(country?: string | null): boolean {
  if (!country?.trim()) return false;
  const norm = normalize(country);
  for (const token of AUSTRALIA_COUNTRY_TOKENS) {
    if (norm.includes(token)) return true;
  }
  return false;
}

function endpointMatchesPriority(
  endpoint: FlightAlert["departure"] | FlightAlert["arrival"],
): boolean {
  if (!endpoint) return false;

  const iata = endpoint.iata?.trim().toUpperCase();
  if (iata && PRIORITY_IATA.has(iata)) return true;

  const country = endpoint.country_ar ?? endpoint.country ?? null;
  if (countryMatchesPriority(country)) return true;

  return false;
}

function isAustraliaOnlyEndpoint(
  endpoint: FlightAlert["departure"] | FlightAlert["arrival"],
): boolean {
  if (!endpoint) return false;
  const iata = endpoint.iata?.trim().toUpperCase();
  if (iata && AUSTRALIA_IATA.has(iata)) return true;
  const country = endpoint.country_ar ?? endpoint.country ?? null;
  return isAustraliaCountry(country);
}

function isPriorityAirline(alert: FlightAlert): boolean {
  const iata = alert.airline?.iata?.trim().toUpperCase();
  if (iata && PRIORITY_AIRLINE_IATA.has(iata)) return true;

  const name = normalize(
    alert.airline_name ?? alert.airline?.name ?? "",
  );
  if (!name) return false;

  if (PRIORITY_AIRLINE_NAMES.has(name)) return true;

  for (const airline of Object.values(airlinesCatalog)) {
    if (!PRIORITY_AIRLINE_IATA.has(airline.code)) continue;
    const candidates = [
      airline.nameEn,
      airline.nameAr,
      ...airline.searchTerms,
    ].map(normalize);
    if (candidates.some((c) => c === name || name.includes(c) || c.includes(name))) {
      return true;
    }
  }

  return false;
}

function isAustraliaRegionalOnly(alert: FlightAlert): boolean {
  const depAu = isAustraliaOnlyEndpoint(alert.departure);
  const arrAu = isAustraliaOnlyEndpoint(alert.arrival);
  return depAu && arrAu;
}

/**
 * Keeps flights relevant to Arab travelers: priority MENA/Gulf/Turkey/Morocco
 * airports or listed regional carriers. Drops e.g. Australia domestic hops.
 */
export function isArabTravelerRelevantAlert(alert: FlightAlert): boolean {
  if (isPriorityAirline(alert)) {
    if (isAustraliaRegionalOnly(alert)) return false;
    return true;
  }

  const depMatch = endpointMatchesPriority(alert.departure);
  const arrMatch = endpointMatchesPriority(alert.arrival);

  if (!depMatch && !arrMatch) return false;
  if (isAustraliaRegionalOnly(alert)) return false;

  return true;
}

export function filterArabTravelerAlerts<T extends FlightAlert>(
  alerts: T[],
): T[] {
  return alerts.filter(isArabTravelerRelevantAlert);
}
