"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ENDPOINTS = [
  "/api/health",
  "/api/health/live",
  "/api/health/ready",
  "/api/health/deep",
  "/api/status",
  "/api/services",
  "/api/modules",
  "/api/auth/config",
  "/api/auth/session",
  "/api/auth/login",
  "/api/oauth/google",
  "/api/oauth/github",
  "/api/oauth/discord",
];

type Result = { path: string; status: number; ms: number; ok: boolean; body?: string };

export default function DebugPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [running, setRunning] = useState(false);

  async function run() {
    setRunning(true);
    const out: Result[] = [];
    for (const path of ENDPOINTS) {
      const t0 = performance.now();
      try {
        const res = await fetch(path, { cache: "no-store", redirect: "manual" });
        const text = await res.text().catch(() => "");
        out.push({
          path,
          status: res.status,
          ms: Math.round(performance.now() - t0),
          ok: res.status >= 200 && res.status < 400,
          body: text.slice(0, 100),
        });
      } catch {
        out.push({ path, status: 0, ms: Math.round(performance.now() - t0), ok: false });
      }
      setResults([...out]);
    }
    // login POST smoke
    const t0 = performance.now();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "demo@testdebug.app", password: "demo" }),
      });
      out.push({
        path: "POST /api/auth/login",
        status: res.status,
        ms: Math.round(performance.now() - t0),
        ok: res.ok,
        body: (await res.text()).slice(0, 100),
      });
      setResults([...out]);
    } catch {
      out.push({ path: "POST /api/auth/login", status: 0, ms: 0, ok: false });
      setResults([...out]);
    }
    setRunning(false);
  }

  const passed = results.filter((r) => r.ok).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Debug / Smoke</h1>
          <p className="text-zinc-500">
            Exercise every API · {results.length ? `${passed}/${results.length} passed` : "not run"}
          </p>
        </div>
        <Button onClick={run} disabled={running}>
          {running ? "Running…" : "Run full smoke"}
        </Button>
      </div>
      <div className="space-y-2">
        {results.map((r) => (
          <Card key={r.path + r.status}>
            <CardHeader className="py-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="font-mono text-sm">{r.path}</CardTitle>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.ok
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300"
                  }`}
                >
                  {r.status} · {r.ms}ms
                </span>
              </div>
            </CardHeader>
            {r.body && (
              <CardContent className="pt-0">
                <pre className="truncate text-xs text-zinc-500">{r.body}</pre>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
