"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [session, setSession] = useState<unknown>(null);
  useEffect(() => {
    fetch("/api/auth/session", { cache: "no-store" })
      .then((r) => r.json())
      .then(setSession)
      .catch(() => {});
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold">Admin</h1>
      <p className="mb-6 text-zinc-500">
        Soft-protected route (middleware checks <code>td_session</code> cookie).
      </p>
      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="overflow-auto rounded-lg bg-zinc-950 p-4 text-xs text-emerald-300">
            {JSON.stringify(session, null, 2)}
          </pre>
          <div className="mt-4 flex gap-2">
            <Link href="/debug">
              <Button variant="outline">Debug</Button>
            </Link>
            <Link href="/settings">
              <Button>Settings</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
