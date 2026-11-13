export type ModuleRecord = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  version: string;
  category: string;
  updatedAt: string;
};

const seed: ModuleRecord[] = [
  { id: "auth", name: "Auth Module", description: "OAuth / OAuth2 / credentials scaffolding", enabled: true, version: "1.2.0", category: "security", updatedAt: new Date().toISOString() },
  { id: "analytics", name: "Analytics", description: "Event tracking and dashboard metrics", enabled: true, version: "0.9.1", category: "insights", updatedAt: new Date().toISOString() },
  { id: "notifications", name: "Notifications", description: "In-app and push notification service", enabled: false, version: "0.4.0", category: "comms", updatedAt: new Date().toISOString() },
  { id: "billing", name: "Billing", description: "Stripe-ready billing hooks", enabled: false, version: "0.1.0", category: "payments", updatedAt: new Date().toISOString() },
  { id: "search", name: "Search", description: "Full-text and semantic search layer", enabled: true, version: "1.0.3", category: "data", updatedAt: new Date().toISOString() },
  { id: "admin", name: "Admin Console", description: "Role-based admin controls", enabled: true, version: "1.1.0", category: "ops", updatedAt: new Date().toISOString() },
  { id: "health", name: "Health Module", description: "Liveness, readiness, deep health probes", enabled: true, version: "1.0.0", category: "ops", updatedAt: new Date().toISOString() },
];

// Module-level singleton for serverless warm instances
const g = globalThis as unknown as { __modulesStore?: ModuleRecord[] };
if (!g.__modulesStore) g.__modulesStore = structuredClone(seed);

export function listModules() {
  return g.__modulesStore!;
}

export function toggleModule(id: string, enabled?: boolean) {
  const store = g.__modulesStore!;
  const idx = store.findIndex((m) => m.id === id);
  if (idx < 0) return null;
  store[idx] = {
    ...store[idx],
    enabled: typeof enabled === "boolean" ? enabled : !store[idx].enabled,
    updatedAt: new Date().toISOString(),
  };
  return store[idx];
}

export function setAll(enabled: boolean) {
  const store = g.__modulesStore!;
  for (let i = 0; i < store.length; i++) {
    store[i] = { ...store[i], enabled, updatedAt: new Date().toISOString() };
  }
  return store;
}
