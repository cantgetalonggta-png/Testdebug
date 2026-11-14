import { NextResponse } from "next/server";
import manifest from "@/data/fleet-connection-manifest.json";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const HEADERS = {
  "Cache-Control": "no-store",
  "X-Fleet-Bound": "testdebug",
  "X-Audit-Schema": "gta.grok.apk.deeplink_audit.v1",
};

export async function GET() {
  const body = {
    ok: true,
    service: "testdebug",
    endpoint: "/api/audit",
    merge_status: (manifest as any).merge_status ?? "COMPLETE",
    generated_at_utc: (manifest as any).generated_at_utc,
    fleet: (manifest as any).fleet_project,
    session: (manifest as any).session,
    sandbox: (manifest as any).sandbox,
    continuity_keys_merged: (manifest as any).continuity_keys_merged,
    apk_deeplinks: (manifest as any).apk_deeplinks,
    linked_assets: (manifest as any).linked_assets,
    chain_length: Array.isArray((manifest as any).session_history_chain)
      ? (manifest as any).session_history_chain.length
      : 0,
    security: (manifest as any).security,
    summary: (manifest as any).audit_dashboard?.summary_line,
  };
  return NextResponse.json(body, { status: 200, headers: HEADERS });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: { Allow: "GET, OPTIONS", ...HEADERS },
  });
}
