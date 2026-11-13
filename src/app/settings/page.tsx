"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const [notifications, setNotifications] = useState(true);
  const [compact, setCompact] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("testdebug_settings");
      if (raw) {
        const s = JSON.parse(raw);
        if (s.theme) setTheme(s.theme);
        if (typeof s.notifications === "boolean") setNotifications(s.notifications);
        if (typeof s.compact === "boolean") setCompact(s.compact);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const save = () => {
    localStorage.setItem(
      "testdebug_settings",
      JSON.stringify({ theme, notifications, compact })
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">Settings</h1>
      <p className="mb-8 text-zinc-500">Preferences stored locally · production-ready controls</p>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>Appearance preference</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {(["system", "light", "dark"] as const).map((t) => (
              <Button
                key={t}
                variant={theme === t ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme(t)}
              >
                {t}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>In-app alerts (demo toggle)</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant={notifications ? "default" : "secondary"}
              onClick={() => setNotifications((v) => !v)}
            >
              {notifications ? "Enabled" : "Disabled"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Density</CardTitle>
            <CardDescription>Compact UI mode</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant={compact ? "default" : "outline"} onClick={() => setCompact((v) => !v)}>
              {compact ? "Compact on" : "Comfortable"}
            </Button>
          </CardContent>
        </Card>

        <div className="flex items-center gap-3">
          <Button onClick={save}>Save settings</Button>
          {saved && <span className="text-sm text-emerald-600">Saved</span>}
        </div>
      </div>
    </div>
  );
}
