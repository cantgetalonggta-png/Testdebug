"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { isAuthenticated, getStoredUser } from "@/lib/auth";

const features = [
  {
    title: "Dashboard",
    description: "Live metrics, status cards, and interactive controls.",
    href: "/dashboard",
    icon: "📊",
  },
  {
    title: "Modules",
    description: "Pluggable feature modules with enable/disable toggles.",
    href: "/modules",
    icon: "🧩",
  },
  {
    title: "Services",
    description: "Service health, API endpoints, and integration status.",
    href: "/services",
    icon: "⚙️",
  },
  {
    title: "Auth Ready",
    description: "OAuth / OAuth2 scaffolding, login/signup flows, session helpers.",
    href: "/auth/login",
    icon: "🔐",
  },
  {
    title: "Settings",
    description: "Theme, preferences, and environment configuration.",
    href: "/settings",
    icon: "🛠️",
  },
  {
    title: "API Health",
    description: "Live health-check endpoint for monitoring and verification.",
    href: "/api/health",
    icon: "💚",
  },
];

export default function HomePage() {
  const [authed, setAuthed] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    setAuthed(isAuthenticated());
    const u = getStoredUser();
    if (u) setName(u.name);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-16 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
            Production Ready
          </span>
          <ThemeToggle />
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Testdebug
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Full production-ready frontend with working buttons, modules, services,
          auth scaffolding, and Vercel deployment readiness. Every control is interactive.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/dashboard">
            <Button size="lg">Open Dashboard</Button>
          </Link>
          <Link href="/modules">
            <Button size="lg" variant="outline">
              Explore Modules
            </Button>
          </Link>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => setClicks((c) => c + 1)}
          >
            Interactive Counter: {clicks}
          </Button>
        </div>
        {authed && name && (
          <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-400">
            Signed in as {name}
          </p>
        )}
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-center text-2xl font-semibold">Everything included</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link key={f.href} href={f.href}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 text-2xl">{f.icon}</div>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>{f.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    Open →
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold">System status</h3>
            <p className="text-sm text-zinc-500">All core routes and API endpoints are live.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/api/health">
              <Button variant="outline" size="sm">
                Hit /api/health
              </Button>
            </Link>
            <Link href="/services">
              <Button size="sm">View Services</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
