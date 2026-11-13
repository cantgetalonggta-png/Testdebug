"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStoredUser, isAuthenticated } from "@/lib/auth";

type StatusPayload = {
  overall?: string;
  health?: { status: string; version: string; region: string | null; summary?: { passed: number; total: number } };
  modules?: { count: number; enabled: number };
  deployment?: { vercel?: boolean; env?: string; region?: string | null; url?: string | null };
};

export default function DashboardPage() {
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [clicks, setClicks] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus(await res.json());
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "load failed");
    }
  };

  useEffect(() => {
    if (isAuthenticated()) setUser(getStoredUser());
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  const cards = [
    {
      title: "Health",
      value: status?.health?.status ?? "…",
      desc: status?.health
        ? `${status.health.summary?.passed ?? "?"}/${status.health.summary?.total ?? "?"} checks · ${status.health.version}`
        : "Loading",
      href: "/api/health",
    },
    {
      title: "Modules",
      value: status?.modules ? `${status.modules.enabled}/${status.modules.count}` : "…",
      desc: "Enabled modules",
      href: "/modules",
    },
    {
      title: "Deploy",
      value: status?.deployment?.vercel ? "Vercel" : "Local",
      desc: status?.deployment?.region ?? status?.deployment?.env ?? "—",
      href: "/services",
    },
    {
      title: "Session",
      value: user ? "Signed in" : "Guest",
      desc: user?.email ?? "demo@testdebug.app",
      href: "/auth/login",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-zinc-500">
            Live metrics from /api/status · auto-refresh 15s
            {error ? ` · error: ${error}` : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={load}>
            Refresh
          </Button>
          <Link href="/debug">
            <Button variant="secondary">Smoke tests</Button>
          </Link>
          <Link href="/services">
            <Button>Services</Button>
          </Link>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.title} href={c.href}>
            <Card className="h-full transition hover:border-zinc-400 dark:hover:border-zinc-600">
              <CardHeader>
                <CardDescription>{c.title}</CardDescription>
                <CardTitle className="text-2xl capitalize">{c.value}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-zinc-500">{c.desc}</CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Interactive control</CardTitle>
          <CardDescription>Every button must work — counter + navigation</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setClicks((n) => n + 1)}>Click me ({clicks})</Button>
          <Button variant="outline" onClick={() => setClicks(0)}>
            Reset
          </Button>
          <Link href="/modules">
            <Button variant="secondary">Open modules</Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost">Settings</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
