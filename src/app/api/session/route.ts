import { NextResponse } from "next/server";
import manifest from "@/data/fleet-connection-manifest.json";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const HEADERS = {
  "Cache-Control": "no-store",
  "X-Fleet-Bound": "testdebug",
};

export async function GET() {
  const m = manifest as any;
  return NextResponse.json(
    {
      ok: true,
      service: "testdebug",
      endpoint: "/api/session",
      session_id: m.session?.session_id,
      hostname: m.session?.hostname,
      sandbox_id: m.session?.sandbox_id,
      chain_length: Array.isArray(m.session_history_chain)
        ? m.session_history_chain.length
        : 0,
      is_sandbox_selectable: m.sandbox?.is_sandbox_selectable ?? "on",
      fleet_live: m.fleet_project?.live_url,
      strand_live: m.continuity_keys_merged?.["strand.live_base"],
      drive_handoff: m.continuity_keys_merged?.["drive.latest_audit"],
      apk_session_route: m.apk_deeplinks?.session_route,
    },
    { status: 200, headers: HEADERS }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: { Allow: "GET, OPTIONS", ...HEADERS },
  });
}
