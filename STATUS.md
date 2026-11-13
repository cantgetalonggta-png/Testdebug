# Testdebug — Status

## Live
- **GitHub**: https://github.com/cantgetalonggta-png/Testdebug
- Full production Next.js 16 + React 19 + Tailwind 4 frontend
- Pages: `/` `/dashboard` `/modules` `/services` `/settings` `/auth/login` `/auth/signup`
- APIs: `/api/health` `/api/auth/login` `/api/modules` `/api/services`
- Interactive: buttons, counters, module toggles, live health pings, theme toggle, demo auth
- `build-cached.sh` — skip install when deps present; one bounded install otherwise
- `vercel.json` ready

## Local
```bash
cd testdebug
bash build-cached.sh   # or: npm install && npm run build && npm run dev
```
Demo login: `demo@testdebug.app` / `demo`

## Deploy
Import the GitHub repo in Vercel dashboard (or reconnect Vercel connector here) → auto-detect Next.js → Deploy.
