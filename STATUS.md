# Testdebug — LIVE (OAuth + Health + Smoke)

## Latest temporary URL (claim ~59m)

**https://prompt-gorge-jurt0cc.tmp.now**  
Claim: https://vercel.com/claim-deployment?code=fd82d4d3-bed5-4b9b-beca-c8aea1b3354b

Also claimed earlier: sonic-iron / fleet-ochre (user linked GitHub on Vercel).

## GitHub → Vercel

Repo: https://github.com/cantgetalonggta-png/Testdebug  
Latest commit: `484e565` (OAuth + debug + CI)  
Push to `main` triggers Vercel production if project is linked.

## Verified endpoints (200)

- `/api/health` (+ live/ready/deep)
- `/api/status` · `/api/services` · `/api/modules` (PATCH)
- `/api/auth/login|session|logout|config`
- `/api/oauth/{google,github,discord}`
- Pages: `/` `/dashboard` `/modules` `/services` `/settings` `/debug` `/auth/login`

## Demo

Email: `demo@testdebug.app` · Password: `demo`

## CI

`.github/workflows/ci.yml` — npm ci + build on push/PR to main
