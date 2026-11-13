import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "testdebug",
    timestamp: new Date().toISOString(),
    version: "0.1.0",
    uptime: process.uptime?.() ?? null,
    environment: process.env.NODE_ENV ?? "development",
  });
}
