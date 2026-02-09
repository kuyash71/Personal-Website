# Personal Website Architecture

## Document Control

| Field | Value |
| --- | --- |
| Document ID | `ARCH-001` |
| Owner | `Kuyash` |
| Reviewers | `TBD` |
| Status | `Draft` |
| Last Updated | `2026-02-09` |
| Version | `v0.1.0` |

## 1. Purpose and Scope

- Purpose:
  Provide a personal website that showcases profile, software projects, and a fantasy universe trilogy.
- In scope:
  - Localized navigation (`tr`, `en`)
  - CV-style homepage
  - Sun Trilogy section (WIP)
  - Projects listing with GitHub links
  - Contact form with email forwarding
- Out of scope:
  - Login/sign-up system
  - Membership panel
  - Built-in forum/blog in v1

## 2. Business and Technical Goals

- Functional goals:
  - Present a clear personal profile and portfolio.
  - Route visitors to project repositories quickly.
  - Accept inbound messages via web form and forward via email.
  - Keep Sun Trilogy visible as an evolving WIP module.
- Non-functional goals:
  - Fast performance across desktop and mobile.
  - Easy content updates via code.
  - Modular structure that can accept future modules without breaking existing routes.
- Constraints:
  - Single maintainer.
  - Low operational overhead for the first release.
  - Avoid unnecessary backend complexity.

### 2.1 Versioning Policy (Project-Specific)

This project uses a custom 3-index release model instead of strict semantic versioning.

| Index | Format | Scope | Trigger Examples |
| --- | --- | --- | --- |
| 1st index | `1.0`, `2.0`, `3.0` | Major updates | MVP completion to `1.0`; broad structural evolution for `2.0+` |
| 2nd index | `1.1`, `1.2` | Medium updates | New system module, API subsystem revision |
| 3rd index | `1.1a`, `1.1b` | Small updates | Bug-fix, hot-fix, minor improvements |

Rules:
- MVP target release: `1.0`.
- Major structural updates increment index 1.
- Medium feature/system updates increment index 2.
- Small fixes increment index 3 with alphabetical suffix.
- When index 1 or 2 changes, index 3 resets.

## 3. System Context

- Users/personas:
  - Visitor: browses profile, projects, and uses contact form.
  - Owner: updates content and monitors contact flow.
- External systems:
  - Email provider API (currently `resend` option)
  - GitHub repository URLs
- Entry points:
  - Web routes: `/{locale}`, `/{locale}/sun-trilogy`, `/{locale}/projects`, `/{locale}/contact`
  - API routes: `POST /api/contact`, `GET /api/health`

## 4. Information Architecture and Navigation

| Route | Nav Label (`en`) | Nav Label (`tr`) | Release State |
| --- | --- | --- | --- |
| `/{locale}` | `Home` | `Anasayfa` | `Ready` |
| `/{locale}/sun-trilogy` | `Sun Trilogy` | `Gunes Uclemesi` | `WIP` |
| `/{locale}/projects` | `Projects` | `Projeler` | `Ready` |
| `/{locale}/contact` | `Contact` | `Iletisim` | `Ready` |

Navigation is global and sticky across localized pages.
Language switching (`TR`/`EN`) is available in the navbar and keeps users on the same page path across locales.

## 5. Application Architecture

- Layers:
  - `Presentation`: route pages, shared layout, UI components
  - `Localization`: locale config + dictionaries (`src/i18n`)
  - `Content`: locale-specific content data
  - `Integration`: contact validation, rate-limit, email provider bridge
- Key directories:

| Path | Responsibility |
| --- | --- |
| `src/app` | App Router pages and API route handlers |
| `src/app/[locale]` | Localized page tree |
| `src/i18n` | Locale registry and message dictionaries |
| `src/components` | Shared UI components (navbar, sections) |
| `src/content` | Locale-aware profile/project/story data |
| `src/lib` | Validation, security, integrations, utilities |
| `src/types` | Shared data contracts |
| `tests/*` | Unit, integration, accessibility, E2E tests |

## 6. Core Data Contracts

### 6.1 `Profile`

| Field | Type | Required |
| --- | --- | --- |
| `fullName` | `string` | Yes |
| `title` | `string` | Yes |
| `summary` | `string` | Yes |
| `skills` | `string[]` | Yes |
| `socialLinks` | `object[]` | Yes |

