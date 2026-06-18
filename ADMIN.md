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
| `GITHUB_TOKEN` | **Required on Vercel** | GitHub PAT with `contents: write` on the repo |

Without `GITHUB_TOKEN` on Vercel, admin login works but **saving enabled labs will fail** because the serverless filesystem is read-only.

| `GITHUB_REPO` | Optional | Default: `denverjhoncalantoc-mcst/mcst-it-audit-lab` |
| `GITHUB_BRANCH` | Optional | Default: `main` |
| `ENABLED_LAB_IDS` | Fallback | Default: `1` if config file cannot be read |

### GitHub token setup

1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens**
2. **Resource owner:** your GitHub account (must have write access to the repo)
3. **Repository access:** Only select repositories → `mcst-it-audit-lab`
4. **Permissions → Repository permissions → Contents:** Read and write
5. Generate the token and copy it once
6. In Vercel, set:
   - `GITHUB_TOKEN` = the token only (no quotes, no spaces)
   - `GITHUB_REPO` = `denverjhoncalantoc-mcst/mcst-it-audit-lab` (not the full `https://github.com/...` URL)
   - `GITHUB_BRANCH` = `main`
7. Apply to **Production** (and Preview if you test there)
8. **Redeploy** after saving env vars

**Organization SSO:** If `denverjhoncalantoc-mcst` uses SAML SSO, open the token on GitHub and click **Configure SSO** → **Authorize** for that organization. Without this step, GitHub returns 403 even with a valid token.

**Diagnostic (after admin login):** open `/api/admin/github-status` in the browser to see whether Vercel can read `labs-config.json` and the exact GitHub error message.

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
| `Unable to read labs-config.json from GitHub` | Open `/api/admin/github-status` while logged in. Usually: SSO not authorized, wrong `GITHUB_REPO` format, or token missing Contents write |
| `GitHub token lacks repository access` | Authorize token for org SSO; confirm Contents: Read and write on `mcst-it-audit-lab` |
| `GitHub rejected the token` | Regenerate token; paste into Vercel `GITHUB_TOKEN` without quotes; redeploy |
| `Unable to save laboratory settings` | Add `GITHUB_TOKEN` with repo write access in Vercel → Redeploy |
| `EROFS: read-only file system` | Same fix — `GITHUB_TOKEN` was missing on Vercel |
| Works locally but not on Vercel | Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in Vercel → Environment Variables → Redeploy |

## Quick release presets (admin panel)

- **Lab 1 only** — initial rollout
- **Through Lab 8** — guided investigations
- **Enable all labs** — full semester access
