# Personal Website

This repository contains the modular skeleton for a personal website.

## Product Scope (v0.1)

- Navbar: `Anasayfa / Güneş Üçlemesi / Projeler / İletişim`
- CV-style homepage
- `Güneş Üçlemesi` section marked as WIP
- Projects page with GitHub repository links
- Contact form flow via `POST /api/contact`
- No login/sign-up in v1

## Current Tech Skeleton

- `src/app`: Route-level pages and API routes
- `src/components`: Shared UI/layout components
- `src/content`: Versioned site content
- `src/lib`: Validation, security, and constants
- `src/types`: Shared TypeScript contracts
- `docs`: Architecture, content, security, and setup docs

## Routes

- `/` -> `Anasayfa`
- `/gunes-uclemesi` -> `Güneş Üçlemesi` (WIP)
- `/projeler` -> `Projeler`
- `/iletisim` -> `İletişim`
- `/api/health` -> health check
- `/api/contact` -> contact submission endpoint

## Environment

Copy `.env.example` to `.env.local` and set values before testing contact delivery.
Current API skeleton supports `EMAIL_PROVIDER=resend`.

## Next Step

After skeleton review, we can implement final UI design and email provider integration.
