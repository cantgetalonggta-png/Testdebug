# Testdebug — LIVE + FLEET BIND

## Current live temporary deployment

**https://fleet-ochre-auyuksg.tmp.now/**

## GitHub

https://github.com/cantgetalonggta-png/Testdebug · production frontend + health + OAuth + env readiness + **Hades/APK audit continuity bind**

## Full-merge status (2026-11-14)

- Chain hops: **29** (end-of-chain merge complete)
- Bound session continuity keys: Hades sandbox + Drive handoff + STRAND + fleet
- Public audit API: `/api/audit` (redacted — no secrets)
- Session continuity API: `/api/session`
- Static public snapshot: `/audit/APK_DEEPLINK_AUDIT_DASHBOARD_v1.json`
- Sandbox selectable: **on**

## Linked mesh

| Asset | URL |
|-------|-----|
| Fleet live | https://fleet-ochre-auyuksg.tmp.now/ |
| STRAND mesh | https://strand-osint-mesh.vercel.app |
| STRAND repo | https://github.com/cantgetalonggta-png/strand-osint-mesh |
| Drive handoff | (see `/api/session` drive_handoff field) |
| HARD-TARGET | https://github.com/cantgetalonggta-png/HARD-TARGET |

## Env system

- `/api/env` — set/unset flags only (never secret values)
- Settings page shows readiness by group (app/auth/oauth/data/deploy)
- `.env.example` documents all keys
- Set secrets in Vercel Project → Settings → Environment Variables (do not commit)

## Verified live (200)

`/api/health` · `/api/env` · `/api/audit` · `/api/session` · `/settings` · `/debug` · `/admin` · `/dashboard`

## Features

Health live/ready/deep · Modules PATCH · Services probes · OAuth scaffold · Allowlist · Debug smoke · Admin · Middleware · CI · **APK deep-link audit fleet bind**

## Demo

`demo@testdebug.app` / `demo`
