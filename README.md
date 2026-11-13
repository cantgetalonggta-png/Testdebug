# Testdebug

Full production-ready Next.js frontend — UI kit, modules, services, health APIs, OAuth scaffolding, Vercel deployment.

## Stack

- Next.js 15.5.29 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- Production health: `/api/health`, `/live`, `/ready`, `/deep`
- Modules CRUD toggles · Services probes · Auth + OAuth2 placeholders · Allowlist

## Quick start

```bash
npm install
npm run dev
# production
npm run build && npm start
```

Demo login: `demo@testdebug.app` / `demo`

## Key routes

| Route | Description |
|-------|-------------|
| `/` | Landing |
| `/dashboard` | Live metrics from `/api/status` |
| `/modules` | API-backed module toggles |
| `/services` | Live health probes + JSON |
| `/debug` | Full API smoke suite |
| `/auth/login` | Credentials + OAuth buttons |
| `/settings` | Theme / prefs |
| `/api/health` | Production health report |

## Deploy (Vercel + GitHub)

1. Repo: https://github.com/cantgetalonggta-png/Testdebug  
2. Import in Vercel (or claim temporary deploy)  
3. Push to `main` → production auto-deploy  
4. Optional env: see `.env.example`

## Scripts

- `npm run build` — production build  
- `npm run typecheck` — `tsc --noEmit`  
- `npm run lint` — ESLint  
