/**
 * OAuth / OAuth2 scaffolding — drop real client IDs into env.
 * Demo mode works without secrets; production providers activate when env is set.
 */

export type OAuthProvider = {
  id: string;
  name: string;
  enabled: boolean;
  configured: boolean;
  authUrl: string;
  scopes: string[];
  color: string;
};

export type AllowlistConfig = {
  enabled: boolean;
  emails: string[];
  domains: string[];
  roles: string[];
};

export function getOAuthProviders(): OAuthProvider[] {
  const has = (k: string) => Boolean(process.env[k]?.length);
  return [
    {
      id: "google",
      name: "Google",
      enabled: true,
      configured: has("GOOGLE_CLIENT_ID") && has("GOOGLE_CLIENT_SECRET"),
      authUrl: "/api/oauth/google",
      scopes: ["openid", "email", "profile"],
      color: "bg-white text-zinc-900 border border-zinc-300",
    },
    {
      id: "github",
      name: "GitHub",
      enabled: true,
      configured: has("GITHUB_CLIENT_ID") && has("GITHUB_CLIENT_SECRET"),
      authUrl: "/api/oauth/github",
      scopes: ["read:user", "user:email"],
      color: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    },
    {
      id: "discord",
      name: "Discord",
      enabled: true,
      configured: has("DISCORD_CLIENT_ID") && has("DISCORD_CLIENT_SECRET"),
      authUrl: "/api/oauth/discord",
      scopes: ["identify", "email"],
      color: "bg-indigo-600 text-white",
    },
  ];
}

export function getAllowlist(): AllowlistConfig {
  const emails = (process.env.AUTH_ALLOWLIST_EMAILS ?? "demo@testdebug.app,admin@testdebug.app")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const domains = (process.env.AUTH_ALLOWLIST_DOMAINS ?? "testdebug.app")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return {
    enabled: process.env.AUTH_ALLOWLIST_ENABLED !== "false",
    emails,
    domains,
    roles: ["admin", "user", "viewer"],
  };
}

export function isEmailAllowed(email: string, allowlist = getAllowlist()): boolean {
  if (!allowlist.enabled) return true;
  const e = email.toLowerCase();
  if (allowlist.emails.includes(e)) return true;
  const domain = e.split("@")[1] ?? "";
  return allowlist.domains.includes(domain);
}
