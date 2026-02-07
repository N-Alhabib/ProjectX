import { NextResponse } from "next/server";

import { env } from "@/lib/env";

export function GET() {
  return NextResponse.json({
    status: "ok",
    eventStart: env.EVENT_START,
    eventEnd: env.EVENT_END,
    sessionDays: env.SESSION_DAYS,
  });
}
