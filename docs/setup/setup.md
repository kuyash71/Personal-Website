# Setup and Operations

## Document Control

| Field | Value |
| --- | --- |
| Document ID | `SETUP-001` |
| Owner | `Kuyash` |
| Status | `Draft` |
| Last Updated | `2026-02-09` |
| Version | `v0.1.0` |

## 1. Prerequisites

- OS support:
  Linux, macOS, Windows (WSL recommended)
- Required tools and versions:
  - Node.js: `22.x` (LTS)
  - Package manager: `pnpm 9.x` (or `npm 10.x`)
  - Git: `2.40+`
  - Playwright browser runtime (Chromium for E2E smoke tests)
- Version pinning sources:
  - `.nvmrc`: `22`
  - `.node-version`: `22`
  - `package.json -> engines`: `node: 22.x`, `pnpm: 9.x`
- Access requirements:
  - Repository access
  - Deployment environment variable access

## 2. Repository Bootstrap

```bash
# 1) Clone repository
git clone <repo-url>
cd Personal-Website

# 2) Install dependencies
pnpm install

# 3) Configure environment
cp .env.example .env.local

# 4) Run development server
pnpm run dev

# 5) (Optional) Install browser for E2E smoke tests
pnpm run test:e2e:install
```

## 3. Environment Variables

| Variable | Required | Default | Description | Example |
| --- | --- | --- | --- | --- |
| `NODE_ENV` | Yes | `development` | Runtime mode | `production` |
| `CONTACT_TO_EMAIL` | Yes | - | Contact destination mailbox | `name@example.com` |
| `EMAIL_PROVIDER` | Yes | - | Email provider identifier | `resend` |
| `EMAIL_API_KEY` | Yes | - | Provider API key | `re_xxx` |
| `EMAIL_FROM` | Yes | - | Verified sender identity | `Portfolio <onboarding@resend.dev>` |
| `CONTACT_MAX_PAYLOAD_BYTES` | No | `10000` | Maximum accepted request payload size for contact endpoint | `10000` |
| `RATE_LIMIT_WINDOW_MS` | Yes | `600000` | Rate-limit window | `600000` |
| `RATE_LIMIT_MAX_REQUESTS` | Yes | `5` | Max requests per window | `5` |

## 4. Standard Scripts

| Command | Purpose | When |
| --- | --- | --- |
| `pnpm run dev` | Start local development server | Daily development |
| `pnpm run lint` | Static quality checks | Before commit |
| `pnpm run test` | Run Vitest in CI mode | Before merge |
| `pnpm run test:watch` | Run Vitest in watch mode | During feature development |
| `pnpm run test:e2e:install` | Install Playwright Chromium browser | Initial setup / CI image prep |
| `pnpm run test:e2e` | Run Playwright smoke E2E tests | Before release / navigation checks |
| `pnpm run test:e2e:ui` | Run Playwright with UI mode | Local debugging |
| `PLAYWRIGHT_BASE_URL=<url> pnpm run test:e2e` | Run E2E against deployed URL | Pre-launch production verification |
| `pnpm run build` | Production build verification | Before release |
| `pnpm run verify:env` | Validate local `.env.local` contract | Before local QA and integration testing |
| `pnpm run verify:env:prod` | Validate production env values from runtime/exported env | Before production deploy |
| `pnpm run verify:env:prod:file` | Validate `.env.production.local` contract | Before production deploy |

## 5. Development Workflow

- Branch strategy:
  Protected `main`, short-lived feature branches.
- Commit convention:
  `feat:`, `fix:`, `docs:`, `refactor:`
- PR checklist baseline:
  Lint + test + build + docs updates.
- Definition of done:
  Tests pass, docs updated, no known regressions.

## 6. CI/CD Overview

- CI provider:
  GitHub Actions
- Required checks:
  `lint`, `test`, `build`, `e2e smoke`, `security scan`
- Workflow files:
  `.github/workflows/ci.yml`, `.github/workflows/preview.yml`
- Deployment targets:
  Preview + production
- Rollback strategy:
  Re-deploy last stable release

### 6.1 Preview Deployment Flow

- Provider:
  Vercel Preview Deployments via GitHub Actions
- Trigger:
  Pull requests targeting `main`
- Behavior:
  Deploys preview and posts URL as a PR comment
