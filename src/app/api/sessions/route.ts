import { NextResponse } from "next/server";
import manifest from "@/data/fleet-connection-manifest.json";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Public session index for multi-session continuity.
 * Returns session IDs + hostnames from the bound fleet manifest.
 * NEVER returns secret values.
 */
export async function GET() {
  const m = manifest as any;
  const chain = Array.isArray(m.session_history_chain) ? m.session_history_chain : [];
  const sessions = chain.map((h: any, i: number) => ({
    index: i + 1,
    session_id: h.session_id,
    hostname: h.hostname,
    layout: h.cwd_layout ?? h.layout ?? null,
    generated_at_utc: h.generated_at_utc ?? null,
    note: h.note ?? null,
  }));
  return NextResponse.json(
    {
      ok: true,
      service: "testdebug",
      endpoint: "/api/sessions",
      count: sessions.length,
      current: m.session ?? null,
      sessions,
      how_to_call: "Use session_id with your APK deep-link or paste Drive audit handoff; secrets never travel in this API.",
      security: { secrets: false, redacted: true },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "X-Fleet-Bound": "testdebug",
      },
    }
  );
}
