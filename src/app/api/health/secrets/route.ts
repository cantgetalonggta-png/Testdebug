import { NextResponse } from "next/server";
import { inspectEnv } from "@/lib/env";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Presence-only secrets inventory for operators. Values never returned. */
export async function GET() {
  const inv = inspectEnv();
  const sensitiveGroups = new Set(["auth", "oauth", "data"]);
  const keys = inv.keys
    .filter((k) => sensitiveGroups.has(k.group) || /KEY|SECRET|TOKEN|JWT|PASSWORD/i.test(k.key))
    .map((k) => ({ key: k.key, group: k.group, set: k.set, required: k.required, description: k.description }));
  return NextResponse.json(
    {
      ok: true,
      endpoint: "/api/health/secrets",
      policy: "presence-only — values never included",
      summary: {
        total: keys.length,
        set: keys.filter((k) => k.set).length,
        missing: keys.filter((k) => !k.set).length,
      },
      keys,
    },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
