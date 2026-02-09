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
```

## 3. Environment Variables

| Variable | Required | Default | Description | Example |
| --- | --- | --- | --- | --- |
| `NODE_ENV` | Yes | `development` | Runtime mode | `production` |
| `CONTACT_TO_EMAIL` | Yes | - | Contact destination mailbox | `name@example.com` |
| `EMAIL_PROVIDER` | Yes | - | Email provider identifier | `resend` |
| `EMAIL_API_KEY` | Yes | - | Provider API key | `re_xxx` |
| `EMAIL_FROM` | Yes | - | Verified sender identity | `Portfolio <onboarding@resend.dev>` |
| `RATE_LIMIT_WINDOW_MS` | Yes | `600000` | Rate-limit window | `600000` |
| `RATE_LIMIT_MAX_REQUESTS` | Yes | `5` | Max requests per window | `5` |

## 4. Standard Scripts

| Command | Purpose | When |
| --- | --- | --- |
| `pnpm run dev` | Start local development server | Daily development |
| `pnpm run lint` | Static quality checks | Before commit |
| `pnpm run test` | Automated tests | Before merge |
| `pnpm run build` | Production build verification | Before release |

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
  `lint`, `test`, `build`, `security scan`
- Deployment targets:
  Preview + production
- Rollback strategy:
  Re-deploy last stable release

### 6.1 Versioning Convention

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