### 6.2 `Project`

| Field | Type | Required |
| --- | --- | --- |
| `name` | `string` | Yes |
| `description` | `string` | Yes |
| `techStack` | `string[]` | Yes |
| `repoUrl` | `string` | Yes |
| `liveUrl` | `string` | No |
| `status` | `enum(active|archived|wip)` | Yes |

### 6.3 `SunTrilogyUniverse`

| Field | Type | Required |
| --- | --- | --- |
| `id` | `string` | Yes |
| `name` | `string` | Yes |
| `tagline` | `string` | Yes |
| `state` | `enum(wip|ready)` | Yes |
| `coverImage` | `string` | No |

### 6.4 `ContactMessage`

| Field | Type | Required |
| --- | --- | --- |
| `name` | `string` | Yes |
| `email` | `string` | Yes |
| `subject` | `string` | Yes |
| `message` | `string` | Yes |
| `createdAt` | `datetime` | Generated |

## 7. Contact Delivery Flow

1. Visitor submits form at `/{locale}/contact`.
2. Request is sent to `POST /api/contact`.
3. Server validates payload and applies anti-spam controls.
4. Email integration forwards message to configured destination.
5. API returns success/failure response for UI handling.
6. Sensitive content is not persisted by default in v1.

## 8. Security and Privacy by Design

- Authentication/authorization:
  - Public site, no user auth in v1.
  - Contact endpoint allows only required method and validated payload.
- Validation and output safety:
  - Server-side schema-like checks for all contact fields.
  - Output rendering avoids untrusted HTML injection patterns.
- Secret management:
  - Email credentials in environment variables only.
- Data retention:
  - Minimal logging, no default long-term message storage.

## 9. Reliability and Performance

- Goals:
  - Fast initial render and responsive localized navigation.
  - Clear API failure messaging for contact flow.
- Approach:
  - Lightweight UI, optimized assets, and reduced unnecessary JS.
- Failure behavior:
  - Provider failure returns actionable API response.
  - Non-critical modules remain isolated.

## 10. Observability

- Logging:
  - Contact API response class, validation failures, rate-limit hits.
- Metrics:
  - Submission success/failure rates.
- Alerts:
  - Notify on repeated provider failures.

## 11. Deployment Architecture

- Environments:
  - `local`, `preview`, `production`
- Promotion:
  - PR preview -> main -> production
- Rollback:
  - Re-deploy last stable release
- Runtime configuration:
  - `CONTACT_TO_EMAIL`
  - `EMAIL_PROVIDER`
  - `EMAIL_API_KEY`
  - `EMAIL_FROM`
  - `RATE_LIMIT_WINDOW_MS`
  - `RATE_LIMIT_MAX_REQUESTS`

## 12. Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation | Owner |
| --- | --- | --- | --- | --- |
| Contact spam | High | Medium | Validation + honeypot + rate-limit | Owner |
| Email provider outage | Medium | Medium | Retries/fallback plan + clear error | Owner |
| Content staleness | Medium | Medium | Monthly review cycle | Owner |
| Future module regression | Medium | Low | Route-level modular design | Owner |

## 13. Decision Log (ADR Links)

| Date | Decision | Status | Link |
| --- | --- | --- | --- |
| `2026-02-09` | Core 4-section navigation accepted | `accepted` | `docs/architecture/architecture.md` |
| `2026-02-09` | No auth in v1 | `accepted` | `docs/architecture/architecture.md` |
| `2026-02-09` | Sun Trilogy starts as WIP | `accepted` | `docs/architecture/architecture.md` |
| `2026-02-09` | Custom 3-index versioning model adopted | `accepted` | `docs/architecture/architecture.md` |
| `2026-02-09` | Locale-based routing for `tr`/`en` adopted | `accepted` | `docs/architecture/architecture.md` |
| `2026-02-09` | Contact API responses are locale-aware (`tr`/`en`) | `accepted` | `docs/architecture/architecture.md` |
| `2026-02-09` | Vitest adopted as baseline unit test framework | `accepted` | `docs/architecture/architecture.md` |

## 14. Open Questions

- [ ] Should project content sync with GitHub API automatically?
- [ ] Do we need localized slug differences per locale, or keep canonical shared slugs?
