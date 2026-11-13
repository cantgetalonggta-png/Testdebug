import { NextResponse } from "next/server";
import { getAllowlist, getOAuthProviders } from "@/lib/oauth-config";

export const dynamic = "force-dynamic";

export async function GET() {
  const providers = getOAuthProviders().map(({ id, name, enabled, configured, scopes }) => ({
    id,
    name,
    enabled,
    configured,
    scopes,
  }));
  const allowlist = getAllowlist();
  return NextResponse.json({
    providers,
    allowlist: {
      enabled: allowlist.enabled,
      emailCount: allowlist.emails.length,
      domainCount: allowlist.domains.length,
      roles: allowlist.roles,
      // never expose full emails in public API in real prod; demo ok
      demoEmails: allowlist.emails.filter((e) => e.includes("demo") || e.includes("admin")),
    },
    demo: { email: "demo@testdebug.app", password: "demo" },
  });
}
