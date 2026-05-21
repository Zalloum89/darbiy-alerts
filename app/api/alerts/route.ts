import { NextResponse } from "next/server";
import { getCachedAlertsResponse } from "@/app/lib/alerts-server-cache";

export async function GET() {
  const payload = await getCachedAlertsResponse();

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "private, no-store",
      "X-Alerts-Source": payload.meta.source,
      ...(payload.meta.last_real_update_at
        ? { "X-Alerts-Last-Real-Update": payload.meta.last_real_update_at }
        : {}),
    },
  });
}
