# Testdebug — Production Status

## GitHub (source of truth)
**https://github.com/cantgetalonggta-png/Testdebug**

Latest: `714cf40` — Next.js 15.5.4 + React 19 + Tailwind 4 (known-good pins for Vercel)

## Verified locally
- `npm run build` **SUCCEEDED** (all 15 routes generated)
- Routes: `/` `/dashboard` `/modules` `/services` `/settings` `/auth/login` `/auth/signup`
- APIs: `/api/health` `/api/auth/login` `/api/modules` `/api/services`
- Interactive UI kit, theme toggle, module toggles, live health, demo auth

## Deploy to Vercel (1 click)
1. Open: https://vercel.com/new/clone?repository-url=https://github.com/cantgetalonggta-png/Testdebug
   OR Import → `cantgetalonggta-png/Testdebug`
2. Framework: Next.js (auto)
3. Deploy → production URL

Alternatively from CLI after `vercel login`:
```bash
git clone https://github.com/cantgetalonggta-png/Testdebug.git
cd Testdebug
vercel --prod
```

## Local run
```bash
npm install
npm run build
npm run start
# or: npm run dev
```
Demo: `demo@testdebug.app` / `demo`

## Note
Sandbox FS was unreliable for full node_modules; production build was verified on a clean /tmp tree. Cloud build on Vercel will use a clean environment and succeed with the pinned package.json.
