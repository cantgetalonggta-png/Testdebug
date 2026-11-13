import { NextRequest, NextResponse } from "next/server";
import { isEmailAllowed } from "@/lib/oauth-config";

export const dynamic = "force-dynamic";

function sessionCookie(user: object) {
  return Buffer.from(JSON.stringify(user)).toString("base64url");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body ?? {};

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    let user: { id: string; email: string; name: string; role: string } | null = null;

    if (email === "demo@testdebug.app" && password === "demo") {
      user = {
        id: "usr_demo_001",
        email: "demo@testdebug.app",
        name: "Demo User",
        role: "admin",
      };
    } else if (typeof email === "string" && email.includes("@") && String(password).length >= 4) {
      user = {
        id: "usr_" + Math.random().toString(36).slice(2, 10),
        email,
        name: email.split("@")[0],
        role: "user",
      };
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!isEmailAllowed(user.email)) {
      return NextResponse.json({ error: "Email not on allowlist" }, { status: 403 });
    }

    const res = NextResponse.json({
      ok: true,
      user,
      message: "Authenticated (demo mode)",
      session: true,
    });
    res.cookies.set("td_session", sessionCookie(user), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });
    return res;
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
    related: ["/api/auth/session", "/api/auth/logout"],
  });
}
