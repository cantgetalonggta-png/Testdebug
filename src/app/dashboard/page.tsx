"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

type Metric = { label: string; value: string | number; delta?: string };

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: "Active Sessions", value: 12, delta: "+3" },
    { label: "API Latency", value: "42ms", delta: "-8ms" },
    { label: "Modules Enabled", value: 4, delta: "+1" },
    { label: "Build Status", value: "Ready", delta: "ok" },
  ]);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [counter, setCounter] = useState(0);
  const [logs, setLogs] = useState<string[]>([
    `[${formatDate(new Date())}] Dashboard mounted`,
  ]);

  const refresh = () => {
    setMetrics((m) =>
      m.map((item) =>
        item.label === "Active Sessions"
          ? { ...item, value: Math.floor(Math.random() * 30) + 5 }
          : item.label === "API Latency"
          ? { ...item, value: `${Math.floor(Math.random() * 80) + 20}ms` }
          : item
      )
    );
    const now = new Date();
    setLastRefresh(now);
    setLogs((l) => [`[${formatDate(now)}] Metrics refreshed`, ...l].slice(0, 8));
  };

  useEffect(() => {
    const t = setInterval(() => {
      setCounter((c) => c + 1);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-zinc-500">Live controls and status · last refresh {formatDate(lastRefresh)}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refresh}>Refresh metrics</Button>
          <Button variant="outline" onClick={() => setLogs([])}>
            Clear logs
          </Button>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardHeader className="pb-2">
              <CardDescription>{m.label}</CardDescription>
              <CardTitle className="text-2xl">{m.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-xs text-emerald-600 dark:text-emerald-400">{m.delta}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Interactive controls</CardTitle>
            <CardDescription>All buttons are fully functional</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button onClick={() => setCounter((c) => c + 1)}>Increment ({counter})</Button>
            <Button variant="secondary" onClick={() => setCounter(0)}>
              Reset
            </Button>
            <Button variant="outline" onClick={refresh}>
              Force refresh
            </Button>
            <Button variant="destructive" onClick={() => setLogs((l) => ["[alert] Manual trigger", ...l])}>
              Emit alert
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity log</CardTitle>
            <CardDescription>Recent events</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
              {logs.length === 0 && <li>No events</li>}
              {logs.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
