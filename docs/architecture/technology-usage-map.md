# Technology Usage Map

## Document Control

| Field | Value |
| --- | --- |
| Document ID | `ARCH-TECH-002` |
| Owner | `Kuyash` |
| Status | `Draft` |
| Last Updated | `2026-02-09` |
| Version | `v0.1.0` |

## 1. Objective

Map each selected technology to concrete files and runtime layers.

## 2. Layer-to-File Mapping

| Layer | Technology | Where It Is Used |
| --- | --- | --- |
| Routing / page tree | `Next.js App Router` | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/[locale]/*` |
| Localization routing | `Next.js middleware` | `middleware.ts` |
| Locale config and dictionaries | TypeScript modules | `src/i18n/config.ts`, `src/i18n/messages.ts` |
| Shared UI | `React` components | `src/components/layout/navbar.tsx` |
| Content model | Typed content objects | `src/content/profile.ts`, `src/content/projects.ts`, `src/content/sun-trilogy.ts` |
| API handlers | `Next.js Route Handlers` | `src/app/api/contact/route.ts`, `src/app/api/health/route.ts` |
| Validation | Utility module | `src/lib/validation/contact.ts` |
| Rate limiting | Utility module | `src/lib/security/rate-limit.ts` |
| Email integration | `fetch` + provider API | `src/lib/email/send-contact-email.ts` |
| Automated tests | `Vitest` | `vitest.config.ts`, `tests/unit/contact-validation.test.ts` |
| Styling | Global CSS | `src/app/globals.css` |

## 3. Toolchain and Runtime Controls

| Area | Tooling | Source of Truth |
| --- | --- | --- |
| Dependency management | `pnpm` | `package.json` + lockfile workflow |
| Node runtime pinning | Node 22 | `.nvmrc`, `.node-version`, `package.json -> engines` |
| Type checking | TypeScript | `tsconfig.json` |
| Linting | ESLint + Next config | `.eslintrc.json`, `package.json` |
| Test runner | Vitest | `vitest.config.ts`, `package.json`, `tests/unit/*` |
| Runtime secrets | Environment variables | `.env.example`, `docs/setup/setup.md` |

## 4. Contact Flow Trace

1. Localized contact page renders at `/{locale}/contact`.
2. Form submits to `POST /api/contact`.
3. Payload validated by `validateContactPayload`.
4. Anti-spam checks run through `isAllowedByRateLimit`.
5. Email is forwarded by `sendContactEmail`.

## 5. Maintenance Rule

Whenever a new technology is introduced, update this document with:
- Why it was added.
- Exactly where it is used.
- Which env/script/release process it affects.
