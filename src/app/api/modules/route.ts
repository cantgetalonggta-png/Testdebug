import { NextRequest, NextResponse } from "next/server";
import { listModules, toggleModule, setAll } from "@/lib/modules-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const modules = listModules();
  return NextResponse.json({
    modules,
    count: modules.length,
    enabled: modules.filter((m) => m.enabled).length,
    timestamp: new Date().toISOString(),
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    if (body?.action === "enable_all") {
      return NextResponse.json({ modules: setAll(true), ok: true });
    }
    if (body?.action === "disable_all") {
      return NextResponse.json({ modules: setAll(false), ok: true });
    }
    if (!body?.id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }
    const updated = toggleModule(body.id, body.enabled);
    if (!updated) return NextResponse.json({ error: "module not found" }, { status: 404 });
    return NextResponse.json({ module: updated, ok: true });
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
}
