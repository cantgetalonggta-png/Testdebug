"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";

type EnvReport = {
  ok: boolean;
  summary: { total: number; set: number; missingRequired: number; groups: Record<string, { set: number; total: number }> };
  keys: Array<{ key: string; group: string; required: boolean; set: boolean; description: string }>;
};

export default function SettingsPage() {
  const [env, setEnv] = useState<EnvReport | null>(null);
  const [prefs, setPrefs] = useState({ dense: false, animations: true, autoRefresh: true });

  useEffect(() => {
    fetch("/api/env", { cache: "no-store" })
      .then((r) => r.json())
      .then(setEnv)
      .catch(() => {});
    try {
      const raw = localStorage.getItem("td_prefs");
      if (raw) setPrefs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const savePrefs = (next: typeof prefs) => {
    setPrefs(next);
    localStorage.setItem("td_prefs", JSON.stringify(next));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-zinc-500">Theme, preferences, environment readiness</p>
        </div>
        <ThemeToggle />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Stored in browser localStorage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {(
              [
                ["dense", "Dense UI"],
                ["animations", "Animations"],
                ["autoRefresh", "Dashboard auto-refresh"],
              ] as const
            ).map(([k, label]) => (
              <label key={k} className="flex items-center justify-between gap-4 text-sm">
                <span>{label}</span>
                <input
                  type="checkbox"
                  checked={prefs[k]}
                  onChange={(e) => savePrefs({ ...prefs, [k]: e.target.checked })}
                />
              </label>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => savePrefs({ dense: false, animations: true, autoRefresh: true })}
            >
              Reset defaults
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment readiness</CardTitle>
            <CardDescription>
              {env
                ? `${env.summary.set}/${env.summary.total} keys set · required missing: ${env.summary.missingRequired}`
                : "Loading…"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {env && (
              <div className="mb-4 flex flex-wrap gap-2">
                {Object.entries(env.summary.groups).map(([g, v]) => (
                  <span
                    key={g}
                    className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs dark:bg-zinc-800"
                  >
                    {g}: {v.set}/{v.total}
                  </span>
                ))}
              </div>
            )}
            <div className="max-h-80 space-y-2 overflow-auto">
              {env?.keys.map((k) => (
                <div
                  key={k.key}
                  className="flex items-start justify-between gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800"
                >
                  <div>
                    <div className="font-mono text-xs">{k.key}</div>
                    <div className="text-xs text-zinc-500">{k.description}</div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      k.set
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {k.set ? "SET" : "unset"}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              Secret values are never shown. Configure OAuth/DB keys in Vercel Project → Settings →
              Environment Variables.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
