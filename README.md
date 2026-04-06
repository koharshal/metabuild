# Metabuild Realty

A Vite + React real-estate website with Supabase-backed CMS and admin login.

## Features
- Public portfolio pages (home, projects, detail, about, contact)
- Supabase-backed content store for:
  - Site settings
  - Projects
- Admin authentication via Supabase Auth
- Admin pages for site settings + project CRUD
- LocalStorage fallback when Supabase is temporarily unavailable

## Setup
1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Configure env vars:
   ```bash
   cp .env.example .env
   ```
   Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. In Supabase SQL editor, run:
   - `supabase-setup.sql`
4. Create at least one admin user in Supabase Auth (Email + Password).
5. Start app:
   ```bash
   pnpm dev
   ```

## Build
```bash
pnpm build
```


## Deploy on Vercel
1. Add these environment variables in Vercel Project Settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
2. Keep build settings (already in `vercel.json`):
   - Install: `pnpm install --frozen-lockfile`
   - Build: `pnpm build`
   - Output: `dist`
3. Deploy with CLI (after login):
   ```bash
   pnpm dlx vercel --prod
   ```

### If you want me to deploy for you
Share these values and I can run deployment from this environment:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`


## GitHub → Vercel auto-deploy checklist
For automatic deployments (push to GitHub triggers Vercel), ensure:
1. This local repo has a Git remote configured to your GitHub repository.
2. Vercel project is connected to that same GitHub repository.
3. Vercel project env vars are set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. The deployment branch in Vercel matches the branch being pushed.
