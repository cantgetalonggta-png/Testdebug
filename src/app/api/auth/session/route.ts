import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("td_session")?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false, user: null });
  }
  // Demo session decode (base64 JSON)
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8");
    const user = JSON.parse(raw);
    return NextResponse.json({ authenticated: true, user });
  } catch {
    return NextResponse.json({ authenticated: false, user: null });
  }
}
