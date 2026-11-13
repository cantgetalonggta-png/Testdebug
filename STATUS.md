# Testdebug — LIVE (Health Module Production)

## New temporary deployment (claim within ~59 min)

**URL:** https://sonic-iron-3p01ecq.tmp.now  
**Claim:** https://vercel.com/claim-deployment?code=c4330648-8058-4b57-86da-b5de8c2f7bc6

Previous (claimed): https://fleet-ochre-auyuksg.tmp.now

## Production Health Module

| Endpoint | Purpose | Status |
|----------|---------|--------|
| `GET/HEAD /api/health` | Full process + dependency checks | 200 |
| `GET/HEAD /api/health/live` | Liveness (k8s-style) | 200 |
| `GET/HEAD /api/health/ready` | Readiness (deps) | 200 |
| `GET /api/health/deep` | Deep report + requestId | 200 |
| `GET /api/status` | Aggregate health + modules + deploy | 200 |
| `GET /api/services` | Service registry with probes | 200 |
| `GET/PATCH /api/modules` | Module registry + toggles | 200 |
| `POST /api/auth/login` | Demo auth + session cookie | 200 |
| `GET /api/auth/session` | Session | 200 |
| `POST /api/auth/logout` | Logout | 200 |

## GitHub

https://github.com/cantgetalonggta-png/Testdebug  
Commit: production health module (live/ready/deep)

## Permanent options
1. Claim temporary link above
2. Import GitHub repo in Vercel dashboard (echo-ec69)
3. `vercel login` then `vercel --prod` from clone