- Required GitHub repository secrets:
  `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

### 6.2 Versioning Convention

- 1st index (`1.0`, `2.0`, `3.0`):
  Major updates. MVP completion target is `1.0`.
- 2nd index (`1.1`, `1.2`):
  Medium updates (new systems, API subsystem changes).
- 3rd index (`1.1a`, `1.1b`):
  Small changes (bug-fix/hot-fix).
- Reset rule:
  When index 1 or 2 changes, index 3 resets.

## 7. Release Checklist

- [ ] Lint/test/build pass.
- [ ] Security checks pass.
- [ ] Documentation updated.
- [ ] Version bump completed.
- [ ] Deployment and smoke checks completed.

## 8. Troubleshooting

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| Contact form fails | Missing/invalid email credentials | Verify `.env` values and redeploy |
| Build failure | Runtime/dependency mismatch | Re-check Node and pnpm versions |
| Style issues | Cached old assets | Clear cache and rebuild |
| Locale route mismatch | Missing locale prefix or legacy slug | Verify middleware route normalization |

## 9. Maintenance Cadence

- Dependency updates:
  Monthly
- Security patch window:
  24-48 hours for critical issues
- Rollback drill:
  Validate rollback path monthly

## 10. Production Deployment Runbook

### 10.1 Release Preconditions

- `main` branch CI is green:
  `lint`, `test`, `build`, `e2e smoke`, `security scan`.
- Production environment variables are configured in Vercel:
  `CONTACT_TO_EMAIL`, `EMAIL_PROVIDER`, `EMAIL_API_KEY`, `EMAIL_FROM`, `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX_REQUESTS`, `CONTACT_MAX_PAYLOAD_BYTES` (optional, defaults to `10000`).
- Latest PR preview is reviewed for:
  `/{locale}` routing, navbar links, and contact form behavior.

### 10.1.1 Environment Verification Procedure

- Local contract validation:
  run `pnpm run verify:env` and confirm `[OK] Environment verification passed.`
- Production contract validation:
  run `pnpm run verify:env:prod` in an environment where production values are exported.
- Production file validation (recommended local flow):
  `vercel env pull .env.production.local --environment=production` then run `pnpm run verify:env:prod:file`.
- Fail criteria:
  any missing required variable, unsupported provider, invalid sender/recipient format, or invalid numeric limits.

### 10.2 Deployment Trigger

- Primary path:
  Merge approved PR into `main`.
- Expected platform behavior:
  Vercel auto-deploys production from the latest `main` commit.

### 10.3 Post-Deployment Smoke Checks

- Site routing:
  `/`, `/tr`, `/en`, `/tr/projects`, `/en/projects`, `/tr/contact`, `/en/contact`.
- API:
  `GET /api/health` returns `200` with `ok: true`.
- Contact flow:
  Submit one valid test message and verify mailbox delivery.
- Security/sanity:
  Verify no runtime secret is exposed in client-rendered content.

### 10.4 Release Recording

- Record release version and commit SHA in release notes.
- Confirm checklist section `Pre-Launch Checks` status.
- Tag release if required by project policy.

## 11. Rollback Path Validation

### 11.1 Rollback Trigger Conditions

- Production outage after deploy.
- Critical regression in routing, localization, or API behavior.
- Failed contact delivery caused by code-level change.

### 11.2 Rollback Procedure (Vercel Dashboard)

1. Open Vercel project `Deployments`.
2. Identify the last known stable production deployment.
3. Promote/redeploy that stable deployment to production.
4. Verify production URL points to the rolled-back version.

### 11.3 Rollback Verification Checklist

- `GET /api/health` returns `200`.
- Locale routes (`/tr`, `/en`) render correctly.
- Contact form renders and `POST /api/contact` returns expected response shape.
- No new critical/high vulnerabilities from dependency changes.

### 11.4 Incident Follow-Up

- Open incident note with:
  failed deployment SHA, rollback deployment ID, root cause, and prevention action.
- Add corrective action item to backlog before next release.

## 12. Lint Policy (Strict Baseline)

- Config source:
  `.eslintrc.json` extends `next/core-web-vitals` and `next/typescript`.
- Enforcement rule:
  `pnpm run lint` must pass in CI before merge.
- Merge gate:
  Any lint **error** blocks merge.
- Warning policy:
  Warnings are tracked and should be resolved in the nearest maintenance cycle; no unresolved warning should persist into a planned production release.
- Ownership:
  The maintainer is responsible for resolving lint regressions before approving deployment.
