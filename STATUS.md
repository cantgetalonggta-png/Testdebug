# Testdebug — LIVE

## Latest temporary (claim ~59m)

**https://instant-mauve-x7w6lps.tmp.now**  
Claim: https://vercel.com/claim-deployment?code=732ff855-84c3-469d-9c9e-bfa98dae6683

## GitHub

https://github.com/cantgetalonggta-png/Testdebug · production frontend + health + OAuth + env readiness

## Env system

- `/api/env` — set/unset flags only (never secret values)
- Settings page shows readiness by group (app/auth/oauth/data/deploy)
- `.env.example` documents all keys
- Set secrets in Vercel Project → Settings → Environment Variables (do not commit)

## Verified live (200)

`/api/health` · `/api/env` · `/api/status` · `/api/auth/config` · `/settings` · `/debug` · `/admin` · `/dashboard`

## Features

Health live/ready/deep · Modules PATCH · Services probes · OAuth scaffold · Allowlist · Debug smoke · Admin · Middleware (permanent Vercel) · CI

## Demo

`demo@testdebug.app` / `demo`
