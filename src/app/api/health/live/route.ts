import { NextResponse } from "next/server";
import { HEALTH_HEADERS } from "@/lib/health";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    {
      status: "alive",
      service: "testdebug",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    { status: 200, headers: HEALTH_HEADERS }
  );
}

export async function HEAD() {
  return new NextResponse(null, { status: 200, headers: HEALTH_HEADERS });
}
