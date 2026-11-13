import { NextResponse } from "next/server";
import { applyDemoDefaults, inspectEnv } from "@/lib/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  applyDemoDefaults();
  const report = inspectEnv();
  return NextResponse.json({
    ok: report.summary.missingRequired === 0,
    ...report,
    note: "Values are never exposed — only set/unset flags",
    timestamp: new Date().toISOString(),
  });
}
