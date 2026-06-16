# Admin Laboratory Control

Instructors can enable laboratories for all students through the admin panel.

## URLs

| Page | Path |
|------|------|
| Admin login | `/admin/login` |
| Laboratory control panel | `/admin` |

A small **Admin** link is also in the site footer.

## How it works

1. Admin signs in with `ADMIN_PASSWORD`.
2. Admin selects which labs (1–14) are enabled.
3. Settings are saved to `labs-config.json` in the GitHub repository (when `GITHUB_TOKEN` is set on Vercel).
4. All students receive the updated lab list from `/api/labs/enabled`.

At least one laboratory must remain enabled.

## Vercel environment variables

Set these in **Vercel → Project → Settings → Environment Variables**:

| Variable | Required | Description |
|----------|----------|-------------|
| `ADMIN_PASSWORD` | Yes | Instructor admin password |
| `ADMIN_SESSION_SECRET` | Recommended | Random string for session signing (can match a long password) |
| `GITHUB_TOKEN` | Yes for production saves | GitHub PAT with `contents: write` on the repo |
| `GITHUB_REPO` | Optional | Default: `denverjhoncalantoc-mcst/mcst-it-audit-lab` |
| `GITHUB_BRANCH` | Optional | Default: `main` |
| `ENABLED_LAB_IDS` | Fallback | Default: `1` if config file cannot be read |

### GitHub token setup

1. GitHub → **Settings → Developer settings → Personal access tokens**
2. Create a fine-grained token with **Contents: Read and write** on `mcst-it-audit-lab`
3. Add as `GITHUB_TOKEN` in Vercel
4. Redeploy

## Local development

- `npm run dev` — runs Vite with built-in `/api` support and reads `.env.local`
- `npx vercel dev` — alternative full-stack local server

Set credentials in `.env.local`:

```env
ADMIN_PASSWORD=your-instructor-password
ADMIN_SESSION_SECRET=some-long-random-secret
```

Restart `npm run dev` after changing `.env.local`.

Without `GITHUB_TOKEN` locally, admin save updates `labs-config.json` and `public/labs-config.json` on disk.

## Troubleshooting login

| Error | Fix |
|-------|-----|
| `Admin login is not configured` | Add `ADMIN_PASSWORD` in Vercel env vars or `.env.local`, then redeploy/restart |
| `Invalid admin credentials` | Password does not match `ADMIN_PASSWORD` exactly |
| Login succeeds but dashboard kicks you out | Redeploy after cookie fix; clear browser cookies for the site |
| `Unable to save laboratory settings` | Add `GITHUB_TOKEN` with repo write access in Vercel |
| Works locally but not on Vercel | Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in Vercel → Environment Variables → Redeploy |

## Quick release presets (admin panel)

- **Lab 1 only** — initial rollout
- **Through Lab 8** — guided investigations
- **Enable all labs** — full semester access
