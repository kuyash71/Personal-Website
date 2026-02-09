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
  Kişisel web sitesi uzerinden profil, uretilen projeler ve kisisel fantastik evren calismalarini sergilemek.
- In scope:
  - Navbar: `Anasayfa / Güneş Üçlemesi / Projeler / İletişim`
  - CV tarzinda ana sayfa (profil, deneyim, yetkinlikler)
  - `Güneş Üçlemesi` bolumu (ilk surumde WIP)
  - Projeler listesi + GitHub repo baglantilari
  - İletişim formu ile ziyaretcinin e-posta gonderebilmesi
- Out of scope:
  - Login/sign up sistemi
  - Uye bazli panel
  - Forum/blog (v1 kapsaminda degil)

## 2. Business and Technical Goals

- Functional goals:
  - Site sahibi hakkinda guvenilir ve hizli okunabilir bir vitrin sunmak.
  - Proje kartlari uzerinden GitHub repolarina tek tikla yonlendirmek.
  - İletişim formundan gelen mesaji site sahibinin e-posta kutusuna iletmek.
  - Güneş Üçlemesi bolumunu su an icin WIP etiketiyle yayinlamak.
- Non-functional goals:
  - Mobil ve desktop uyumlu, hizli acilan sayfalar.
  - Icerik guncellemesini kod tabani icinden kolayca yapilabilir tutmak.
  - Gelecekte blog/forum eklemek isterse kirilmadan genisleyebilen moduler yapi.
- Constraints (budget, timeline, team):
  - Tek gelistirici.
  - Ilk surumde minimum operasyonel maliyet.
  - Mimaride gereksiz backend karmasasi olusturulmamalidir.

### 2.1 Versioning Policy (Project-Specific)

Bu proje, klasik semver yerine proje odakli 3 indeksli bir surumleme kullanir.

| Indeks | Format | Kapsam | Tetikleyici Ornekler |
| --- | --- | --- | --- |
| 1. indeks | `1.0`, `2.0`, `3.0` | Buyuk guncellemeler | MVP tamamlanip ilk stabil surum yayinlandiginda `1.0`. Sonraki buyuk yapi guncellemeleri `2.0`, `3.0`. |
| 2. indeks | `1.1`, `1.2` | Orta olcekli guncellemeler | Yeni sistem ekleme, API sistemi guncelleme, mevcut modullerde anlamli islev artisi. |
| 3. indeks | `1.1a`, `1.1b` | Kucuk degisiklikler | Bug-fix, hot-fix, kucuk iyilestirmeler. |

Kurallar:
- MVP tamamlanma hedefi: `1.0`.
- Yeni ana sayfa/modul seviyesinde buyuk sayfa genislemeleri 1. indeksi etkiler.
- Orta olcekli teknik degisiklikler 2. indeksi artirir.
- Kucuk duzeltmeler 3. indeks harf sirasini (`a`, `b`, `c`) artirir.
- 1. veya 2. indeks degistiginde 3. indeks sifirlanir (harf kaldirilir).

## 3. System Context

- Users/personas:
  - Ziyaretci: Profili ve projeleri inceler, iletisim formu kullanir.
  - Site sahibi: Icerigi gunceller, gelen e-postalari takip eder.
- External systems:
  - E-posta saglayici API/SMTP (ornek: Resend, Postmark, SMTP relay).
  - GitHub repo linkleri (dis baglanti).
- Entry points (web, API, admin):
  - Web routes: `/`, `/gunes-uclemesi`, `/projeler`, `/iletisim`
  - API route: `POST /api/contact`
  - Admin panel: Yok (v1)

## 4. Information Architecture and Navigation

| Route | Nav Label | Content Owner | Release State |
| --- | --- | --- | --- |
| `/` | `Anasayfa` | Site sahibi | `Ready` |
| `/gunes-uclemesi` | `Güneş Üçlemesi` | Site sahibi | `WIP` |
| `/projeler` | `Projeler` | Site sahibi | `Ready` |
| `/iletisim` | `İletişim` | Site sahibi | `Ready` |

