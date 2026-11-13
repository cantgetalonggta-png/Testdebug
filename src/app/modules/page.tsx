"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Module = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  version: string;
  category?: string;
};

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/modules", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setModules(data.modules ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load modules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (id: string, enabled: boolean) => {
    const res = await fetch("/api/modules", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, enabled: !enabled }),
    });
    if (res.ok) {
      const data = await res.json();
      setModules((prev) => prev.map((m) => (m.id === id ? data.module : m)));
    }
  };

  const bulk = async (action: "enable_all" | "disable_all") => {
    const res = await fetch("/api/modules", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    if (res.ok) {
      const data = await res.json();
      setModules(data.modules ?? []);
    }
  };

  const enabledCount = modules.filter((m) => m.enabled).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Modules</h1>
          <p className="text-zinc-500">
            {loading ? "Loading…" : `${enabledCount} of ${modules.length} modules enabled · live API`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}>
            Refresh
          </Button>
          <Button variant="outline" onClick={() => bulk("enable_all")}>
            Enable all
          </Button>
          <Button variant="outline" onClick={() => bulk("disable_all")}>
            Disable all
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
          {error}
        </div>
      )}

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
              <span className="font-mono text-xs text-zinc-500">
                v{m.version}
                {m.category ? ` · ${m.category}` : ""}
              </span>
              <Button
                size="sm"
                variant={m.enabled ? "secondary" : "default"}
                onClick={() => toggle(m.id, m.enabled)}
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
