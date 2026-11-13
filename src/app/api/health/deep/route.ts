import { NextRequest, NextResponse } from "next/server";
import {
  buildReport,
  httpStatusFor,
  runProcessChecks,
  runDependencyChecks,
  HEALTH_HEADERS,
} from "@/lib/health";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const include = req.nextUrl.searchParams.get("include") ?? "all";
  const processChecks =
    include === "all" || include === "process" ? await runProcessChecks() : [];
  const depChecks =
    include === "all" || include === "deps" ? await runDependencyChecks() : [];
  const checks = [...processChecks, ...depChecks];
  const report = buildReport(checks);

  return NextResponse.json(
    {
      ...report,
      meta: {
        include,
        requestId: crypto.randomUUID(),
        path: "/api/health/deep",
      },
    },
    {
      status: httpStatusFor(report),
      headers: {
        ...HEALTH_HEADERS,
        "X-Health-Status": report.status,
        "X-Request-Id": crypto.randomUUID(),
      },
    }
  );
}
