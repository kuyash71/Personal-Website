import type { Locale } from "@/i18n/config";

export type Messages = {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    sunTrilogy: string;
    projects: string;
    contact: string;
  };
  home: {
    skillsHeading: string;
    linksHeading: string;
  };
  sunTrilogy: {
    title: string;
    subtitle: string;
    wipBadge: string;
  };
  projects: {
    title: string;
    subtitle: string;
    technologiesLabel: string;
    repoCta: string;
  };
  contact: {
    title: string;
    description: string;
    labels: {
      name: string;
      email: string;
      subject: string;
      message: string;
    };
    submit: string;
    submitting: string;
    status: {
      success: string;
      error: string;
      networkError: string;
    };
    note: string;
  };
};

export const messages: Record<Locale, Messages> = {
  tr: {
    metadata: {
      title: "Kuyash | Kişisel Website",
      description: "Kişisel profil, projeler ve Güneş Üçlemesi evrenleri."
    },
    nav: {
      home: "Anasayfa",
      sunTrilogy: "Güneş Üçlemesi",
      projects: "Projeler",
      contact: "İletişim"
    },
    home: {
      skillsHeading: "Yetkinlikler",
      linksHeading: "Bağlantılar"
    },
    sunTrilogy: {
      title: "Güneş Üçlemesi",
      subtitle: "Bu bölüm özel olarak inşa edilecek. Şimdilik WIP durumundadır.",
      wipBadge: "WIP"
    },
    projects: {
      title: "Projeler",
      subtitle: "Yazılım projeleri ve bağlı GitHub repo linkleri.",
      technologiesLabel: "Teknolojiler",
      repoCta: "GitHub Repo"
    },
    contact: {
      title: "İletişim",
      description: "Aşağıdaki formu doldurarak bana doğrudan e-posta gönderebilirsin.",
      labels: {
        name: "Ad",
        email: "E-posta",
        subject: "Konu",
        message: "Mesaj"
      },
      submit: "Mesaj Gönder",
      submitting: "Gönderiliyor...",
      status: {
        success: "Mesaj başarıyla gönderildi.",
        error: "Mesaj gönderilemedi.",
        networkError: "Bağlantı hatası oluştu. Lütfen tekrar dene."
      },
      note: "E-posta gönderimi için .env.local dosyasında EMAIL_PROVIDER=resend ve ilgili anahtarlar tanımlı olmalıdır."
    }
  },
  en: {
    metadata: {
      title: "Kuyash | Personal Website",
      description: "Personal profile, projects, and Sun Trilogy worlds."
    },
    nav: {
      home: "Home",
      sunTrilogy: "Sun Trilogy",
      projects: "Projects",
      contact: "Contact"
    },
    home: {
      skillsHeading: "Skills",
      linksHeading: "Links"
    },
    sunTrilogy: {
      title: "Sun Trilogy",
      subtitle: "This section will be built as a dedicated experience. It is currently marked as WIP.",
      wipBadge: "WIP"
    },
    projects: {
      title: "Projects",
      subtitle: "Software projects and related GitHub repositories.",
      technologiesLabel: "Technologies",
      repoCta: "GitHub Repo"
    },
    contact: {
      title: "Contact",
      description: "Fill out the form below to send me an email directly.",
      labels: {
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message"
      },
      submit: "Send Message",
      submitting: "Sending...",
      status: {
        success: "Your message was sent successfully.",
        error: "Your message could not be sent.",
        networkError: "A network error occurred. Please try again."
      },
      note: "To send email, .env.local must include EMAIL_PROVIDER=resend and related credentials."
    }
  }
};