Navbar tum sayfalarda sabit olacaktir. Aktif sayfa vurgusu ve mobilde hamburger menu desteklenecektir.

## 5. Application Architecture

- Baslangic katmanlari:
  - `Presentation`: Sayfalar, layout, bileşenler, stiller.
  - `Content`: Profil/proje/evren icerik verileri.
  - `Integration`: E-posta gonderim servisi ve rate limit yardimcilari.
- Onerilen klasor sorumluluklari:

| Path | Responsibility |
| --- | --- |
| `src/app` | Route bazli sayfalar ve global layout |
| `src/components` | Tekrar kullanilan UI bilesenleri (Navbar, Card, Form) |
| `src/content` | Profil, proje ve Güneş Üçlemesi verileri |
| `src/lib` | E-posta istemcisi, validasyon, guvenlik yardimcilari |
| `src/types` | Icerik ve API tip tanimlari |
| `tests/*` | Unit, integration, e2e ve erisilebilirlik testleri |

- Moduller:
  - `home` modulu: CV kartlari, yetkinlikler, genel tanitim.
  - `sun-trilogy` modulu: 3 evren karti + WIP etiketi.
  - `projects` modulu: Proje listesi, etiketler, repo linkleri.
  - `contact` modulu: Form + API cagrisi + sonuc durumlari.
- Gelecek genisleme ilkesi:
  - Yeni moduller route seviyesinde eklenecek (`/blog`, `/forum` gibi).
  - Mevcut modullerde auth varsayimi olmayacak; auth sonraya bagimsiz eklenebilecek.

## 6. Core Data Contracts

### 6.1 `Profile`

| Field | Type | Required | Note |
| --- | --- | --- | --- |
| `fullName` | `string` | Yes | Gorunen ad |
| `title` | `string` | Yes | Kisa unvan |
| `summary` | `string` | Yes | CV ozet metni |
| `skills` | `string[]` | Yes | Teknik/yetkinlik listesi |
| `socialLinks` | `object[]` | Yes | GitHub, LinkedIn vb. |

### 6.2 `Project`

| Field | Type | Required | Note |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Proje adi |
| `description` | `string` | Yes | Kisa aciklama |
| `techStack` | `string[]` | Yes | Kullanilan teknolojiler |
| `repoUrl` | `string` | Yes | GitHub repo baglantisi |
| `liveUrl` | `string` | No | Canli demo varsa |
| `status` | `enum` | Yes | `active`, `archived`, `wip` |

### 6.3 `SunTrilogyUniverse`

| Field | Type | Required | Note |
| --- | --- | --- | --- |
| `id` | `string` | Yes | Stabil kimlik |
| `name` | `string` | Yes | Evren adi |
| `tagline` | `string` | Yes | Kisa tanim |
| `state` | `enum` | Yes | Su an `wip` |
| `coverImage` | `string` | No | Opsiyonel gorsel |

### 6.4 `ContactMessage`

| Field | Type | Required | Note |
| --- | --- | --- | --- |
| `name` | `string` | Yes | Gonderen ad |
| `email` | `string` | Yes | Gecerli e-posta |
| `subject` | `string` | Yes | Konu |
| `message` | `string` | Yes | Icerik |
| `createdAt` | `datetime` | Generated | Sunucu tarafinda eklenir |

## 7. Contact Form Delivery Flow

1. Ziyaretci `/iletisim` formunu doldurur.
2. Istek `POST /api/contact` endpoint'ine gider.
3. Sunucu tarafinda alan validasyonu ve anti-spam kontrolleri uygulanir.
4. Mesaj, e-posta saglayiciya iletilir.
5. Basarili/hatali sonuc kullaniciya okunabilir geri bildirim olarak doner.
6. Hassas veriler kalici veritabanina yazilmaz (v1), yalnizca gerekli log tutulur.

