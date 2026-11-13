# Testdebug — Production Frontend

Full production-ready Next.js (App Router) frontend with:

- Working interactive buttons, counters, toggles
- Modules page (enable/disable feature modules)
- Services page with live health checks against real API routes
- Auth scaffolding (login / signup / session helpers) ready for OAuth / OAuth2 providers
- Dashboard with live metrics and activity log
- Settings (theme, preferences, account)
- API routes: `/api/health`, `/api/auth/login`, `/api/modules`
- Tailwind CSS 4 + dark mode
- Vercel deployment ready

## Quick start

```bash
cd testdebug
npm install
npm run dev
```

Open http://localhost:3000

Demo login: `demo@testdebug.app` / `demo`

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript check

## Deploy to Vercel

```bash
npx vercel --prod
```

Or connect the Git repository in the Vercel dashboard. Framework is auto-detected as Next.js.

## Structure

```
src/
  app/           # App Router pages + API routes
  components/    # UI + layout components
  lib/           # utils, auth helpers
```

All primary buttons, links, forms, and service pings are functional.
