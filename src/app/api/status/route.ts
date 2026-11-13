import { NextResponse } from "next/server";
import { buildReport, runProcessChecks, runDependencyChecks } from "@/lib/health";
import { listModules } from "@/lib/modules-store";
import { applyDemoDefaults, inspectEnv } from "@/lib/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  applyDemoDefaults();
  const checks = [...(await runProcessChecks()), ...(await runDependencyChecks())];
  const health = buildReport(checks);
  const modules = listModules();
  return NextResponse.json({
    overall: health.status,
    health,
    modules: {
      count: modules.length,
      enabled: modules.filter((m) => m.enabled).length,
    },
    env: inspectEnv().summary,
    deployment: {
      vercel: !!process.env.VERCEL,
      env: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development",
      region: process.env.VERCEL_REGION ?? null,
      url: process.env.VERCEL_URL ?? null,
    },
    timestamp: new Date().toISOString(),
  });
}
