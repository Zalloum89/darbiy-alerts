export type AlertSeverity = "high" | "medium" | "low";

export const navItems = [
  { id: "dashboard", label: "نظرة عامة", href: "#" },
  { id: "alerts", label: "التنبيهات المباشرة", href: "#alerts" },
  { id: "airports", label: "المطارات", href: "#airports" },
  { id: "airlines", label: "شركات الطيران", href: "#airlines" },
] as const;

export const stats = [
  {
    id: "active",
    label: "تنبيهات نشطة",
    value: "٢٤",
    change: "+٣",
    changeLabel: "خلال الساعة الأخيرة",
    trend: "up" as const,
  },
  {
    id: "airports",
    label: "مطارات متأثرة",
    value: "٢٣",
    change: "٥ عالية",
    changeLabel: "أولوية مرتفعة",
    trend: "neutral" as const,
  },
  {
    id: "airlines",
    label: "شركات طيران",
    value: "١٨",
    change: "-٢",
    changeLabel: "مقارنة بالأمس",
    trend: "down" as const,
  },
  {
    id: "coverage",
    label: "تغطية المنطقة",
    value: "٩٨٪",
    change: "+١٪",
    changeLabel: "شبكة المراقبة",
    trend: "up" as const,
  },
];

export const airports = [
  {
    id: "dxb",
    code: "DXB",
    name: "دبي الدولي",
    city: "الإمارات",
    status: "تأخيرات",
    alerts: 6,
    severity: "high" as AlertSeverity,
  },
  {
    id: "jed",
    code: "JED",
    name: "الملك عبدالعزيز",
    city: "جدة",
    status: "صيانة",
    alerts: 3,
    severity: "high" as AlertSeverity,
  },
  {
    id: "lhr",
    code: "LHR",
    name: "هيثرو",
    city: "لندن",
    status: "ازدحام",
    alerts: 4,
    severity: "medium" as AlertSeverity,
  },
  {
    id: "ruh",
    code: "RUH",
    name: "الملك خالد",
    city: "الرياض",
    status: "طبيعي",
    alerts: 1,
    severity: "low" as AlertSeverity,
  },
];

export const airlines = [
  {
    id: "ek",
    code: "EK",
    name: "طيران الإمارات",
    alerts: 2,
    status: "تنبيه تشغيلي",
    severity: "medium" as AlertSeverity,
  },
  {
    id: "qr",
    code: "QR",
    name: "الخطوط القطرية",
    alerts: 1,
    status: "تحديث سياسة",
    severity: "low" as AlertSeverity,
  },
  {
    id: "sv",
    code: "SV",
    name: "السعودية",
    alerts: 3,
    status: "تأخيرات محلية",
    severity: "high" as AlertSeverity,
  },
  {
    id: "ba",
    code: "BA",
    name: "بريتيش إيرويز",
    alerts: 2,
    status: "ازدحام مطار",
    severity: "medium" as AlertSeverity,
  },
];

export const severityStyles: Record<
  AlertSeverity,
  { badge: string; dot: string }
> = {
  high: {
    badge: "bg-rose-50 text-rose-700 ring-rose-200",
    dot: "bg-rose-500",
  },
  medium: {
    badge: "bg-amber-50 text-amber-800 ring-amber-200",
    dot: "bg-amber-500",
  },
  low: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    dot: "bg-emerald-500",
  },
};

export const severityLabel: Record<AlertSeverity, string> = {
  high: "عالي",
  medium: "متوسط",
  low: "منخفض",
};
