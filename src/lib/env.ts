/**
 * Environment readiness registry.
 * Reports which expected keys are present — NEVER returns secret values.
 */

export type EnvKeyStatus = {
  key: string;
  group: string;
  required: boolean;
  set: boolean;
  description: string;
};

const KEYS: Array<Omit<EnvKeyStatus, "set">> = [
  { key: "NEXT_PUBLIC_APP_URL", group: "app", required: false, description: "Public app origin" },
  { key: "NODE_ENV", group: "app", required: true, description: "Runtime environment" },
  { key: "NEXTAUTH_SECRET", group: "auth", required: false, description: "Auth secret for sessions/JWT" },
  { key: "NEXTAUTH_URL", group: "auth", required: false, description: "Auth callback base URL" },
  { key: "AUTH_ALLOWLIST_ENABLED", group: "auth", required: false, description: "Toggle email allowlist" },
  { key: "AUTH_ALLOWLIST_EMAILS", group: "auth", required: false, description: "Comma-separated allowlist emails" },
  { key: "AUTH_ALLOWLIST_DOMAINS", group: "auth", required: false, description: "Comma-separated allowlist domains" },
  { key: "GOOGLE_CLIENT_ID", group: "oauth", required: false, description: "Google OAuth client id" },
  { key: "GOOGLE_CLIENT_SECRET", group: "oauth", required: false, description: "Google OAuth client secret" },
  { key: "GITHUB_CLIENT_ID", group: "oauth", required: false, description: "GitHub OAuth client id" },
  { key: "GITHUB_CLIENT_SECRET", group: "oauth", required: false, description: "GitHub OAuth client secret" },
  { key: "DISCORD_CLIENT_ID", group: "oauth", required: false, description: "Discord OAuth client id" },
  { key: "DISCORD_CLIENT_SECRET", group: "oauth", required: false, description: "Discord OAuth client secret" },
  { key: "DATABASE_URL", group: "data", required: false, description: "Database connection string" },
  { key: "VERCEL", group: "deploy", required: false, description: "Running on Vercel" },
  { key: "VERCEL_ENV", group: "deploy", required: false, description: "Vercel environment name" },
  { key: "VERCEL_URL", group: "deploy", required: false, description: "Vercel deployment host" },
  { key: "VERCEL_REGION", group: "deploy", required: false, description: "Vercel region" },
];

export function inspectEnv(): {
  keys: EnvKeyStatus[];
  summary: { total: number; set: number; missingRequired: number; groups: Record<string, { set: number; total: number }> };
} {
  const keys: EnvKeyStatus[] = KEYS.map((k) => ({
    ...k,
    set: Boolean(process.env[k.key]?.length),
  }));

  const groups: Record<string, { set: number; total: number }> = {};
  for (const k of keys) {
    if (!groups[k.group]) groups[k.group] = { set: 0, total: 0 };
    groups[k.group].total += 1;
    if (k.set) groups[k.group].set += 1;
  }

  return {
    keys,
    summary: {
      total: keys.length,
      set: keys.filter((k) => k.set).length,
      missingRequired: keys.filter((k) => k.required && !k.set).length,
      groups,
    },
  };
}

/** Demo-safe defaults applied only when missing (no secrets). */
export function applyDemoDefaults() {
  if (!process.env.AUTH_ALLOWLIST_ENABLED) process.env.AUTH_ALLOWLIST_ENABLED = "true";
  if (!process.env.AUTH_ALLOWLIST_EMAILS)
    process.env.AUTH_ALLOWLIST_EMAILS = "demo@testdebug.app,admin@testdebug.app";
  if (!process.env.AUTH_ALLOWLIST_DOMAINS) process.env.AUTH_ALLOWLIST_DOMAINS = "testdebug.app";
}
