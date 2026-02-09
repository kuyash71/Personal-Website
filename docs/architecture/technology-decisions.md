# Technology Decisions

## Document Control

| Field | Value |
| --- | --- |
| Document ID | `ARCH-TECH-001` |
| Owner | `Kuyash` |
| Status | `Draft` |
| Last Updated | `2026-02-09` |
| Version | `v0.1.0` |

## 1. Objective

Document why each core technology was selected and which problem it solves.

## 2. Technology Choices

| Technology | Category | Why It Was Chosen | Notes |
| --- | --- | --- | --- |
| `Next.js 15` | Web framework | App Router modularity, server + API support in one codebase | Strong fit for portfolio sites |
| `React 19` | UI layer | Component-based composition and broad ecosystem support | Foundation of all UI modules |
| `TypeScript 5` | Type safety | Enforces content and API contracts at compile time | Reduces refactor risk |
| `ESLint` + `eslint-config-next` | Code quality | Catches issues early and enforces consistent standards | Strict lint workflow |
| `Vitest` | Automated testing | Fast TypeScript-native unit testing with simple setup | Baseline unit regression coverage |
| `pnpm` | Package manager | Fast installs and deterministic dependency management | Preferred local + CI workflow |
| `Resend API` | Email provider | Simple server-side delivery for contact submissions | Configurable via env |
| `Middleware locale routing` | Internationalization infrastructure | Guarantees locale-prefixed navigation and legacy slug redirects | Enables smooth TR/EN UX |

## 3. Architecture Principle Alignment

- Modularity:
  App Router and locale segments allow clean feature expansion.
- Maintainability:
  TypeScript + ESLint keeps architecture and contracts consistent.
- Security/operations:
  Contact API remains server-side with explicit validation and rate controls.

## 4. Optional Future Additions

| Candidate | When Needed | Impact |
| --- | --- | --- |
| `Playwright` | Reliable browser-level E2E coverage | Verifies localized routing + form flows |
| `Sentry` | Production observability needs increase | Centralized error monitoring |
| `next-intl` or equivalent | If localization complexity scales | Structured translation management |

## 5. Decision Summary

- Core stack: `Next.js + React + TypeScript`
- Code quality baseline: `ESLint` with Next rules
- Testing baseline: `Vitest` for unit tests
- Package management: `pnpm`
- Contact transport: `Resend` provider path
- Localization architecture: `/{locale}` route model with middleware normalization
