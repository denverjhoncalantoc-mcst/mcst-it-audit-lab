# Deploy MCST IT Audit Lab on Vercel (with Alumnilink)

This app is a **static Vite + React SPA**. Deploy it as a **separate Vercel project** on the same Vercel account/team as **Alumnilink** (recommended). Do not merge it into the Next.js Alumnilink codebase.

## Recommended setup

| Item | Value |
|------|--------|
| Vercel project name | `mcst-it-audit-lab` or `peis002-audit-lab` |
| Framework | Vite (auto-detected) |
| Root directory | `mcst-it-audit-lab` (if repo contains multiple folders) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | `npm install` |

`vercel.json` in this folder already configures SPA routing and build settings.

## Option A — New project on same Vercel account as Alumnilink

### 1. Put this folder in its own Git repository

Deploy from a dedicated repo (not your Windows user home folder).

```bash
cd mcst-it-audit-lab
git init
git add .
git commit -m "Prepare MCST IT Audit Lab for Vercel"
```

Push to GitHub, GitLab, or Bitbucket.

### 2. Import in Vercel

1. Open [vercel.com](https://vercel.com) and sign in with the **same account** used for Alumnilink.
2. **Add New… → Project**
3. Import the repository.
4. If the repo root is the parent folder, set **Root Directory** to `mcst-it-audit-lab`.
5. Confirm settings:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **Deploy**.

### 3. Custom domain (optional, alongside Alumnilink)

Example subdomain on your Alumnilink domain:

| Type | Name | Value |
|------|------|--------|
| CNAME | `audit` or `peis002` | `cname.vercel-dns.com` |

In Vercel → **mcst-it-audit-lab** → **Settings → Domains**, add:

- `audit.your-alumnilink-domain.com`
- or `peis002.your-alumnilink-domain.com`

Alumnilink and this lab can share one domain with different subdomains.

## Option B — Deploy from CLI (same Vercel login as Alumnilink)

```bash
cd mcst-it-audit-lab
npm install
npm run build
npx vercel login
npx vercel
```

First deploy creates a preview URL. For production:

```bash
npx vercel --prod
```

Link to an existing team when prompted (same team as Alumnilink).

## Option C — Subpath under Alumnilink domain (advanced)

Only use this if you must serve the app at e.g. `https://alumnilink.com/peis002/` instead of a subdomain.

1. In Vercel project **Environment Variables**, add:

   | Name | Value |
   |------|--------|
   | `VITE_BASE_PATH` | `/peis002/` |

2. Redeploy.

3. Configure your main Alumnilink domain/proxy to route `/peis002/*` to this Vercel project, or use a Vercel path-based setup with a dedicated subdomain (Option A is simpler).

## Link from Alumnilink (optional)

Add a link in Alumnilink (footer, school tools, or MCST section) pointing to the deployed URL, for example:

- `https://audit.your-domain.com`
- or `https://mcst-it-audit-lab.vercel.app`

## Verify after deploy

- [ ] Home page loads
- [ ] `/laboratory` and `/laboratory/lab-1` work (refresh does not 404)
- [ ] `/evidence`, `/company`, `/hitl`, `/ai-declaration`, `/final-project` work
- [ ] Assets and favicon load (no blank page)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on refresh | Ensure `vercel.json` rewrites are present and deployed |
| Blank page / broken assets | Check `VITE_BASE_PATH` matches your URL path; must end with `/` |
| Wrong project root | Set **Root Directory** to `mcst-it-audit-lab` in Vercel |
| Build fails on Vercel | Use Node 18+ (default on Vercel is fine) |

## Local production test

```bash
npm run build
npm run preview
```

Open the preview URL and test navigation before deploying.
