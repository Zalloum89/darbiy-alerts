import type { AlertSeverity } from "@/app/components/dashboard/mock-data";

export type AirportAirline = {
  code: string;
  name: string;
  flights: number;
  status: string;
};

/** Strategic importance for Arab travelers (display + sorting). */
export type AirportImportance = "global_hub" | "regional_hub" | "destination";

export const importanceLabelAr: Record<AirportImportance, string> = {
  global_hub: "محور عالمي",
  regional_hub: "محور إقليمي",
  destination: "وجهة شائعة",
};

export const importanceBadgeClass: Record<AirportImportance, string> = {
  global_hub: "bg-indigo-50 text-indigo-800 ring-indigo-200",
  regional_hub: "bg-sky-50 text-sky-800 ring-sky-200",
  destination: "bg-slate-100 text-slate-700 ring-slate-200",
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
  importance: AirportImportance;
  activeAlerts: number;
  airlines: AirportAirline[];
  /** Terms used to match live alerts (departure/arrival). */
  searchTerms: string[];
  description: string;
  /** Slugs of related hubs for internal linking. */
  relatedSlugs: string[];
};

const hub = (
  code: string,
  name: string,
  flights: number,
  status: string,
): AirportAirline => ({ code, name, flights, status });

export const airportsCatalog: Record<string, AirportDefinition> = {
  // ——— الخليج ———
  dubai: {
    slug: "dubai",
    code: "DXB",
    nameAr: "مطار دبي الدولي",
    nameEn: "Dubai International Airport",
    cityAr: "دبي",
    countryAr: "الإمارات العربية المتحدة",
    countryEn: "United Arab Emirates",
    statusAr: "تأخيرات تشغيلية خفيفة",
    statusDetailAr:
      "ازدحام متوسط على بعض الممرات مع تأخيرات مغادرة محدودة في الذروة.",
    severity: "medium",
    importance: "global_hub",
    activeAlerts: 6,
    searchTerms: ["دبي", "dubai", "dxb", "dubai international"],
    relatedSlugs: ["abu-dhabi", "doha", "istanbul", "jeddah"],
    description:
      "أكثر مطارات العالم ازدحاماً ومحور رئيسي للمسافرين العرب نحو آسيا وأوروبا وأمريكا.",
    airlines: [
      hub("EK", "طيران الإمارات", 142, "تشغيل طبيعي"),
      hub("FZ", "فلاي دبي", 68, "تأخيرات خفيفة"),
      hub("QR", "الخطوط القطرية", 24, "في الموعد"),
    ],
  },
  "abu-dhabi": {
    slug: "abu-dhabi",
    code: "AUH",
    nameAr: "مطار أبوظبي الدولي",
    nameEn: "Abu Dhabi International Airport",
    cityAr: "أبوظبي",
    countryAr: "الإمارات العربية المتحدة",
    countryEn: "United Arab Emirates",
    statusAr: "تشغيل مستقر",
    statusDetailAr: "حركة انسيابية مع مراقبة ذروة المسافرين نحو آسيا والهند.",
    severity: "low",
    importance: "regional_hub",
    activeAlerts: 2,
    searchTerms: ["أبوظبي", "abu dhabi", "auh", "zayed"],
    relatedSlugs: ["dubai", "doha", "muscat", "jeddah"],
    description:
      "محور إماراتي مهم للرحلات الطويلة وشركات الطيران الوطنية والدولية.",
    airlines: [
      hub("EY", "الاتحاد للطيران", 88, "تشغيل طبيعي"),
      hub("EK", "طيران الإمارات", 12, "تشغيل طبيعي"),
      hub("W6", "ويز إير أبوظبي", 22, "في الموعد"),
    ],
  },
  sharjah: {
    slug: "sharjah",
    code: "SHJ",
    nameAr: "مطار الشارقة الدولي",
    nameEn: "Sharjah International Airport",
    cityAr: "الشارقة",
    countryAr: "الإمارات العربية المتحدة",
    countryEn: "United Arab Emirates",
    statusAr: "تشغيل طبيعي",
    statusDetailAr: "مطار منخفض التكلفة نشط مع رحلات إلى جنوب آسيا والشرق الأوسط.",
    severity: "low",
    importance: "destination",
    activeAlerts: 1,
    searchTerms: ["الشارقة", "sharjah", "shj"],
    relatedSlugs: ["dubai", "abu-dhabi", "muscat"],
    description: "بوابة اقتصادية للمسافرين العرب نحو الهند وباكستان ودول الخليج.",
    airlines: [
      hub("G9", "العربية للطيران", 56, "تشغيل طبيعي"),
      hub("FZ", "فلاي دبي", 8, "في الموعد"),
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
    statusAr: "تشغيل ممتاز",
    statusDetailAr: "بنية حديثة وترانزيت سلس نحو آسيا وأفريقيا وأوروبا.",
    severity: "low",
    importance: "global_hub",
    activeAlerts: 2,
    searchTerms: ["الدوحة", "doha", "doh", "قطر", "hamad"],
    relatedSlugs: ["dubai", "jeddah", "istanbul", "kuwait-city"],
    description: "من أفضل مطارات العالم للترانزيت ووجهة مفضلة للمسافرين من الخليج والشام.",
    airlines: [
      hub("QR", "الخطوط القطرية", 118, "في الموعد"),
      hub("EK", "طيران الإمارات", 14, "تشغيل طبيعي"),
    ],
  },
  riyadh: {
    slug: "riyadh",
    code: "RUH",
    nameAr: "مطار الملك خالد الدولي",
    nameEn: "King Khalid International Airport",
    cityAr: "الرياض",
    countryAr: "المملكة العربية السعودية",
    countryEn: "Saudi Arabia",
    statusAr: "ازدحام متقطع",
    statusDetailAr: "ذروة على الرحلات الداخلية والخليجية صباحاً وأول المساء.",
    severity: "medium",
    importance: "regional_hub",
    activeAlerts: 4,
    searchTerms: ["الرياض", "riyadh", "ruh", "الملك خالد"],
    relatedSlugs: ["jeddah", "dammam", "dubai", "doha"],
    description: "البوابة الجوية للعاصمة السعودية وربط واسع بالخليج ومصر وتركيا.",
    airlines: [
      hub("SV", "السعودية", 94, "تأخيرات خفيفة"),
      hub("F3", "طيران أديل", 42, "تشغيل طبيعي"),
      hub("XY", "طيران ناس", 36, "في الموعد"),
    ],
  },
  jeddah: {
    slug: "jeddah",
    code: "JED",
    nameAr: "مطار الملك عبدالعزيز الدولي",
    nameEn: "King Abdulaziz International Airport",
    cityAr: "جدة",
    countryAr: "المملكة العربية السعودية",
    countryEn: "Saudi Arabia",
    statusAr: "أعمال تطوير جزئية",
    statusDetailAr: "بعض بوابات الصالة مع إرشادات واضحة للحج والعمرة والرحلات الدولية.",
    severity: "medium",
    importance: "global_hub",
    activeAlerts: 5,
    searchTerms: ["جدة", "jeddah", "jed", "makkah", "مكة"],
    relatedSlugs: ["riyadh", "cairo", "dubai", "istanbul"],
    description: "بوابة الحج والعمرة والساحل الغربي، ومحور مهم للمسافرين العرب.",
    airlines: [
      hub("SV", "السعودية", 102, "تشغيل طبيعي"),
      hub("XY", "طيران ناس", 48, "في الموعد"),
      hub("EK", "طيران الإمارات", 16, "تأخيرات"),
    ],
  },
  dammam: {
    slug: "dammam",
    code: "DMM",
    nameAr: "مطار الملك فهد الدولي",
    nameEn: "King Fahd International Airport",
    cityAr: "الدمام",
    countryAr: "المملكة العربية السعودية",
    countryEn: "Saudi Arabia",
    statusAr: "تشغيل طبيعي",
    statusDetailAr: "حركة مستقرة مع رحلات خليجية وآسيوية منتظمة.",
    severity: "low",
    importance: "regional_hub",
    activeAlerts: 2,
    searchTerms: ["الدمام", "dammam", "dmm", "الشرقية"],
    relatedSlugs: ["riyadh", "kuwait-city", "bahrain", "dubai"],
    description: "خدمة المنطقة الشرقية والربط مع الخليج والهند.",
    airlines: [
      hub("SV", "السعودية", 52, "تشغيل طبيعي"),
      hub("XY", "طيران ناس", 28, "في الموعد"),
    ],
  },
  "kuwait-city": {
    slug: "kuwait-city",
    code: "KWI",
    nameAr: "مطار الكويت الدولي",
    nameEn: "Kuwait International Airport",
    cityAr: "الكويت",
    countryAr: "الكويت",
    countryEn: "Kuwait",
    statusAr: "تشغيل مستقر",
    statusDetailAr: "صالات محدثة مع ازدحام خفيف في أوقات العطلات.",
    severity: "low",
    importance: "regional_hub",
    activeAlerts: 2,
    searchTerms: ["الكويت", "kuwait", "kwi"],
    relatedSlugs: ["dubai", "doha", "riyadh", "bahrain"],
    description: "محور مهم للعائلات الكويتية والربط مع مصر والأردن وتركيا.",
    airlines: [
      hub("KU", "الكويتية", 44, "تشغيل طبيعي"),
      hub("J9", "طيران الجزيرة", 32, "في الموعد"),
    ],
  },
  bahrain: {
    slug: "bahrain",
    code: "BAH",
    nameAr: "مطار البحرين الدولي",
    nameEn: "Bahrain International Airport",
    cityAr: "المنامة",
    countryAr: "البحرين",
    countryEn: "Bahrain",
    statusAr: "تشغيل طبيعي",
    statusDetailAr: "مطار مدمج سريع الانتقال مع اتصال ممتاز بالخليج.",
    severity: "low",
    importance: "destination",
    activeAlerts: 1,
    searchTerms: ["البحرين", "bahrain", "bah", "المنامة", "manama"],
    relatedSlugs: ["doha", "dammam", "dubai", "kuwait-city"],
    description: "وجهة عمل وسياحة قصيرة للمسافرين من السعودية والخليج.",
    airlines: [
      hub("GF", "طيران الخليج", 38, "تشغيل طبيعي"),
      hub("EK", "طيران الإمارات", 6, "في الموعد"),
    ],
  },
  muscat: {
    slug: "muscat",
    code: "MCT",
    nameAr: "مطار مسقط الدولي",
    nameEn: "Muscat International Airport",
    cityAr: "مسقط",
    countryAr: "سلطنة عُمان",
    countryEn: "Oman",
    statusAr: "تشغيل ممتاز",
    statusDetailAr: "تجربة سفر هادئة مع رحلات إلى الهند وشرق أفريقيا.",
    severity: "low",
    importance: "regional_hub",
    activeAlerts: 1,
    searchTerms: ["مسقط", "muscat", "mct", "عمان", "oman"],
    relatedSlugs: ["dubai", "abu-dhabi", "doha", "jeddah"],
    description: "بوابة عُمان الحديثة ومحبوبة للمسافرين العرب الباحثين عن رحلات مريحة.",
    airlines: [
      hub("WY", "العُمانية", 34, "تشغيل طبيعي"),
      hub("EK", "طيران الإمارات", 10, "في الموعد"),
    ],
  },

  // ——— الشام ومصر ———
  amman: {
    slug: "amman",
    code: "AMM",
    nameAr: "مطار الملكة علياء الدولي",
    nameEn: "Queen Alia International Airport",
    cityAr: "عمّان",
    countryAr: "الأردن",
    countryEn: "Jordan",
    statusAr: "تشغيل طبيعي",
    statusDetailAr: "ربط قوي مع الخليج وتركيا وأوروبا الشرقية.",
    severity: "low",
    importance: "regional_hub",
    activeAlerts: 2,
    searchTerms: ["عمان", "amman", "amm", "الأردن", "jordan"],
    relatedSlugs: ["beirut", "cairo", "dubai", "istanbul"],
    description: "البوابة الرئيسية للأردن ومحطة مفضلة للجالية العربية.",
    airlines: [
      hub("RJ", "الملكية الأردنية", 28, "تشغيل طبيعي"),
      hub("EK", "طيران الإمارات", 8, "في الموعد"),
    ],
  },
  beirut: {
    slug: "beirut",
    code: "BEY",
    nameAr: "مطار رفيق الحريري الدولي",
    nameEn: "Beirut–Rafic Hariri International Airport",
    cityAr: "بيروت",
    countryAr: "لبنان",
    countryEn: "Lebanon",
    statusAr: "تشغيل بحذر",
    statusDetailAr: "مراقبة مستمرة للوضع التشغيلي مع رحلات منتظمة نحو الخليج.",
    severity: "medium",
    importance: "destination",
    activeAlerts: 3,
    searchTerms: ["بيروت", "beirut", "bey", "لبنان"],
    relatedSlugs: ["amman", "cairo", "istanbul", "dubai"],
    description: "وجهة ثقافية وتجارية مهمة للجاليات العربية في الخليج.",
    airlines: [
      hub("ME", "طيران الشرق الأوسط", 18, "تشغيل طبيعي"),
      hub("QR", "الخطوط القطرية", 6, "في الموعد"),
    ],
  },
  cairo: {
    slug: "cairo",
    code: "CAI",
    nameAr: "مطار القاهرة الدولي",
    nameEn: "Cairo International Airport",
    cityAr: "القاهرة",
    countryAr: "مصر",
    countryEn: "Egypt",
    statusAr: "ازدحام في الذروة",
    statusDetailAr: "ضغط على صالات السفر مع إبقاء الرحلات الإقليمية في الموعد غالباً.",
    severity: "medium",
    importance: "global_hub",
    activeAlerts: 7,
    searchTerms: ["القاهرة", "cairo", "cai", "مصر", "egypt"],
    relatedSlugs: ["jeddah", "dubai", "istanbul", "alexandria"],
    description: "أكبر محور جوي في شمال أفريقيا ووجهة أساسية للمصريين والعرب.",
    airlines: [
      hub("MS", "مصر للطيران", 112, "تأخيرات خفيفة"),
      hub("SM", "إير كايرو", 24, "تشغيل طبيعي"),
      hub("EK", "طيران الإمارات", 14, "في الموعد"),
    ],
  },
  alexandria: {
    slug: "alexandria",
    code: "HBE",
    nameAr: "مطار برج العرب الدولي",
    nameEn: "Borg El Arab International Airport",
    cityAr: "الإسكندرية",
    countryAr: "مصر",
    countryEn: "Egypt",
    statusAr: "تشغيل طبيعي",
    statusDetailAr: "بديل مريح للقاهرة لرحلات المتوسط وأوروبا.",
    severity: "low",
    importance: "destination",
    activeAlerts: 2,
    searchTerms: ["الإسكندرية", "alexandria", "hbe", "برج العرب", "borg el arab"],
    relatedSlugs: ["cairo", "jeddah", "istanbul", "dubai"],
    description: "خدمة الساحل الشمالي ورحلات شarter واقتصادية للمسافرين العرب.",
    airlines: [
      hub("MS", "مصر للطيران", 18, "تشغيل طبيعي"),
      hub("SM", "إير كايرو", 12, "في الموعد"),
    ],
  },

  // ——— أوروبا ———
  istanbul: {
    slug: "istanbul",
    code: "IST",
    nameAr: "مطار إسطنبول",
    nameEn: "Istanbul Airport",
    cityAr: "إسطنبول",
    countryAr: "تركيا",
    countryEn: "Turkey",
    statusAr: "ازدحام متوسط",
    statusDetailAr: "ضغط على الترانزيت الأوروبي مع إدارة جيدة للمواسم.",
    severity: "medium",
    importance: "global_hub",
    activeAlerts: 4,
    searchTerms: ["istanbul", "إسطنبول", "اسطنبول", "ist", "istanbul airport"],
    relatedSlugs: ["dubai", "cairo", "london", "sabiha"],
    description: "أكبر محور تركي ومحبوب جداً للمسافرين العرب للترانزيت والسياحة.",
    airlines: [
      hub("TK", "الخطوط التركية", 186, "تأخيرات محدودة"),
      hub("PC", "بيغاسوس", 54, "تشغيل طبيعي"),
      hub("EK", "طيران الإمارات", 18, "في الموعد"),
    ],
  },
  sabiha: {
    slug: "sabiha",
    code: "SAW",
    nameAr: "مطار صبيحة كوكجن الدولي",
    nameEn: "Istanbul Sabiha Gökçen International Airport",
    cityAr: "إسطنبول",
    countryAr: "تركيا",
    countryEn: "Turkey",
    statusAr: "تشغيل نشط",
    statusDetailAr: "محور لطيران الاقتصاد ووجهات آسيا الوسطى والشرق الأوسط.",
    severity: "medium",
    importance: "regional_hub",
    activeAlerts: 3,
    searchTerms: ["sabiha", "saw", "صبيحة", "gokcen", "اسطنبول اسيا"],
    relatedSlugs: ["istanbul", "dubai", "cairo", "frankfurt"],
    description: "خيار ممتاز للمسافرين العرب من طيران الاقتصاد وشركات المنطقة.",
    airlines: [
      hub("PC", "بيغاسوس", 78, "تشغيل طبيعي"),
      hub("TK", "الخطوط التركية", 22, "في الموعد"),
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
    statusAr: "قيود سعة",
    statusDetailAr: "تأخيرات موسمية على الرحلات الطويلة وخاصة نحو الخليج.",
    severity: "high",
    importance: "global_hub",
    activeAlerts: 5,
    searchTerms: ["london", "لندن", "heathrow", "lhr"],
    relatedSlugs: ["dubai", "paris", "frankfurt", "cairo"],
    description: "بوابة المملكة المتحدة الرئيسية ووجهة دراسة وعمل للعرب.",
    airlines: [
      hub("BA", "بريتيش إيرويز", 96, "تأخيرات"),
      hub("VS", "فيرجن أتلانتيك", 32, "تشغيل طبيعي"),
      hub("EK", "طيران الإمارات", 12, "متأخرة"),
    ],
  },
  paris: {
    slug: "paris",
    code: "CDG",
    nameAr: "مطار باريس شارل دو غول",
    nameEn: "Paris Charles de Gaulle Airport",
    cityAr: "باريس",
    countryAr: "فرنسا",
    countryEn: "France",
    statusAr: "تشغيل طبيعي",
    statusDetailAr: "ربط ممتاز بشمال أفريقيا والخليج عبر شركات كبرى.",
    severity: "low",
    importance: "global_hub",
    activeAlerts: 3,
    searchTerms: ["paris", "باريس", "cdg", "charles de gaulle"],
    relatedSlugs: ["london", "frankfurt", "cairo", "istanbul"],
    description: "وجهة سياحة وتعليم شائعة جداً للمسافرين العرب من المغرب العربي والشرق.",
    airlines: [
      hub("AF", "الخطوط الجوية الفرنسية", 72, "تشغيل طبيعي"),
      hub("EK", "طيران الإمارات", 10, "في الموعد"),
    ],
  },
  frankfurt: {
    slug: "frankfurt",
    code: "FRA",
    nameAr: "مطار فرانكفورت",
    nameEn: "Frankfurt Airport",
    cityAr: "فرانكفورت",
    countryAr: "ألمانيا",
    countryEn: "Germany",
    statusAr: "تشغيل مستقر",
    statusDetailAr: "محور لوفتهانزا مع ترانزيت سريع نحو الشرق الأوسط.",
    severity: "low",
    importance: "global_hub",
    activeAlerts: 3,
    searchTerms: ["frankfurt", "فرانكفورت", "fra", "ألمانيا"],
    relatedSlugs: ["istanbul", "milan", "dubai", "paris"],
    description: "نقطة عبور أوروبية رئيسية للمسافرين العرب نحو الأمريكتين وأوروبا.",
    airlines: [
      hub("LH", "لوفتهانزا", 84, "تشغيل طبيعي"),
      hub("EK", "طيران الإمارات", 8, "في الموعد"),
    ],
  },
  milan: {
    slug: "milan",
    code: "MXP",
    nameAr: "مطار مالبينسا",
    nameEn: "Milan Malpensa Airport",
    cityAr: "ميلانو",
    countryAr: "إيطاليا",
    countryEn: "Italy",
    statusAr: "تشغيل طبيعي",
    statusDetailAr: "وجهات شمال أفريقيا والشرق الأوسط بانتظام.",
    severity: "low",
    importance: "regional_hub",
    activeAlerts: 2,
    searchTerms: ["milan", "milano", "mxp", "مالبينسا", "ميلانو"],
    relatedSlugs: ["frankfurt", "istanbul", "cairo", "paris"],
    description: "بوابة شمال إيطاليا للتسوق والسياحة للعائلات العربية.",
    airlines: [
      hub("AZ", "إيطاليا للطيران", 28, "تشغيل طبيعي"),
      hub("EK", "طيران الإمارات", 6, "في الموعد"),
    ],
  },

  // ——— آسيا ———
  "kuala-lumpur": {
    slug: "kuala-lumpur",
    code: "KUL",
    nameAr: "مطار كوالالمبور الدولي",
    nameEn: "Kuala Lumpur International Airport",
    cityAr: "كوالالمبور",
    countryAr: "ماليزيا",
    countryEn: "Malaysia",
    statusAr: "تشغيل ممتاز",
    statusDetailAr: "ترانزيت مريح نحو أستراليا وجنوب شرق آسيا.",
    severity: "low",
    importance: "regional_hub",
    activeAlerts: 2,
    searchTerms: ["kuala lumpur", "كوالالمبور", "kul", "malaysia", "ماليزيا"],
    relatedSlugs: ["bangkok", "jakarta", "dubai", "jeddah"],
    description: "وجهة تعليم وسياحة شائعة جداً للمسافرين العرب من الخليج.",
    airlines: [
      hub("MH", "الخطوط الماليزية", 48, "تشغيل طبيعي"),
      hub("EK", "طيران الإمارات", 14, "في الموعد"),
    ],
  },
  bangkok: {
    slug: "bangkok",
    code: "BKK",
    nameAr: "مطار سوفارنابومي الدولي",
    nameEn: "Suvarnabhumi Airport",
    cityAr: "بانكوك",
    countryAr: "تايلاند",
    countryEn: "Thailand",
    statusAr: "ازدحام سياحي",
    statusDetailAr: "ذروة على الجوازات والأمتعة في موسم العطلات العربية.",
    severity: "medium",
    importance: "global_hub",
    activeAlerts: 4,
    searchTerms: ["bangkok", "بانكوك", "bkk", "suvarnabhumi", "تايلاند"],
    relatedSlugs: ["dubai", "kuala-lumpur", "jakarta", "jeddah"],
    description: "من أشهر وجهات السياحة للعائلات العربية في آسيا.",
    airlines: [
      hub("TG", "الخطوط التايلندية", 62, "تأخيرات خفيفة"),
      hub("EK", "طيران الإمارات", 18, "تشغيل طبيعي"),
    ],
  },
  jakarta: {
    slug: "jakarta",
    code: "CGK",
    nameAr: "مطار سوكارنو هاتا الدولي",
    nameEn: "Soekarno–Hatta International Airport",
    cityAr: "جاكرتا",
    countryAr: "إندونيسيا",
    countryEn: "Indonesia",
    statusAr: "تشغيل نشط",
    statusDetailAr: "مطار ضخم مع ازدحام على الطرق المؤدية في أوقات الذروة.",
    severity: "medium",
    importance: "regional_hub",
    activeAlerts: 3,
    searchTerms: ["jakarta", "جاكرتا", "cgk", "soekarno", "إندونيسيا"],
    relatedSlugs: ["kuala-lumpur", "bangkok", "dubai", "jeddah"],
    description: "بوابة إندونيسيا للحج والعمرة والعمل للجاليات العربية.",
    airlines: [
      hub("GA", "الخطوط الإندونيسية", 52, "تشغيل طبيعي"),
      hub("EK", "طيران الإمارات", 10, "في الموعد"),
    ],
  },
};

const IMPORTANCE_ORDER: Record<AirportImportance, number> = {
  global_hub: 0,
  regional_hub: 1,
  destination: 2,
};

export function getAllAirportSlugs(): string[] {
  return Object.keys(airportsCatalog);
}

export function getAirportBySlug(slug: string): AirportDefinition | null {
  return airportsCatalog[slug] ?? null;
}

const iataToAirportSlug = Object.fromEntries(
  Object.values(airportsCatalog).map((a) => [a.code.toUpperCase(), a.slug]),
);

export function getAirportByIata(
  iata: string | null | undefined,
): AirportDefinition | null {
  if (!iata) return null;
  const slug = iataToAirportSlug[iata.trim().toUpperCase()];
  return slug ? (airportsCatalog[slug] ?? null) : null;
}

/** Airports sorted for Arabic-first UI: global hubs first, then regional, then destinations. */
export function getFeaturedAirports(): AirportDefinition[] {
  return getAllAirportSlugs()
    .map((slug) => airportsCatalog[slug])
    .sort((a, b) => {
      const tier = IMPORTANCE_ORDER[a.importance] - IMPORTANCE_ORDER[b.importance];
      if (tier !== 0) return tier;
      return a.nameAr.localeCompare(b.nameAr, "ar");
    });
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
