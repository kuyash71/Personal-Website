# Content Strategy - Personal Website

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
  Kişisel markayi net bir profil + proje vitrini olarak sunmak.
- Secondary goals:
  - Güneş Üçlemesi markasini erken asamada konumlandirmak.
  - Potansiyel is birligi/iletisim taleplerini e-posta uzerinden toplamak.
- Target audience:
  Isverenler, teknik ekipler, is birligi arayan kisiler, fantastik kurgu meraklilari.
- Core message:
  "Teknik projeler ureten ve kendi fantastik evrenini insa eden bir gelistirici."

## 2. Information Architecture

| Route | Nav Label | Intent | Primary CTA |
| --- | --- | --- | --- |
| `/` | `Anasayfa` | Kişisel profil ve CV ozetini anlatmak | `Projeleri Incele` |
| `/gunes-uclemesi` | `Güneş Üçlemesi` | 3 fantastik evren icin marka alanini acmak (WIP) | `Yakinda` |
| `/projeler` | `Projeler` | Yazilim projelerini ve repo linklerini gostermek | `GitHub Repo` |
| `/iletisim` | `İletişim` | Ziyaretcinin form ile e-posta gonderebilmesi | `Mesaj Gonder` |

## 3. Page-Level Content Brief

### 3.1 Anasayfa

- Hero title:
  Ad + kisa unvan.
- Hero subtitle:
  "Yazilim projeleri gelistiriyor ve Güneş Üçlemesi evrenini insa ediyorum."
- Key proof points:
  - Teknik stack ve uzmanlik alanlari
  - One cikan proje sayisi
  - Kisa gecmis/deneyim
- CTA text:
  `Projeleri Incele` ve `İletişime Gec`

### 3.2 Güneş Üçlemesi

- Section objective:
  3 fantastik evren icin temel tanitim iskeleti sunmak.
- Card/list structure:
  - 3 kart (Evren I, Evren II, Evren III)
  - Her kartta ad, tek cumle tanim, `WIP` etiketi
- Supporting media:
  Kapak gorseli opsiyonel, ilk surumde zorunlu degil.

### 3.3 Projeler

- Project card schema:
  - Proje adi
  - Kisa aciklama
  - Teknolojiler
  - GitHub repo linki
  - Opsiyonel canli demo linki
- Featured projects:
  Elle secilen one cikan 3-6 proje.
- Technical depth level:
  Teknik detay orta seviye; ziyaretciyi repoya yonlendirecek kadar net.

### 3.4 İletişim

- Form fields:
  `name`, `email`, `subject`, `message`
- Validation copy:
  Alan bazli anlasilir hata mesajlari.
- Success state:
  "Mesajin ulasti, en kisa surede donus yapacagim."
- Failure state:
  "Mesaj gonderilemedi, lutfen tekrar dene."

## 4. Tone and Style Guide

- Brand voice (3 adjectives):
  `samimi`, `net`, `uretken`
- Do:
  Kisa cumleler, somut bilgi, teknik dogruluk.
- Avoid:
  Asiri pazarlama dili, belirsiz iddialar, uzun paragraflar.
- Reading level target:
  Genel teknik okur kitlesine uygun sade dil.
- Language support:
  Ilk surum: Turkce. Gelecek: Turkce + Ingilizce opsiyonu.

## 5. SEO Metadata Plan

| Page | Title Tag | Meta Description | Primary Keyword | OG Image |
| --- | --- | --- | --- | --- |
| `/` | `Kuyash | Kişisel Website` | `Kuyash'in CV tarzi profili, teknik yetkinlikleri ve one cikan projeleri.` | `kisisel website` | `/images/og-home.png` |
| `/gunes-uclemesi` | `Güneş Üçlemesi | WIP` | `Uc fantastik evrenden olusan Güneş Üçlemesi projesinin ilk tanitim alani.` | `gunes uclemesi` | `/images/og-sun-trilogy.png` |
| `/projeler` | `Projeler | Kuyash` | `Geliştirilen yazilim projeleri, teknik yiginlar ve GitHub repo baglantilari.` | `yazilim projeleri` | `/images/og-projects.png` |
| `/iletisim` | `İletişim | Kuyash` | `Website uzerinden dogrudan e-posta gondermek icin iletisim formu.` | `iletisim formu` | `/images/og-contact.png` |

## 6. Content Operations

- Source of truth:
  `src/content` altindaki versionlanmis veri dosyalari.
- Review cycle:
  Aylik icerik kontrolu.
- Approval workflow:
  Tek kisi (site sahibi) onayi.
- Publishing checklist:
  Yazim, link, gorsel ve tarih kontrolu.
- Localization process:
  V2 icin i18n yapisina gecis plani.

## 7. Accessibility Checklist

- [ ] Headings follow semantic order.
- [ ] Images include meaningful alt text.
- [ ] Links have descriptive labels.
- [ ] Color contrast meets WCAG AA.
- [ ] Motion has reduced-motion fallback.

## 8. Open Items

- [ ] Güneş Üçlemesi kartlari icin final adlar ve birer satirlik sloganlar.
- [ ] One cikan projeler icin ilk liste ve sira.
- [ ] Ana sayfa hero metninin son hali.
