# Technology Usage Map

## Document Control

| Field | Value |
| --- | --- |
| Document ID | `ARCH-TECH-002` |
| Owner | `Kuyash` |
| Status | `Draft` |
| Last Updated | `2026-02-09` |
| Version | `v0.1.0` |

## 1. Amaç

Bu dokuman, secilen teknolojilerin proje icinde nerede kullanildigini dosya/katman seviyesinde gosterir.

## 2. Katman Bazli Kullanim

| Katman | Kullanilan teknoloji | Nerede |
| --- | --- | --- |
| UI / Routing | `Next.js App Router`, `React` | `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/gunes-uclemesi/page.tsx`, `src/app/projeler/page.tsx`, `src/app/iletisim/page.tsx` |
| UI Bilesenleri | `React` | `src/components/layout/navbar.tsx` |
| Tip Kontratlari | `TypeScript` | `src/types/content.ts` |
| Icerik Veri Katmani | `TypeScript` | `src/content/profile.ts`, `src/content/projects.ts`, `src/content/sun-trilogy.ts`, `src/content/contact.ts` |
| API Katmani | `Next.js Route Handlers` | `src/app/api/contact/route.ts`, `src/app/api/health/route.ts` |
| Dogrulama | `TypeScript utility` | `src/lib/validation/contact.ts` |
| Guvenlik (Rate Limit) | `TypeScript utility` | `src/lib/security/rate-limit.ts` |
| E-posta Entegrasyonu | `fetch` + `Resend API` | `src/lib/email/send-contact-email.ts` |
| Stil | Global CSS | `src/app/globals.css` |

## 3. Calisma Zamani ve Araclar

| Alan | Yazilim | Nerede tanimli |
| --- | --- | --- |
| Paket yonetimi | `pnpm` | Komutlar ve lockfile akisi (`pnpm install`, `pnpm run ...`) |
| Build/Dev scripts | `Next.js CLI` | `package.json` -> `dev`, `build`, `start`, `lint` |
| Tip denetimi | `TypeScript compiler` | `tsconfig.json` |
| Lint denetimi | `ESLint` + `eslint-config-next` | `package.json` (devDependencies), `.eslintrc.json` |
| Runtime config | Ortam degiskenleri | `.env.example`, `docs/setup/setup.md` |

## 4. Contact Akisi Uzerinden Teknoloji Izleme

1. Form UI (`React`) `src/app/iletisim/page.tsx` icinde render edilir.
2. Istek `POST /api/contact` (`Next.js Route Handler`) ile alinir.
3. Veri `validateContactPayload` ile dogrulanir (`src/lib/validation/contact.ts`).
4. Rate-limit `isAllowedByRateLimit` ile kontrol edilir (`src/lib/security/rate-limit.ts`).
5. `sendContactEmail` ile provider'a iletilir (`src/lib/email/send-contact-email.ts`).

## 5. Bakim Notu

Yeni teknoloji eklendiginde bu dosyada 3 bilgi mutlaka guncellenmelidir:
- Neden eklendi?
- Hangi dosya/katmanda kullaniliyor?
- Operasyonel olarak hangi env veya script'e etkisi var?
