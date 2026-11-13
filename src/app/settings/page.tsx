"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { getStoredUser, setDemoAuth } from "@/lib/auth";

export default function SettingsPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const u = getStoredUser();
    if (u) setUser({ name: u.name, email: u.email });
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Theme and display preferences</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="text-sm">Theme</span>
            <ThemeToggle />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Application behaviour</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between gap-4">
              <span className="text-sm">Enable notifications</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="h-4 w-4 rounded"
              />
            </label>
            <label className="flex items-center justify-between gap-4">
              <span className="text-sm">Compact mode</span>
              <input
                type="checkbox"
                checked={compact}
                onChange={(e) => setCompact(e.target.checked)}
                className="h-4 w-4 rounded"
              />
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Session and identity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              <>
                <div className="text-sm">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-zinc-500">{user.email}</div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setDemoAuth(false);
                    setUser(null);
                    window.location.href = "/";
                  }}
                >
                  Sign out
                </Button>
              </>
            ) : (
              <p className="text-sm text-zinc-500">
                Not signed in.{" "}
                <a href="/auth/login" className="underline">
                  Sign in
                </a>
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment</CardTitle>
            <CardDescription>Deployment and runtime info</CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 font-mono text-xs text-zinc-600 dark:text-zinc-400">
            <div>Framework: Next.js 16 (App Router)</div>
            <div>React: 19</div>
            <div>Styling: Tailwind CSS 4</div>
            <div>Target: Vercel production</div>
            <div>Auth: Demo + OAuth scaffolding ready</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
