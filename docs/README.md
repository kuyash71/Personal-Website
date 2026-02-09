# Documentation Index

Bu klasor, kisisel web sitesi icin canli dokumanlari icerir.
`Owner`, `Last Updated` ve `Status` alanlarini her buyuk degisiklikte guncelle.

## Document Map

| Path | Purpose |
| --- | --- |
| `docs/architecture/architecture.md` | Bilgi mimarisi, moduler sistem tasarimi, route yapisi ve teknik kararlar |
| `docs/architecture/technology-decisions.md` | Kullanilan yazilimlarin secim gerekceleri ve karar ozeti |
| `docs/architecture/technology-usage-map.md` | Yazilimlarin proje icinde nerede kullanildiginin dosya bazli haritasi |
| `docs/content/content.md` | Sayfa bazli icerik plani, navbar akisi, metin tonu ve SEO stratejisi |
| `docs/security/security.md` | Contact endpoint guvenligi, tehdit modeli ve temel kontroller |
| `docs/setup/setup.md` | Kurulum, ortam degiskenleri, CI/CD ve operasyon adimlari |

## Current Product Model (v0.1)

- Navbar:
  `Anasayfa / Güneş Üçlemesi / Projeler / İletişim`
- Product scope:
  - CV tarzinda ana sayfa
  - Güneş Üçlemesi (WIP)
  - Projeler + GitHub repo linkleri
  - İletişim formu ile e-posta gonderimi
- Out of scope (v1):
  Login/sign up, forum/blog
- Future direction:
  Blog/forum gibi yeni bolumler moduler route yapisiyla sonradan eklenebilir.

## Documentation Standards

- Gereksinimleri test edilebilir ve acik ifadelerle yaz.
- Mumkunse gereksinimleri kod dosyalariyla eslestir.
- Kritik teknik kararlari tarih ve gerekce ile kaydet.
- Release oncesi guvenlik ve setup dokumanlarini birlikte gozden gecir.
