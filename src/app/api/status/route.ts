import { NextResponse } from "next/server";
import { buildReport, runProcessChecks, runDependencyChecks } from "@/lib/health";
import { listModules } from "@/lib/modules-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
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
    deployment: {
      vercel: !!process.env.VERCEL,
      env: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "development",
      region: process.env.VERCEL_REGION ?? null,
      url: process.env.VERCEL_URL ?? null,
    },
    timestamp: new Date().toISOString(),
  });
}
