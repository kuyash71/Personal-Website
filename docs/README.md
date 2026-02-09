# Documentation Index

This folder contains living documentation for the personal website.
Update `Owner`, `Last Updated`, and `Status` fields after major changes.

## Document Map

| Path | Purpose |
| --- | --- |
| `docs/architecture/architecture.md` | System architecture, localization model, and technical decisions |
| `docs/architecture/technology-decisions.md` | Rationale behind technology choices |
| `docs/architecture/technology-usage-map.md` | File-level map of where each technology is used |
| `docs/content/content.md` | Page-level content plan, messaging, and SEO strategy |
| `docs/security/security.md` | Security baseline and contact endpoint controls |
| `docs/setup/setup.md` | Setup, environment, CI/CD, and release operations |

## Current Product Model (v0.1)

- Navigation:
  `Home / Sun Trilogy / Projects / Contact`
- Core scope:
  - CV-style homepage
  - Sun Trilogy (WIP)
  - Projects with GitHub links
  - Contact form with email delivery
- Out of scope (v1):
  - Login/sign-up
  - Forum/blog modules
- Multi-language support:
  - Turkish (`tr`) and English (`en`)
  - Locale-based routing under `/{locale}`

## Documentation Standards

- Use clear, testable statements.
- Link requirements to implementation files where possible.
- Track major decisions with date + rationale.
- Review setup and security docs before each release.
