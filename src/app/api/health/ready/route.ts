import { NextResponse } from "next/server";
import {
  buildReport,
  runDependencyChecks,
  HEALTH_HEADERS,
} from "@/lib/health";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const checks = await runDependencyChecks();
  const report = buildReport(checks);
  const ready = report.status !== "error";
  return NextResponse.json(
    {
      readiness: ready ? "ready" : "not_ready",
      ready,
      healthStatus: report.status,
      service: report.service,
      version: report.version,
      timestamp: report.timestamp,
      uptime: report.uptime,
      environment: report.environment,
      region: report.region,
      checks: report.checks,
      summary: report.summary,
    },
    {
      status: ready ? 200 : 503,
      headers: {
        ...HEALTH_HEADERS,
        "X-Ready": ready ? "true" : "false",
      },
    }
  );
}

export async function HEAD() {
  const checks = await runDependencyChecks();
  const report = buildReport(checks);
  const ready = report.status !== "error";
  return new NextResponse(null, {
    status: ready ? 200 : 503,
    headers: {
      ...HEALTH_HEADERS,
      "X-Ready": ready ? "true" : "false",
    },
  });
}
