import { NextResponse } from "next/server";
import { getOAuthProviders } from "@/lib/oauth-config";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const p = getOAuthProviders().find((x) => x.id === "discord");
  if (!p) {
    return NextResponse.json({ error: "Unknown provider" }, { status: 404 });
  }
  const origin = new URL(request.url).origin;
  if (!p.configured) {
    return NextResponse.redirect(
      new URL(`/auth/login?oauth=discord&demo=1&reason=not_configured`, origin)
    );
  }
  return NextResponse.json({
    provider: "discord",
    status: "configured",
    message: "Wire authorize URL with client id/secret from env",
    scopes: p.scopes,
  });
}
