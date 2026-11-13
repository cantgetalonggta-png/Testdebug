"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ServiceStatus = "healthy" | "degraded" | "down" | "checking";

type Service = {
  id: string;
  name: string;
  endpoint: string;
  status: ServiceStatus;
  latency?: number;
};

const baseServices: Omit<Service, "status" | "latency">[] = [
  { id: "health", name: "Health API", endpoint: "/api/health" },
  { id: "auth", name: "Auth Login API", endpoint: "/api/auth/login" },
  { id: "modules", name: "Modules API", endpoint: "/api/modules" },
  { id: "frontend", name: "Frontend App", endpoint: "/" },
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(
    baseServices.map((s) => ({ ...s, status: "checking" as ServiceStatus }))
  );
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkAll = async () => {
    setServices((prev) => prev.map((s) => ({ ...s, status: "checking" as ServiceStatus })));
    const results = await Promise.all(
      baseServices.map(async (s) => {
        const start = performance.now();
        try {
          const res = await fetch(s.endpoint, { cache: "no-store" });
          const latency = Math.round(performance.now() - start);
          return {
            ...s,
            status: (res.ok ? "healthy" : "degraded") as ServiceStatus,
            latency,
          };
        } catch {
          return {
            ...s,
            status: "down" as ServiceStatus,
            latency: undefined,
          };
        }
      })
    );
    setServices(results);
    setLastCheck(new Date());
  };

  useEffect(() => {
    checkAll();
  }, []);

  const statusColor = (s: ServiceStatus) => {
    switch (s) {
      case "healthy":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
      case "degraded":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
      case "down":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
      default:
        return "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-zinc-500">
            Live health checks · {lastCheck ? `checked ${lastCheck.toLocaleTimeString()}` : "checking…"}
          </p>
        </div>
        <Button onClick={checkAll}>Re-check all</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <Card key={s.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{s.name}</CardTitle>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColor(s.status)}`}>
                  {s.status}
                </span>
              </div>
              <CardDescription className="font-mono text-xs">{s.endpoint}</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">
                {s.latency != null ? `${s.latency} ms` : "—"}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  const start = performance.now();
                  try {
                    const res = await fetch(s.endpoint, { cache: "no-store" });
                    const latency = Math.round(performance.now() - start);
                    setServices((prev) =>
                      prev.map((x) =>
                        x.id === s.id
                          ? { ...x, status: res.ok ? "healthy" : "degraded", latency }
                          : x
                      )
                    );
                  } catch {
                    setServices((prev) =>
                      prev.map((x) => (x.id === s.id ? { ...x, status: "down", latency: undefined } : x))
                    );
                  }
                }}
              >
                Ping
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
