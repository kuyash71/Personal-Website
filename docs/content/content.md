# Content Strategy

## Document Control

| Field | Value |
| --- | --- |
| Document ID | `CONT-001` |
| Owner | `Kuyash` |
| Status | `Draft` |
| Last Updated | `2026-02-09` |
| Version | `v0.1.0` |

## 1. Content Goals

- Primary goal:
  Present a clear personal brand and technical portfolio.
- Secondary goals:
  - Introduce the Sun Trilogy world-building initiative.
  - Capture collaboration and outreach messages via contact form.
- Target audience:
  Recruiters, engineering peers, collaborators, and fantasy readers.
- Core message:
  "A developer building software projects while creating original fantasy universes."

## 2. Information Architecture (Localized)

| Route | Nav Label (`en`) | Nav Label (`tr`) | Intent | Primary CTA |
| --- | --- | --- | --- | --- |
| `/{locale}` | `Home` | `Anasayfa` | Present profile and CV summary | `View Projects` |
| `/{locale}/sun-trilogy` | `Sun Trilogy` | `Gunes Uclemesi` | Establish trilogy module as evolving WIP | `Coming Soon` |
| `/{locale}/projects` | `Projects` | `Projeler` | Showcase software projects and repos | `GitHub Repo` |
| `/{locale}/contact` | `Contact` | `Iletisim` | Enable direct outreach | `Send Message` |

## 3. Page-Level Content Brief

### 3.1 Home

- Hero:
  Name + concise role line.
- Summary:
  A short profile statement tailored by locale.
- Supporting sections:
  Skills and external links.

### 3.2 Sun Trilogy

- Objective:
  Keep narrative initiative visible while content is in progress.
- Structure:
  Three cards (Universe I/II/III) with WIP status.

### 3.3 Projects

- Card schema:
  Name, summary, stack, GitHub link, status.
- Depth target:
  Medium technical detail that drives repository clicks.

### 3.4 Contact

- Form fields:
  `name`, `email`, `subject`, `message`
- UX states:
  Clear validation + success/failure messaging.

## 4. Tone and Style Guide

- Voice:
  `clear`, `practical`, `original`
- Do:
  Keep copy concise and specific.
- Avoid:
  Generic marketing language and vague claims.
- Language support:
  Turkish (`tr`) + English (`en`) from v0.1 onward.
- Language switch UX:
  Navbar exposes `TR` and `EN` controls and preserves the current page while changing locale.

## 5. SEO Metadata Plan

| Route | Locale | Title | Description |
| --- | --- | --- | --- |
| `/{locale}` | `tr` | `Kuyash | Kisisel Website` | `Kisisel profil, teknik yetkinlikler ve one cikan projeler.` |
| `/{locale}` | `en` | `Kuyash | Personal Website` | `Personal profile, technical strengths, and featured projects.` |
| `/{locale}/sun-trilogy` | `tr` | `Gunes Uclemesi | WIP` | `Uc fantastik evrenden olusan proje alani.` |
| `/{locale}/sun-trilogy` | `en` | `Sun Trilogy | WIP` | `An evolving project space for three connected fantasy universes.` |
| `/{locale}/projects` | `tr` | `Projeler | Kuyash` | `Yazilim projeleri ve GitHub baglantilari.` |
| `/{locale}/projects` | `en` | `Projects | Kuyash` | `Software projects and GitHub repository links.` |
| `/{locale}/contact` | `tr` | `Iletisim | Kuyash` | `Web formu ile dogrudan ulasim.` |
| `/{locale}/contact` | `en` | `Contact | Kuyash` | `Direct outreach via website contact form.` |

## 6. Content Operations

- Source of truth:
  `src/content/*` and `src/i18n/messages.ts`
- Review cadence:
  Monthly content pass.
- Approval:
  Owner-managed in v1.
- Localization workflow:
  New content requires simultaneous TR and EN updates.

## 7. Accessibility Checklist

- [ ] Headings follow semantic hierarchy.
- [ ] Images include meaningful alt text.
- [ ] Links are descriptive.
- [ ] Contrast meets WCAG AA.
- [ ] Motion has reduced-motion fallback where needed.

## 8. Open Items

- [ ] Final naming + tagline polish for all trilogy cards.
- [ ] Final featured project order and selection.
- [ ] Locale-aware UI response handling for contact success/failure.
