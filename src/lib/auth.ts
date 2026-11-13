/**
 * Auth service scaffolding for OAuth / OAuth2 / credentials.
 * Ready for Auth.js (NextAuth), Clerk, Supabase Auth, or custom OAuth providers.
 * Environment variables expected:
 *   AUTH_SECRET, NEXTAUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, etc.
 */

export type User = {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "guest";
  image?: string;
};

export type Session = {
  user: User;
  expires: string;
  accessToken?: string;
};

const DEMO_USER: User = {
  id: "usr_demo_001",
  email: "demo@testdebug.app",
  name: "Demo User",
  role: "admin",
  image: undefined,
};

/** Client-side session helper (replace with real auth provider) */
export function getDemoSession(): Session {
  return {
    user: DEMO_USER,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}

export function isAuthenticated(): boolean {
  // In production this checks real session / JWT / cookie
  if (typeof window === "undefined") return false;
  return localStorage.getItem("testdebug_session") === "1";
}

export function setDemoAuth(loggedIn: boolean) {
  if (typeof window === "undefined") return;
  if (loggedIn) {
    localStorage.setItem("testdebug_session", "1");
    localStorage.setItem("testdebug_user", JSON.stringify(DEMO_USER));
  } else {
    localStorage.removeItem("testdebug_session");
    localStorage.removeItem("testdebug_user");
  }
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("testdebug_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}