## 8. Security and Privacy by Design

- Authentication/authorization approach:
  - Kullanici auth yok; yalnizca acik vitrin sitesi.
  - Contact API sadece gerekli method (`POST`) kabul eder.
- Input validation and output encoding:
  - Tum form alanlari server-side dogrulanir.
  - XSS riskine karsi output encoding uygulanir.
- Secret management:
  - E-posta API anahtari sadece ortam degiskeni ile tutulur.
- Data retention and deletion:
  - Contact mesajlari zorunlu olmadikca kalici saklanmaz.
  - Log saklama suresi minimum tutulur.

## 9. Reliability and Performance

- SLO/SLA targets:
  - Sayfa acilisinda hizli ilk boyama (vitrin site seviyesi).
  - Contact endpoint'inde anlamli hata mesaji donusu.
- Performance budget:
  - Gorseller optimize edilmis ve lazy-load destekli.
  - Gereksiz JS yukunden kacinma.
- Scaling assumptions:
  - Dusuk/orta trafik; statik icerik agirlikli kullanim.
- Failure modes and fallback behavior:
  - E-posta saglayici hatasinda kullaniciya tekrar dene mesaji.
  - Kritik olmayan bolumler (WIP sayfasi) servis bagimsiz calisir.

## 10. Observability

- Logging standard:
  - API istegi icin status kodu + hata sinifi loglanir.
- Metrics and dashboards:
  - Contact gonderim basari/hatasi sayilari.
- Alerting thresholds:
  - Art arda hata oraninda artis oldugunda bildirim.
- Tracing and correlation IDs:
  - Contact isteklerine request ID atanir.

## 11. Deployment Architecture

- Environments:
  - `local`, `preview`, `production`
- Promotion strategy:
  - Pull request preview -> main branch -> production release.
- Rollback strategy:
  - Son stabil deploya geri donus.
- Required runtime configuration:
  - `CONTACT_TO_EMAIL`
  - `EMAIL_PROVIDER`
  - `EMAIL_API_KEY`
  - `EMAIL_FROM`
  - `RATE_LIMIT_WINDOW_MS`
  - `RATE_LIMIT_MAX_REQUESTS`

## 12. Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation | Owner |
| --- | --- | --- | --- | --- |
| Contact form spam | High | Medium | Rate limit + honeypot + server-side validation | Site sahibi |
| E-posta servis kesintisi | Medium | Medium | Alternatif provider plani + kullaniciya net hata mesaji | Site sahibi |
| Icerik guncelligini kaybetme | Medium | Medium | Aylik icerik gozden gecirme rutini | Site sahibi |
| Gelecekte modul eklerken yapi bozulmasi | Medium | Low | Moduler route ve ayri icerik katmani | Site sahibi |

## 13. Decision Log (ADR Links)

| Date | Decision | Status | Link |
| --- | --- | --- | --- |
| `2026-02-09` | Navbar 4 sabit bolumle baslatilacak | `accepted` | `docs/architecture/architecture.md` |
| `2026-02-09` | Login/sign up v1 disinda tutulacak | `accepted` | `docs/architecture/architecture.md` |
| `2026-02-09` | Güneş Üçlemesi ilk surumde WIP olarak yayinlanacak | `accepted` | `docs/architecture/architecture.md` |
| `2026-02-09` | Gelecek blog/forum icin moduler yapi korunacak | `accepted` | `docs/architecture/architecture.md` |
| `2026-02-09` | 3 indeksli proje surumleme politikasina gecilecek (`1.0`, `1.1`, `1.1a`) | `accepted` | `docs/architecture/architecture.md` |

## 14. Open Questions

- [ ] İletişim gonderimleri icin hangi e-posta saglayicisi secilecek?
- [ ] Site tek dil (TR) mi olacak, yoksa TR/EN coklu dil destegi eklenecek mi?
- [ ] Proje verileri manuel JSON mu olacak, yoksa GitHub API ile yarim otomatik mi cekilecek?
