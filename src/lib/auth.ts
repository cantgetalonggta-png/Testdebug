/**
 * Auth service scaffolding for OAuth / OAuth2 / credentials.
 * Ready for Auth.js (NextAuth), Clerk, Supabase Auth, or custom OAuth providers.
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

export function getDemoSession(): Session {
  return {
    user: DEMO_USER,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("testdebug_session") === "1";
}

export function setDemoAuth(loggedIn: boolean, user?: User | null) {
  if (typeof window === "undefined") return;
  if (loggedIn) {
    localStorage.setItem("testdebug_session", "1");
    const u = user
      ? {
          id: user.id,
          email: user.email,
          name: user.name,
          role: (user.role as User["role"]) || "user",
          image: user.image,
        }
      : DEMO_USER;
    localStorage.setItem("testdebug_user", JSON.stringify(u));
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
