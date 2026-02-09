# Setup and Operations - Personal Website

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
  Linux, macOS, Windows (WSL onerilir)
- Required tools and versions:
  - Node.js: `22.x` (LTS)
  - Package manager: `pnpm 9.x` (veya `npm 10.x`)
  - Git: `2.40+`
- Access requirements:
  - Repo clone yetkisi
  - Deploy/platform env degiskenlerine erisim

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
| `CONTACT_TO_EMAIL` | Yes | - | Contact formlarinin gidecegi hedef e-posta | `name@example.com` |
| `EMAIL_PROVIDER` | Yes | - | Kullanilan e-posta saglayici | `resend` |
| `EMAIL_API_KEY` | Yes | - | E-posta saglayici anahtari | `re_xxx` |
| `EMAIL_FROM` | Yes | - | Saglayici tarafinda dogrulanmis gonderici adresi | `Portfolio <onboarding@resend.dev>` |
| `RATE_LIMIT_WINDOW_MS` | Yes | `600000` | Rate limit pencere suresi | `600000` |
| `RATE_LIMIT_MAX_REQUESTS` | Yes | `5` | Pencere basina max istek | `5` |

## 4. Standard Scripts

| Command | Purpose | When to Run |
| --- | --- | --- |
| `pnpm run dev` | Local gelistirme sunucusu | Gunluk gelistirme |
| `pnpm run lint` | Statik analiz | Commit oncesi |
| `pnpm run test` | Otomatik testler | Merge oncesi |
| `pnpm run build` | Production build | Release oncesi |

## 5. Development Workflow

- Branch strategy:
  `main` korumali, ozellikler kisa omurlu feature branch.
- Commit convention:
  `feat:`, `fix:`, `docs:`, `refactor:`
- Pull request checklist:
  Lint/test/build + dokuman + gerekirse ekran goruntusu.
- Definition of done:
  Gerekli testler geciyor, dokuman guncel, regresyon yok.

## 6. CI/CD Overview

- CI provider:
  GitHub Actions
- Required checks:
  `lint`, `test`, `build`, `security scan`
- Deployment targets:
  Preview ortam + production
- Rollback procedure:
  Son stabil release versiyonuna donus.

### 6.1 Versioning Convention

- 1. indeks (`1.0`, `2.0`, `3.0`):
  Buyuk guncellemeler. MVP tamamlandiginda hedef surum `1.0`.
- 2. indeks (`1.1`, `1.2`):
  Orta olcekli degisiklikler (yeni sistem, API sistemi guncellemesi).
- 3. indeks (`1.1a`, `1.1b`):
  Kucuk degisiklikler (bug-fix, hot-fix).
- Kural:
  1. veya 2. indeks degistiginde 3. indeks harfi sifirlanir.

## 7. Release Checklist

- [ ] Lint, test, and build pass.
- [ ] Security checks pass.
- [ ] Docs updated.
- [ ] Version bump completed.
- [ ] Deployment and smoke tests completed.

## 8. Troubleshooting

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| Contact form gondermiyor | API key eksik/hatali | `.env` degiskenlerini kontrol et ve yeniden deploy et |
| Build fail oluyor | Paket uyumsuzlugu | Node ve package manager surumunu esitle |
| Stil bozuk gorunuyor | Cache/eski bundle | Cache temizle ve yeniden build al |

## 9. Maintenance Cadence

- Dependency updates:
  Aylik
- Security patch window:
  Kritiklerde 24-48 saat
- Backup/restore drill:
  Deploy rollback adimi aylik test edilir
