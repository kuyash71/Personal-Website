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
    note: string;
  };
};

export const messages: Record<Locale, Messages> = {
  tr: {
    metadata: {
      title: "Kuyash | Kisisel Website",
      description: "Kisisel profil, projeler ve Gunes Uclemesi evrenleri."
    },
    nav: {
      home: "Anasayfa",
      sunTrilogy: "Gunes Uclemesi",
      projects: "Projeler",
      contact: "Iletisim"
    },
    home: {
      skillsHeading: "Yetkinlikler",
      linksHeading: "Baglantilar"
    },
    sunTrilogy: {
      title: "Gunes Uclemesi",
      subtitle: "Bu bolum ozel olarak insa edilecek. Simdilik WIP durumundadir.",
      wipBadge: "WIP"
    },
    projects: {
      title: "Projeler",
      subtitle: "Yazilim projeleri ve bagli GitHub repo linkleri.",
      technologiesLabel: "Teknolojiler",
      repoCta: "GitHub Repo"
    },
    contact: {
      title: "Iletisim",
      description: "Asagidaki formu doldurarak bana dogrudan e-posta gonderebilirsin.",
      labels: {
        name: "Ad",
        email: "E-posta",
        subject: "Konu",
        message: "Mesaj"
      },
      submit: "Mesaj Gonder",
      note: "E-posta gonderimi icin .env.local dosyasinda EMAIL_PROVIDER=resend ve ilgili anahtarlar tanimli olmalidir."
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
      note: "To send email, .env.local must include EMAIL_PROVIDER=resend and related credentials."
    }
  }
};
