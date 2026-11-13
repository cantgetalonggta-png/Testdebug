"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Module = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  version: string;
};

const initialModules: Module[] = [
  { id: "auth", name: "Auth Module", description: "OAuth / OAuth2 / credentials scaffolding", enabled: true, version: "1.2.0" },
  { id: "analytics", name: "Analytics", description: "Event tracking and dashboard metrics", enabled: true, version: "0.9.1" },
  { id: "notifications", name: "Notifications", description: "In-app and push notification service", enabled: false, version: "0.4.0" },
  { id: "billing", name: "Billing", description: "Stripe-ready billing hooks (placeholder)", enabled: false, version: "0.1.0" },
  { id: "search", name: "Search", description: "Full-text and semantic search layer", enabled: true, version: "1.0.3" },
  { id: "admin", name: "Admin Console", description: "Role-based admin controls", enabled: true, version: "1.1.0" },
];

export default function ModulesPage() {
  const [modules, setModules] = useState(initialModules);

  const toggle = (id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  const enableAll = () => setModules((p) => p.map((m) => ({ ...m, enabled: true })));
  const disableAll = () => setModules((p) => p.map((m) => ({ ...m, enabled: false })));

  const enabledCount = modules.filter((m) => m.enabled).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modules</h1>
          <p className="text-zinc-500">
            {enabledCount} of {modules.length} modules enabled
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={enableAll}>
            Enable all
          </Button>
          <Button variant="outline" onClick={disableAll}>
            Disable all
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((m) => (
          <Card key={m.id} className={m.enabled ? "border-emerald-300 dark:border-emerald-800" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle>{m.name}</CardTitle>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    m.enabled
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                      : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  {m.enabled ? "ON" : "OFF"}
                </span>
              </div>
              <CardDescription>{m.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="font-mono text-xs text-zinc-500">v{m.version}</span>
              <Button
                size="sm"
                variant={m.enabled ? "secondary" : "default"}
                onClick={() => toggle(m.id)}
              >
                {m.enabled ? "Disable" : "Enable"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
