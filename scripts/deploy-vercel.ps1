# Deploy MCST IT Audit Lab to Vercel (same account as Alumnilink)
# Run from project root: .\scripts\deploy-vercel.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

Write-Host "Building production bundle..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Logging in to Vercel (browser window will open if needed)..." -ForegroundColor Cyan
npx vercel login
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Deploying to production..." -ForegroundColor Cyan
npx vercel --prod --yes
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host ""
Write-Host "Done. Copy the production URL into Alumnilink .env.local:" -ForegroundColor Green
Write-Host "NEXT_PUBLIC_PEIS002_AUDIT_LAB_URL=https://your-deployment-url" -ForegroundColor Yellow
