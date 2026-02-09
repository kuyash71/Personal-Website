# Personal Website

This repository contains a modular personal website with built-in multi-language support.

## Product Scope (v0.1)

- Primary navigation: `Home / Sun Trilogy / Projects / Contact`
- CV-style homepage
- `Sun Trilogy` section marked as WIP
- Projects page with GitHub repository links
- Contact form flow via `POST /api/contact`
- No login/sign-up in v1

## Localization

- Supported locales: `tr` and `en`
- Locale-based routes:
  - `/{locale}`
  - `/{locale}/sun-trilogy`
  - `/{locale}/projects`
  - `/{locale}/contact`
- Default routing behavior:
  - `/` redirects to `/tr`
  - Legacy Turkish slugs are redirected to canonical localized routes by `middleware.ts`

## Current Tech Skeleton

- `src/app`: Route-level pages and API routes
- `src/i18n`: Locale configuration and translation dictionaries
- `src/components`: Shared UI/layout components
- `src/content`: Locale-based content data
- `src/lib`: Validation, security, integrations, and constants
- `src/types`: Shared TypeScript contracts
- `docs`: Architecture, content, security, and setup docs

## API Routes

- `/api/health` -> health check
- `/api/contact` -> contact submission endpoint

## Runtime and Tooling

- Node.js is pinned to major `22` via `.nvmrc` and `.node-version`
- `package.json` engines:
  - `node: 22.x`
  - `pnpm: 9.x`
- Automated tests:
  - `pnpm run test` (Vitest run mode)
  - `pnpm run test:watch` (Vitest watch mode)
  - `pnpm run test:e2e` (Playwright smoke E2E tests)
  - `pnpm run test:e2e:install` (installs Playwright Chromium browser)
- Environment checks:
  - `pnpm run verify:env` (validates `.env.local` contract)
  - `pnpm run verify:env:prod` (validates exported production env contract)
  - `pnpm run verify:env:prod:file` (validates `.env.production.local` contract)

## Environment

Copy `.env.example` to `.env.local` and set required values before testing contact delivery.
Current email pipeline supports `EMAIL_PROVIDER=resend`.
`CONTACT_MAX_PAYLOAD_BYTES` is optional and defaults to `10000` if omitted.

## Next Step

After this skeleton baseline, the next phase is production-grade UI polish and end-to-end contact delivery verification in both locales.
