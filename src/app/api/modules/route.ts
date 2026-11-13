import { NextResponse } from "next/server";

const modules = [
  { id: "auth", name: "Auth Module", enabled: true, version: "1.2.0" },
  { id: "analytics", name: "Analytics", enabled: true, version: "0.9.1" },
  { id: "notifications", name: "Notifications", enabled: false, version: "0.4.0" },
  { id: "billing", name: "Billing", enabled: false, version: "0.1.0" },
  { id: "search", name: "Search", enabled: true, version: "1.0.3" },
  { id: "admin", name: "Admin Console", enabled: true, version: "1.1.0" },
];

export async function GET() {
  return NextResponse.json({
    modules,
    count: modules.length,
    enabled: modules.filter((m) => m.enabled).length,
  });
}
