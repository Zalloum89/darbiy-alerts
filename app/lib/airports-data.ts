import type { AlertSeverity } from "@/app/components/dashboard/mock-data";

export type AirportAirline = {
  code: string;
  name: string;
  flights: number;
  status: string;
};

export type AirportDefinition = {
  slug: string;
  code: string;
  nameAr: string;
  nameEn: string;
  cityAr: string;
  countryAr: string;
  countryEn: string;
  statusAr: string;
  statusDetailAr: string;
  severity: AlertSeverity;
  activeAlerts: number;
  airlines: AirportAirline[];
  /** Terms used to match live alerts (departure/arrival). */
  searchTerms: string[];
  description: string;
  /** Slugs of related hubs for internal linking. */
  relatedSlugs: string[];
};

export const airportsCatalog: Record<string, AirportDefinition> = {
  dubai: {
    slug: "dubai",
    code: "DXB",
    nameAr: "مطار دبي الدولي",
    nameEn: "Dubai International Airport",
    cityAr: "دبي",
    countryAr: "الإمارات العربية المتحدة",
    countryEn: "United Arab Emirates",
    statusAr: "تأخيرات تشغيلية",
    statusDetailAr:
      "ازدحام متوسط على المدرج الشمالي مع تأخيرات مغادرة تتراوح بين ٢٠–٤٥ دقيقة.",
    severity: "high",
    activeAlerts: 6,
    searchTerms: ["دبي", "dubai", "dxb"],
    relatedSlugs: ["doha", "istanbul", "london"],
    description:
      "أحد أكثر المطارات ازدحاماً في العالم، مع رصد مباشر للتنبيهات والرحلات المتأثرة.",
    airlines: [
      { code: "EK", name: "طيران الإمارات", flights: 142, status: "تشغيل طبيعي" },
      { code: "FZ", name: "فلاي دبي", flights: 68, status: "تأخيرات خفيفة" },
      { code: "QR", name: "الخطوط القطرية", flights: 24, status: "في الموعد" },
    ],
  },
  doha: {
    slug: "doha",
    code: "DOH",
    nameAr: "مطار حمد الدولي",
    nameEn: "Hamad International Airport",
    cityAr: "الدوحة",
    countryAr: "قطر",
    countryEn: "Qatar",
    statusAr: "تشغيل مستقر",
    statusDetailAr:
      "حركة مرورية سلسة مع مراقبة استباقية لموجات الذروة المسائية.",
    severity: "low",
    activeAlerts: 2,
    searchTerms: ["الدوحة", "doha", "doh", "قطر"],
    relatedSlugs: ["dubai", "istanbul", "london"],
    description:
      "محور رئيسي في الخليج مع تغطية تنبيهات لحظية لرحلات المغادرة والوصول.",
    airlines: [
      { code: "QR", name: "الخطوط القطرية", flights: 118, status: "في الموعد" },
      { code: "TK", name: "الخطوط التركية", flights: 22, status: "تشغيل طبيعي" },
      { code: "EK", name: "طيران الإمارات", flights: 14, status: "تشغيل طبيعي" },
    ],
  },
  istanbul: {
    slug: "istanbul",
    code: "IST",
    nameAr: "مطار إسطنبول",
    nameEn: "Istanbul Airport",
    cityAr: "إسطنبول",
    countryAr: "تركيا",
    countryEn: "Turkey",
    statusAr: "ازدحام متوسط",
    statusDetailAr:
      "ضغط على صالات المغادرة الأوروبية مع بعض التأخيرات على الرحلات الترانزيت.",
    severity: "medium",
    activeAlerts: 4,
    searchTerms: ["istanbul", "إسطنبول", "اسطنبول", "ist"],
    relatedSlugs: ["dubai", "doha", "london"],
    description:
      "بوابة أوروبا–آسيا مع تنبيهات مباشرة لرحلات الترانزيت والرحلات المحلية.",
    airlines: [
      { code: "TK", name: "الخطوط التركية", flights: 186, status: "تأخيرات محدودة" },
      { code: "PC", name: "بيغاسوس", flights: 54, status: "تشغيل طبيعي" },
      { code: "EK", name: "طيران الإمارات", flights: 18, status: "في الموعد" },
    ],
  },
  london: {
    slug: "london",
    code: "LHR",
    nameAr: "مطار لندن هيثرو",
    nameEn: "London Heathrow Airport",
    cityAr: "لندن",
    countryAr: "المملكة المتحدة",
    countryEn: "United Kingdom",
    statusAr: "ازدحام عالي",
    statusDetailAr:
      "قيود على معدلات الإقلاع بسبب الطقس والسعة مع تأخيرات على الرحلات الطويلة.",
    severity: "high",
    activeAlerts: 5,
    searchTerms: ["london", "لندن", "heathrow", "lhr"],
    relatedSlugs: ["dubai", "doha", "istanbul"],
    description:
      "مركز عالمي للرحلات الدولية مع مراقبة تنبيهات الطقس والسعة التشغيلية.",
    airlines: [
      { code: "BA", name: "بريتيش إيرويز", flights: 96, status: "تأخيرات" },
      { code: "VS", name: "فيرجن أتلانتيك", flights: 32, status: "تشغيل طبيعي" },
      { code: "EK", name: "طيران الإمارات", flights: 12, status: "متأخرة" },
    ],
  },
};

export function getAllAirportSlugs(): string[] {
  return Object.keys(airportsCatalog);
}

export function getAirportBySlug(slug: string): AirportDefinition | null {
  return airportsCatalog[slug] ?? null;
}

export function getFeaturedAirports(): AirportDefinition[] {
  return getAllAirportSlugs().map((slug) => airportsCatalog[slug]);
}

export function getRelatedAirports(
  slug: string,
  limit = 3,
): AirportDefinition[] {
  const airport = getAirportBySlug(slug);
  if (!airport) return [];

  return airport.relatedSlugs
    .slice(0, limit)
    .map((relatedSlug) => airportsCatalog[relatedSlug])
    .filter(Boolean);
}

/** All airport page paths for sitemaps and SEO. */
export function getAirportPagePaths(): string[] {
  return getAllAirportSlugs().map((slug) => `/airport/${slug}`);
}
