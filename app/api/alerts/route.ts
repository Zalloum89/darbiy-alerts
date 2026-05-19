import { NextResponse } from "next/server";

const alerts = [
  {
    airline: "طيران الإمارات",
    departure: "دبي",
    arrival: "لندن",
    status: "متأخرة",
  },
  {
    airline: "الخطوط القطرية",
    departure: "الدوحة",
    arrival: "باريس",
    status: "في الموعد",
  },
  {
    airline: "السعودية",
    departure: "جدة",
    arrival: "القاهرة",
    status: "ملغاة",
  },
  {
    airline: "Turkish Airlines",
    departure: "Istanbul",
    arrival: "Dubai",
    status: "Delayed",
  },
  {
    airline: "Lufthansa",
    departure: "Frankfurt",
    arrival: "Riyadh",
    status: "Scheduled",
  },
];

export async function GET() {
  return NextResponse.json(alerts);
}