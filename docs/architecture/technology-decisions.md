# Technology Decisions

## Document Control

| Field | Value |
| --- | --- |
| Document ID | `ARCH-TECH-001` |
| Owner | `Kuyash` |
| Status | `Draft` |
| Last Updated | `2026-02-09` |
| Version | `v0.1.0` |

## 1. Amaç

Bu dokuman, projede kullanilan yazilimlari, neden secildiklerini ve hangi probleme cevap verdiklerini netlestirir.

## 2. Teknoloji Secimleri

| Yazilim / Teknoloji | Kategori | Neden Secildi | Not |
| --- | --- | --- | --- |
| `Next.js 15` | Web framework | App Router ile moduler route yapisi, SSR/SSG esnekligi, tek kod tabaninda web + API endpoint | Kisisel site icin hizli gelistirme |
| `React 19` | UI kutuphanesi | Bilesen tabanli gelistirme, yeniden kullanilabilirlik, Next.js ile dogal uyum | UI katmaninin temeli |
| `TypeScript 5` | Tip guvenligi | Veri kontratlarini (`Profile`, `Project`, `ContactPayload`) compile-time kontrol eder | Refactor riskini azaltir |
| `ESLint` + `eslint-config-next` | Kod kalitesi | Hata yakalama, standart kod stili, Next.js best-practice uyumu | `strict` yaklasimi desteklenir |
| `pnpm` | Paket yonetimi | Hizli kurulum, verimli disk kullanimi, lockfile ile deterministik bagimlilik | Gelistirme ve CI akisinda kullanilir |
| `Resend API` (provider: `resend`) | E-posta gonderimi | Contact form mesaji icin sade HTTP API, server-side entegrasyon kolayligi | `EMAIL_PROVIDER=resend` |

## 3. Mimari Ilke Uyumu

- Modulerlik:
  Next.js route bazli yapi sayesinde yeni bolumler (`/blog`, `/forum`) sonradan bagimsiz eklenebilir.
- Bakim kolayligi:
  TypeScript + ESLint kombinasyonu teknik borcun erken birikmesini engeller.
- Guvenlik ve operasyon:
  Contact API icin server-side validasyon, honeypot ve rate-limit katmanlari uygulanabilir.

## 4. Opsiyonel Gelecek Teknolojiler

| Aday | Ne zaman gerekir | Etki |
| --- | --- | --- |
| `Vitest` veya `Jest` | Unit/integration testler yazilmaya baslandiginda | Test guvencesi artar |
| `Playwright` | E2E akislar (form, navbar, route gecisleri) onem kazandiginda | Gercek tarayici testi eklenir |
| `Sentry` | Production hata gorunurlugu ihtiyaci arttiginda | Hata izleme merkezi hale gelir |
| `i18n` kutuphanesi | TR/EN coklu dil gereksinimi netlestiginde | Icerik yonetimi standardize olur |

## 5. Karar Ozeti

- Cekirdek stack: `Next.js + React + TypeScript`
- Kalite bari: `ESLint (Next uyumlu)`
- Paket yonetimi: `pnpm`
- Contact iletimi: `Resend` (env tabanli provider secimi)
