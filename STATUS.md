# Testdebug — LIVE

## Production temporary deployment (claim within 48m)

**URL:** https://fleet-ochre-auyuksg.tmp.now  
**Claim:** https://vercel.com/claim-deployment?code=6b260cd8-0acb-4d14-a797-4a7e880a0e4f

## Smoke (live)

| Route | Status |
|-------|--------|
| `/api/health` | 200 ok |
| `/` `/dashboard` `/modules` `/services` `/settings` | 200 |
| `/auth/login` `/auth/signup` | 200 |
| `POST /api/auth/login` demo | authenticated |

## GitHub

https://github.com/cantgetalonggta-png/Testdebug  
Next.js **15.5.29** (CVE-2025-66478 patched)

## Permanent deploy

1. Claim the temporary deployment link above, **or**
2. Import repo in Vercel dashboard (team echo-ec69) — auto deploys on push
3. Re-auth Vercel MCP connector for fully automated future deploys

## Stack

Next 15.5.29 · React 19 · Tailwind 4 · TypeScript · App Router  
Full UI kit, modules, services, OAuth-ready auth, health APIs
