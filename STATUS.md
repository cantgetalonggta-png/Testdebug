# Testdebug — Production Status

## Live

**https://prompt-gorge-jurt0cc.tmp.now** (temporary; claim if still active)

GitHub: https://github.com/cantgetalonggta-png/Testdebug  
Latest main: middleware + settings + admin (`35f4e96`)

## Verified

| Surface | Status |
|---------|--------|
| `/api/health` (+ live/ready/deep) | 200 · 8/8 checks |
| `/api/status` · services · modules | 200 |
| Auth login/session/config + OAuth routes | 200 |
| Pages: home, dashboard, modules, services, settings, debug, admin, login | 200 |
| CI on main | success (prior runs) |
| Production build | Next 15.5.29 · middleware present |

## Stack

Next.js 15.5.29 · React 19 · Tailwind 4 · TypeScript  
Security headers middleware · error/404 boundaries · OAuth scaffolding · allowlist

## Demo

`demo@testdebug.app` / `demo`

## Permanent deploy

Vercel project linked to GitHub → push to `main` auto-deploys.  
Check Vercel dashboard for production `*.vercel.app` URL.
