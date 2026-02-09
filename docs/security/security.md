# Security Baseline - Personal Website

## Document Control

| Field | Value |
| --- | --- |
| Document ID | `SEC-001` |
| Owner | `Kuyash` |
| Security Reviewer | `TBD` |
| Status | `Draft` |
| Last Updated | `2026-02-09` |
| Version | `v0.1.0` |

## 1. Scope and Security Objectives

- In scope assets:
  - Public website pages
  - `POST /api/contact` endpoint'i
  - Environment secrets (email provider key)
- Data handled:
  - Contact form alanlari: ad, e-posta, konu, mesaj
  - Teknik log verileri (minimum)
- Security objectives:
  - Contact endpoint'ini spam ve suistimalden korumak.
  - XSS/Injection risklerini minimize etmek.
  - Hassas veriyi minimum tutmak ve guvenli tasimak.

## 2. Threat Model Summary

| Threat | Attack Surface | Impact | Control | Residual Risk |
| --- | --- | --- | --- | --- |
| Spam bot flood | Contact form/API | High | Rate limit + honeypot + IP throttling | Medium |
| XSS payload | Form alanlari ve icerik render | High | Server-side validation + output encoding | Low |
| Secret leakage | Deploy env/config | High | Secrets only in env, no client exposure | Low |
| Header misconfiguration | Public responses | Medium | CSP + HSTS + nosniff + frame-ancestors | Low |
| Dependency CVE | Build/runtime dependencies | Medium | Haftalik scan + lockfile discipline | Medium |

## 3. Security Controls

### 3.1 Application Security

- Input validation:
  Sunucu tarafinda schema validasyonu, length limitleri, e-posta format kontrolu.
- Output encoding:
  Kullanici kaynakli tum metinler encode edilerek render edilir.
- Secure headers (CSP, HSTS, X-Frame-Options):
  - CSP: script/style/image kaynaklarini kisitla
  - HSTS: production'da zorunlu
  - X-Frame-Options: `DENY` veya CSP `frame-ancestors 'none'`
  - X-Content-Type-Options: `nosniff`
- CSRF strategy:
  Contact endpoint'i icin `Origin`/`Host` kontrolu ve sadece `POST` kabul.
- Rate limiting strategy:
  IP bazli pencere limiti (ornek: 10 dakikada 5 istek).

### 3.2 Authentication and Authorization

- Auth method:
  V1'de auth yok.
- Session/token lifecycle:
  Uygulanmiyor (auth olmadigi icin).
- Access control model:
  Public read-only pages + kontrollu contact API.

### 3.3 Data Protection

- Encryption in transit:
  HTTPS/TLS zorunlu.
- Encryption at rest:
  Kalici saklama olmadigindan minimum; provider tarafinda sifreleme beklenir.
- Secret storage:
  Sadece server-side environment degiskenleri.
- Data minimization:
  Formda yalnizca gerekli alanlar toplanir.

## 4. Dependency and Supply Chain Security

- Dependency update cadence:
  Aylik rutin + kritik acikta acil patch.
- Vulnerability scanning tool:
  `npm audit` veya benzeri CI taramasi.
- License policy:
  Izin verilen lisanslar acikca listelenecek.
- Lockfile policy:
  Lockfile repoda tutulacak ve CI'de dogrulanacak.

## 5. Logging, Monitoring, and Alerting

- Security event logging:
  Contact endpoint hata kodlari, rate limit hit olaylari.
- Alert channels:
  E-posta veya deploy platform bildirimleri.
- Incident severity levels:
  `Sev1`, `Sev2`, `Sev3`.
- Mean time to detect target:
  Kritik sorunlarda 24 saat icinde fark edilme hedefi.

## 6. Incident Response

| Phase | Owner | SLA | Notes |
| --- | --- | --- | --- |
| Detection | Site sahibi | 24h | Hata/artis trendlerini izle |
| Triage | Site sahibi | 24h | Etki alani ve risk seviyesini belirle |
| Containment | Site sahibi | 48h | Endpoint sinirla, anahtar yenile |
| Recovery | Site sahibi | 72h | Duzeltme deployu ve dogrulama |
| Postmortem | Site sahibi | 7 gun | Kisa ozet + aksiyon listesi |

## 7. Security Testing Plan

- [ ] SAST on pull requests.
- [ ] Dependency vulnerability scan in CI.
- [ ] Security headers validation.
- [ ] Basic DAST against staging.
- [ ] Manual abuse-case review before release.

## 8. Compliance and Privacy

- Legal requirements:
  KVKK/GDPR kapsaminda minimum veri toplama prensibi.
- Privacy notice coverage:
  Iletisim formunda verinin hangi amacla kullanildigi aciklanacak.
- Data deletion process:
  Kalici kayit varsa talep halinde manuel silme.
- Cookie/consent model:
  Zorunlu olmayan takip cookie'leri kullanilmayacak.

## 9. Exceptions and Risk Acceptance

| Exception | Justification | Expiry Date | Approver |
| --- | --- | --- | --- |
| `None` | `N/A` | `N/A` | `N/A` |

## 10. Open Actions

- [ ] Contact endpoint'i icin nihai rate limit degerini belirle.
- [ ] Email provider secimini tamamla ve yedek plani netlestir.
- [ ] Privacy metnini yayina hazirla.
