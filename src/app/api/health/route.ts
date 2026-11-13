import { NextResponse } from "next/server";
import {
  buildReport,
  httpStatusFor,
  runProcessChecks,
  runDependencyChecks,
  HEALTH_HEADERS,
} from "@/lib/health";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const checks = [
    ...(await runProcessChecks()),
    ...(await runDependencyChecks()),
  ];
  const report = buildReport(checks);
  return NextResponse.json(report, {
    status: httpStatusFor(report),
    headers: {
      ...HEALTH_HEADERS,
      "X-Health-Status": report.status,
    },
  });
}

export async function HEAD() {
  const checks = await runProcessChecks();
  const report = buildReport(checks);
  return new NextResponse(null, {
    status: httpStatusFor(report),
    headers: {
      ...HEALTH_HEADERS,
      "X-Health-Status": report.status,
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "GET, HEAD, OPTIONS",
      ...HEALTH_HEADERS,
    },
  });
}
