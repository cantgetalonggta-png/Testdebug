import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    services: [
      { id: "health", name: "Health API", status: "healthy", endpoint: "/api/health" },
      { id: "auth", name: "Auth API", status: "healthy", endpoint: "/api/auth/login" },
      { id: "modules", name: "Modules API", status: "healthy", endpoint: "/api/modules" },
    ],
    timestamp: new Date().toISOString(),
  });
}
