import type { AlertSeverity } from "@/app/components/dashboard/mock-data";

export type AirlineDefinition = {
  slug: string;
  code: string;
  nameAr: string;
  nameEn: string;
  countryAr: string;
  countryEn: string;
  statusAr: string;
  statusDetailAr: string;
  severity: AlertSeverity;
  activeAlerts: number;
  /** Hub / focus airport slugs (internal links to /airport/[slug]). */
  operatingAirportSlugs: string[];
  /** Terms used to match live alerts by airline name or code. */
  searchTerms: string[];
  /** وصف بالعربية — يُعرض في صفحة الشركة ويُستخدم في SEO. */
  overviewAr: string;
  /** Slugs of related airlines for internal linking. */
  relatedSlugs: string[];
};

export const airlinesCatalog: Record<string, AirlineDefinition> = {
  emirates: {
    slug: "emirates",
    code: "EK",
    nameAr: "طيران الإمارات",
    nameEn: "Emirates",
    countryAr: "الإمارات العربية المتحدة",
    countryEn: "United Arab Emirates",
    statusAr: "تشغيل مستقر",
    statusDetailAr:
      "محور دبي يعمل بسلاسة مع بعض التأخيرات الموسمية على الرحلات الطويلة نحو أوروبا وأمريكا.",
    severity: "medium",
    activeAlerts: 3,
    operatingAirportSlugs: [
      "dubai",
      "london",
      "jeddah",
      "cairo",
      "bangkok",
      "kuala-lumpur",
      "istanbul",
    ],
    searchTerms: ["emirates", "طيران الإمارات", "الإمارات", "ek"],
    overviewAr:
      "ناقلة وطنية إماراتية تربط دبي بأكثر من ١٥٠ وجهة عالمياً، وتُعد خياراً أساسياً للمسافرين العرب في الترانزيت والسياحة والعمل.",
    relatedSlugs: ["qatar-airways", "etihad", "turkish-airlines"],
  },
  "qatar-airways": {
    slug: "qatar-airways",
    code: "QR",
    nameAr: "الخطوط الجوية القطرية",
    nameEn: "Qatar Airways",
    countryAr: "قطر",
    countryEn: "Qatar",
    statusAr: "تشغيل ممتاز",
    statusDetailAr:
      "مطار حمد يشهد حركة ترانزيت عالية مع الحفاظ على جودة الخدمة في الذروات.",
    severity: "low",
    activeAlerts: 2,
    operatingAirportSlugs: [
      "doha",
      "dubai",
      "jeddah",
      "amman",
      "cairo",
      "istanbul",
      "paris",
      "kuwait-city",
    ],
    searchTerms: ["qatar", "qatar airways", "الخطوط القطرية", "قطر", "qr"],
    overviewAr:
      "ناقلة قطرية حائزة على جوائز عالمية، تركز على تجربة ركاب عالية وتربط الخليج بشبكة واسعة في آسيا وأوروبا وأفريقيا.",
    relatedSlugs: ["emirates", "kuwait-airways", "turkish-airlines"],
  },
  etihad: {
    slug: "etihad",
    code: "EY",
    nameAr: "الاتحاد للطيران",
    nameEn: "Etihad Airways",
    countryAr: "الإمارات العربية المتحدة",
    countryEn: "United Arab Emirates",
    statusAr: "تشغيل طبيعي",
    statusDetailAr:
      "توسعة شبكة أبوظبي مع مراقبة ذروة الرحلات نحو الهند وأوروبا.",
    severity: "low",
    activeAlerts: 2,
    operatingAirportSlugs: [
      "abu-dhabi",
      "dubai",
      "jeddah",
      "cairo",
      "london",
      "paris",
      "istanbul",
    ],
    searchTerms: ["etihad", "الاتحاد", "ey", "اتحاد"],
    overviewAr:
      "الناقلة الوطنية لإمارة أبوظبي، تقدم رحلات طويلة وترانزيت مريح للمسافرين العرب نحو آسيا وأوروبا وأمريكا.",
    relatedSlugs: ["emirates", "flydubai", "qatar-airways"],
  },
  flydubai: {
    slug: "flydubai",
    code: "FZ",
    nameAr: "فلاي دبي",
    nameEn: "flydubai",
    countryAr: "الإمارات العربية المتحدة",
    countryEn: "United Arab Emirates",
    statusAr: "تشغيل نشط",
    statusDetailAr:
      "شبكة وجهات اقتصادية واسعة مع ازدحام خفيف في أوقات العطلات.",
    severity: "medium",
    activeAlerts: 4,
    operatingAirportSlugs: [
      "dubai",
      "sharjah",
      "riyadh",
      "jeddah",
      "kuwait-city",
      "istanbul",
      "cairo",
    ],
    searchTerms: ["flydubai", "فلاي دبي", "fly dubai", "fz"],
    overviewAr:
      "ناقلة اقتصادية إماراتية من دبي تخدم وجهات كثيرة في الشرق الأوسط وجنوب آسيا وأفريقيا، مناسبة للعائلات والمسافرين العرب.",
    relatedSlugs: ["emirates", "air-arabia", "flynas"],
  },
  "air-arabia": {
    slug: "air-arabia",
    code: "G9",
    nameAr: "العربية للطيران",
    nameEn: "Air Arabia",
    countryAr: "الإمارات العربية المتحدة",
    countryEn: "United Arab Emirates",
    statusAr: "تشغيل مستقر",
    statusDetailAr: "رحلات منخفضة التكلفة منتظمة من الشارقة ومحاور أخرى.",
    severity: "low",
    activeAlerts: 2,
    operatingAirportSlugs: [
      "sharjah",
      "cairo",
      "alexandria",
      "riyadh",
      "jeddah",
      "muscat",
      "amman",
    ],
    searchTerms: ["air arabia", "العربية", "arabia", "g9"],
    overviewAr:
      "رائدة الطيران الاقتصادي في المنطقة، تربط الشارقة والإمارات بوجهات عربية وآسيوية بأسعار تنافسية.",
    relatedSlugs: ["flydubai", "flynas", "saudia"],
  },
  saudia: {
    slug: "saudia",
    code: "SV",
    nameAr: "الخطوط السعودية",
    nameEn: "Saudia",
    countryAr: "المملكة العربية السعودية",
    countryEn: "Saudi Arabia",
    statusAr: "ضغط تشغيلي موسمي",
    statusDetailAr:
      "ذروة على رحلات الحج والعمرة والعطلات مع تعزيز الطاقة في جدة والرياض.",
    severity: "medium",
    activeAlerts: 5,
    operatingAirportSlugs: [
      "jeddah",
      "riyadh",
      "dammam",
      "dubai",
      "cairo",
      "istanbul",
      "london",
    ],
    searchTerms: ["saudia", "السعودية", "الخطوط السعودية", "sv", "saudi"],
    overviewAr:
      "الناقلة الوطنية للمملكة العربية السعودية، محور أساسي لرحلات الحج والعمرة والربط بين الخليج ومصر وأوروبا.",
    relatedSlugs: ["flynas", "egyptair", "emirates"],
  },
  flynas: {
    slug: "flynas",
    code: "XY",
    nameAr: "طيران ناس",
    nameEn: "flynas",
    countryAr: "المملكة العربية السعودية",
    countryEn: "Saudi Arabia",
    statusAr: "تشغيل جيد",
    statusDetailAr: "شبكة اقتصادية قوية من الرياض وجدة مع تأخيرات محدودة.",
    severity: "low",
    activeAlerts: 3,
    operatingAirportSlugs: [
      "riyadh",
      "jeddah",
      "dammam",
      "dubai",
      "cairo",
      "istanbul",
      "kuwait-city",
    ],
    searchTerms: ["flynas", "ناس", "nas", "xy"],
    overviewAr:
      "ناقلة اقتصادية سعودية تربط المملكة بالخليج ومصر وتركيا وآسيا، خيار شائع للشباب والعائلات العربية.",
    relatedSlugs: ["saudia", "flydubai", "air-arabia"],
  },
  "kuwait-airways": {
    slug: "kuwait-airways",
    code: "KU",
    nameAr: "الخطوط الجوية الكويتية",
    nameEn: "Kuwait Airways",
    countryAr: "الكويت",
    countryEn: "Kuwait",
    statusAr: "تشغيل طبيعي",
    statusDetailAr: "ربط مستقر مع الخليج والهند وأوروبا من مطار الكويت.",
    severity: "low",
    activeAlerts: 2,
    operatingAirportSlugs: [
      "kuwait-city",
      "dubai",
      "doha",
      "cairo",
      "london",
      "istanbul",
      "jeddah",
    ],
    searchTerms: ["kuwait airways", "الكويتية", "kuwait", "ku"],
    overviewAr:
      "الناقلة الوطنية للكويت، تخدم الجالية الكويتية والمسافرين العرب بوجهات في الخليج ومصر وأوروبا.",
    relatedSlugs: ["gulf-air", "qatar-airways", "emirates"],
  },
  "gulf-air": {
    slug: "gulf-air",
    code: "GF",
    nameAr: "طيران الخليج",
    nameEn: "Gulf Air",
    countryAr: "البحرين",
    countryEn: "Bahrain",
    statusAr: "تشغيل مستقر",
    statusDetailAr: "محور المنامة يربط الخليج بسلاسة مع رحلات منتظمة.",
    severity: "low",
    activeAlerts: 2,
    operatingAirportSlugs: [
      "bahrain",
      "dubai",
      "doha",
      "jeddah",
      "cairo",
      "amman",
    ],
    searchTerms: ["gulf air", "طيران الخليج", "الخليج", "gf"],
    overviewAr:
      "ناقلة البحرين الوطنية، تربط دول الخليج ببعضها وبمصر والأردن، وتُعرف بخدمة عائلية مناسبة للمسافرين العرب.",
    relatedSlugs: ["kuwait-airways", "oman-air", "qatar-airways"],
  },
  "oman-air": {
    slug: "oman-air",
    code: "WY",
    nameAr: "الطيران العُماني",
    nameEn: "Oman Air",
    countryAr: "سلطنة عُمان",
    countryEn: "Oman",
    statusAr: "تشغيل ممتاز",
    statusDetailAr: "تجربة سفر هادئة من مسقط مع اتصال جيد بالهند وأوروبا.",
    severity: "low",
    activeAlerts: 1,
    operatingAirportSlugs: [
      "muscat",
      "dubai",
      "doha",
      "cairo",
      "london",
      "bangkok",
    ],
    searchTerms: ["oman air", "العمانية", "عمان", "wy", "oman"],
    overviewAr:
      "الناقلة الوطنية لعُمان، تقدم جودة خدمة مرتفعة وربطاً مريحاً بين الخليج والهند وأوروبا لمسافرين عرب ودوليين.",
    relatedSlugs: ["gulf-air", "emirates", "qatar-airways"],
  },
  "royal-jordanian": {
    slug: "royal-jordanian",
    code: "RJ",
    nameAr: "الملكية الأردنية",
    nameEn: "Royal Jordanian",
    countryAr: "الأردن",
    countryEn: "Jordan",
    statusAr: "تشغيل طبيعي",
    statusDetailAr: "ربط عمّان بالخليج ومصر وأوروبا مع جدول منتظم.",
    severity: "low",
    activeAlerts: 2,
    operatingAirportSlugs: [
      "amman",
      "dubai",
      "doha",
      "cairo",
      "jeddah",
      "beirut",
      "istanbul",
    ],
    searchTerms: ["royal jordanian", "الملكية الأردنية", "jordanian", "rj"],
    overviewAr:
      "الناقلة الوطنية للأردن، محور مهم للمسافرين العرب بين الشام والخليج ومصر وأوروبا.",
    relatedSlugs: ["mea", "egyptair", "qatar-airways"],
  },
  mea: {
    slug: "mea",
    code: "ME",
    nameAr: "طيران الشرق الأوسط",
    nameEn: "Middle East Airlines",
    countryAr: "لبنان",
    countryEn: "Lebanon",
    statusAr: "تشغيل بحذر",
    statusDetailAr: "مراقبة مستمرة للجدول مع تركيز على رحلات الخليج وأوروبا.",
    severity: "medium",
    activeAlerts: 3,
    operatingAirportSlugs: [
      "beirut",
      "dubai",
      "doha",
      "riyadh",
      "cairo",
      "paris",
    ],
    searchTerms: [
      "mea",
      "middle east airlines",
      "الشرق الأوسط",
      "طيران الشرق الأوسط",
      "لبنان",
    ],
    overviewAr:
      "الناقلة الوطنية للبنان، تربط بيروت بالخليج ومصر وأوروبا، وتظل خياراً مألوفاً للجاليات العربية.",
    relatedSlugs: ["royal-jordanian", "air-france", "qatar-airways"],
  },
  egyptair: {
    slug: "egyptair",
    code: "MS",
    nameAr: "مصر للطيران",
    nameEn: "EgyptAir",
    countryAr: "مصر",
    countryEn: "Egypt",
    statusAr: "ازدحام في الذروة",
    statusDetailAr:
      "ضغط على صالات القاهرة مع الحفاظ على تغطية واسعة للخليج وأوروبا.",
    severity: "medium",
    activeAlerts: 4,
    operatingAirportSlugs: [
      "cairo",
      "alexandria",
      "jeddah",
      "dubai",
      "doha",
      "london",
      "frankfurt",
    ],
    searchTerms: ["egyptair", "مصر للطيران", "مصر", "ms"],
    overviewAr:
      "الناقلة الوطنية لمصر، محور أساسي للمصريين والعرب بين أوروبا والخليج وأفريقيا وآسيا.",
    relatedSlugs: ["royal-jordanian", "saudia", "turkish-airlines"],
  },
  "turkish-airlines": {
    slug: "turkish-airlines",
    code: "TK",
    nameAr: "الخطوط الجوية التركية",
    nameEn: "Turkish Airlines",
    countryAr: "تركيا",
    countryEn: "Turkey",
    statusAr: "ترانزيت مكثف",
    statusDetailAr:
      "ضغط على صالات إسطنبول مع إدارة جيدة لرحلات الترانزيت نحو آسيا وأوروبا.",
    severity: "medium",
    activeAlerts: 4,
    operatingAirportSlugs: [
      "istanbul",
      "sabiha",
      "dubai",
      "cairo",
      "jeddah",
      "kuala-lumpur",
      "riyadh",
    ],
    searchTerms: [
      "turkish",
      "turkish airlines",
      "الخطوط التركية",
      "التركية",
      "tk",
    ],
    overviewAr:
      "أكبر ناقلة تركية ومحور عالمي للمسافرين العرب عبر إسطنبول نحو مئات الوجهات في أوروبا وآسيا وأفريقيا.",
    relatedSlugs: ["pegasus", "lufthansa", "emirates"],
  },
  pegasus: {
    slug: "pegasus",
    code: "PC",
    nameAr: "طيران بيغاسوس",
    nameEn: "Pegasus Airlines",
    countryAr: "تركيا",
    countryEn: "Turkey",
    statusAr: "تشغيل اقتصادي نشط",
    statusDetailAr: "محور صبيحة مع رحلات اقتصادية مكثفة نحو الخليج ومصر.",
    severity: "low",
    activeAlerts: 3,
    operatingAirportSlugs: [
      "sabiha",
      "dubai",
      "cairo",
      "jeddah",
      "riyadh",
      "amman",
    ],
    searchTerms: ["pegasus", "بيغاسوس", "pc"],
    overviewAr:
      "ناقلة اقتصادية تركية تربط صبيحة كوكجن بالخليج ومصر والأردن بأسعار مناسبة للمسافرين العرب.",
    relatedSlugs: ["turkish-airlines", "flynas", "saudia"],
  },
  lufthansa: {
    slug: "lufthansa",
    code: "LH",
    nameAr: "لوفتهانزا",
    nameEn: "Lufthansa",
    countryAr: "ألمانيا",
    countryEn: "Germany",
    statusAr: "قيود موسمية",
    statusDetailAr:
      "تأخيرات محدودة على بعض المسارات الطويلة بين فرانكفورت والشرق الأوسط.",
    severity: "medium",
    activeAlerts: 3,
    operatingAirportSlugs: [
      "frankfurt",
      "milan",
      "dubai",
      "cairo",
      "jeddah",
      "riyadh",
      "istanbul",
    ],
    searchTerms: ["lufthansa", "لوفتهانزا", "lh", "ألمانيا"],
    overviewAr:
      "ناقلة ألمانية رائدة ضمن مجموعة لوفتهانزا، تربط أوروبا بالخليج ومصر عبر فرانكفورت وميونخ.",
    relatedSlugs: ["british-airways", "air-france", "turkish-airlines"],
  },
  "british-airways": {
    slug: "british-airways",
    code: "BA",
    nameAr: "بريتيش إيرويز",
    nameEn: "British Airways",
    countryAr: "المملكة المتحدة",
    countryEn: "United Kingdom",
    statusAr: "تشغيل طبيعي",
    statusDetailAr:
      "هيثرو يشهد ازدحاماً موسمياً مع الحفاظ على رحلات منتظمة نحو الخليج.",
    severity: "medium",
    activeAlerts: 3,
    operatingAirportSlugs: [
      "london",
      "dubai",
      "doha",
      "cairo",
      "muscat",
      "riyadh",
    ],
    searchTerms: ["british airways", "بريتيش", "ba", "هيثرو"],
    overviewAr:
      "الناقلة الوطنية للمملكة المتحدة، خيار شائع للمسافرين العرب نحو لندن وأمريكا الشمالية عبر هيثرو.",
    relatedSlugs: ["air-france", "lufthansa", "emirates"],
  },
  "air-france": {
    slug: "air-france",
    code: "AF",
    nameAr: "الخطوط الجوية الفرنسية",
    nameEn: "Air France",
    countryAr: "فرنسا",
    countryEn: "France",
    statusAr: "تشغيل مستقر",
    statusDetailAr: "ربط شارل دو غول بالمغرب العربي والشرق الأوسط بانتظام.",
    severity: "low",
    activeAlerts: 2,
    operatingAirportSlugs: [
      "paris",
      "dubai",
      "cairo",
      "jeddah",
      "amman",
      "beirut",
    ],
    searchTerms: ["air france", "إير فرانس", "الفرنسية", "af"],
    overviewAr:
      "الناقلة الوطنية لفرنسا، تربط باريس بالعالم العربي عبر رحلات مباشرة وشبكة شراكات واسعة.",
    relatedSlugs: ["british-airways", "lufthansa", "mea"],
  },
};

const codeToSlug: Record<string, string> = Object.fromEntries(
  Object.values(airlinesCatalog).map((a) => [a.code.toUpperCase(), a.slug]),
);

export function getAllAirlineSlugs(): string[] {
  return Object.keys(airlinesCatalog);
}

export function getAirlineBySlug(slug: string): AirlineDefinition | null {
  return airlinesCatalog[slug] ?? null;
}

export function getAirlineSlugByCode(code: string): string | null {
  return codeToSlug[code.toUpperCase()] ?? null;
}

export function getFeaturedAirlines(): AirlineDefinition[] {
  return getAllAirlineSlugs()
    .map((slug) => airlinesCatalog[slug])
    .sort((a, b) => a.nameAr.localeCompare(b.nameAr, "ar"));
}

export function getRelatedAirlines(
  slug: string,
  limit = 3,
): AirlineDefinition[] {
  const airline = getAirlineBySlug(slug);
  if (!airline) return [];

  return airline.relatedSlugs
    .slice(0, limit)
    .map((relatedSlug) => airlinesCatalog[relatedSlug])
    .filter(Boolean);
}

export function getAirlinePagePaths(): string[] {
  return getAllAirlineSlugs().map((slug) => `/airline/${slug}`);
}
