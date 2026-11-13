import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body ?? {};

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    // Demo auth: accept demo credentials or any non-empty
    if (email === "demo@testdebug.app" && password === "demo") {
      return NextResponse.json({
        ok: true,
        user: {
          id: "usr_demo_001",
          email: "demo@testdebug.app",
          name: "Demo User",
          role: "admin",
        },
        message: "Authenticated (demo mode)",
      });
    }

    // Also accept any valid-looking email for demo flexibility
    if (typeof email === "string" && email.includes("@") && password.length >= 4) {
      return NextResponse.json({
        ok: true,
        user: {
          id: "usr_" + Math.random().toString(36).slice(2, 10),
          email,
          name: email.split("@")[0],
          role: "user",
        },
        message: "Authenticated (demo mode)",
      });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/auth/login",
    method: "POST",
    body: { email: "string", password: "string" },
    demo: { email: "demo@testdebug.app", password: "demo" },
  });
}
