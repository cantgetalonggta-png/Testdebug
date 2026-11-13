export const modules = [
  {
    id: "auth",
    name: "Auth & OAuth2",
    description: "Login, signup, OAuth providers (Google, GitHub, Discord), session management, allowlist ready.",
    status: "ready" as const,
    features: ["NextAuth scaffold", "JWT / session", "Provider buttons", "Protected routes"],
  },
  {
    id: "ui",
    name: "UI Kit",
    description: "Production button system, cards, badges, navigation, dark theme, responsive primitives.",
    status: "live" as const,
    features: ["6 button variants", "Card system", "Badges", "Responsive nav"],
  },
  {
    id: "services",
    name: "Service Layer",
    description: "Health checks, mock microservices, status dashboard, API routes for real backends.",
    status: "live" as const,
    features: ["/api/health", "Service status", "Mock data", "Extensible"],
  },
  {
    id: "deploy",
    name: "Deploy Pipeline",
    description: "Vercel-native config, env management, preview + production, GitHub integration.",
    status: "ready" as const,
    features: ["vercel.json", "CI ready", "Env template", "One-click deploy"],
  },
  {
    id: "debug",
    name: "Debug & Test",
    description: "Live testing harness, smoke checks, button/module verification, error boundaries.",
    status: "live" as const,
    features: ["Health endpoint", "UI smoke", "Status cards", "Console-friendly"],
  },
  {
    id: "modules",
    name: "Module System",
    description: "Pluggable feature modules with isolation, lazy-load ready structure, documentation.",
    status: "ready" as const,
    features: ["Module registry", "Feature flags ready", "Isolation", "Docs hooks"],
  },
];

export const services = [
  { id: "api-gateway", name: "API Gateway", status: "operational" as const, latency: "12ms", region: "iad1" },
  { id: "auth-service", name: "Auth Service", status: "operational" as const, latency: "28ms", region: "iad1" },
  { id: "user-db", name: "User Database", status: "operational" as const, latency: "8ms", region: "iad1" },
  { id: "analytics", name: "Analytics", status: "degraded" as const, latency: "145ms", region: "sfo1" },
  { id: "storage", name: "Object Storage", status: "operational" as const, latency: "35ms", region: "iad1" },
  { id: "queue", name: "Job Queue", status: "maintenance" as const, latency: "—", region: "iad1" },
];

export type ModuleStatus = "live" | "ready" | "planned";
export type ServiceStatus = "operational" | "degraded" | "maintenance" | "down";
