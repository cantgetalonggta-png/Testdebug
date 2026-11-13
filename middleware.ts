import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Soft protection: API rate headers + optional cookie gate for /admin paths.
 * Full auth is client+API cookie based; this adds observability headers.
 */
export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Testdebug-Path", request.nextUrl.pathname);
  res.headers.set("X-Testdebug-Request-Id", crypto.randomUUID());

  // Soft gate example: /api/modules PATCH already auth-optional in demo
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const session = request.cookies.get("td_session");
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login?next=/admin", request.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
