import type { Locale } from "@/i18n/config";

export type SoftwareIconKey =
  | "cpp"
  | "java"
  | "minecraft"
  | "react"
  | "neovim"
  | "nextjs"
  | "nodejs"
  | "ardupilot"
  | "mavproxy"
  | "git"
  | "godot"
  | "ssh"
  | "ros2"
  | "gazebo"
  | "stm32"
  | "opencv"
  | "pid"
  | "arduino"
  | "python"
  | "restapi"
  | "oop"
  | "postgresql"
  | "springboot"
  | "docker";

export type SoftwareSkill = {
  icon: SoftwareIconKey;
  name: string;
};

export type SoftwareLevel = {
  title: string;
  items: SoftwareSkill[];
};

export type RepoHighlight = {
  name: string;
  href: string;
  description: string;
  icon: "drone" | "gcs" | "story";
};

export type AchievementItem = {
  title: string;
  detail: string;
};

export type HomeCtaLink = {
  label: string;
  href: string;
  type: "internal" | "external";
};

export type HomeContent = {
  greetingTitle: string;
  intro: string;
  ctaLinks: HomeCtaLink[];
  currentFocusTitle: string;
  currentFocusItems: string[];
  repoHighlightsTitle: string;
  repoHighlights: RepoHighlight[];
  softwareTitle: string;
  softwareLevels: SoftwareLevel[];
  educationTitle: string;
  languageTitle: string;
  languageItems: string[];
  universityTitle: string;
  universityValue: string;
  achievementsTitle: string;
  achievements: AchievementItem[];
};

export type SiteFooterContent = {
  socialLinks: Array<{
    label: string;
    href: string;
    icon: "github" | "linkedin";
  }>;
  email: string;
  contactLabel: string;
  warning: string;
  timelineNote: string;
  signaturePrefix: string;
  signatureLabel: string;
  signatureHref: string;
};

export const homeContent: Record<Locale, HomeContent> = {
  tr: {
    greetingTitle: "Merhaba",
    intro:
      "Ben İsmail Fatih Çolak. Dijital üretim alanında “kuyash”, “kuyashe” ve “kuyash71” isimleriyle çalışmalarımı sürdürüyorum. Sakarya Üniversitesi Bilgisayar Mühendisliği öğrencisi olarak robotik yazılım, sanal robotik simülasyonlar ve web geliştirme alanlarında proje geliştiriyorum. Bunun yanında kendi TTRPG/RPG evrenim Sun Trilogy’nin ana hikâye hattı olan Umbra Caelis üzerinde çalışıyorum.",
    ctaLinks: [
      { label: "İletişime Geç", href: "contact", type: "internal" },
      { label: "GitHub Profili", href: "https://github.com/kuyash71", type: "external" }
    ],
    currentFocusTitle: "Şu An Ne Üzerinde Çalışıyorum?",
    currentFocusItems: [
      "TEKNOFEST 2025/2026 döner kanat İHA takımında yarışma hedeflerine odaklı geliştirme süreçlerini yürütüyorum.",
      "Açık kaynak projelerim (ULAK GCS, Personal Website) ile birlikte üniversite kapsamında TOYOTA 32Bit tarafından verilen proje çalışmalarını eş zamanlı sürdürüyorum.",
      "Hobi tarafında STM32 tabanlı micromouse + line-follower robot geliştiriyor, yaratıcı üretimde ise Sun Trilogy ana anlatısı Umbra Caelis’i tamamlıyorum."
    ],
    repoHighlightsTitle: "Öne Çıkan Repolar",
    repoHighlights: [
      {
        name: "SAURO IHA",
        href: "https://github.com/kuyash71/sauro-iha",
        description: "TEKNOFEST döner kanat platformu için takım geliştirme deposu.",
        icon: "drone"
      },
      {
        name: "ULAK GCS",
        href: "https://github.com/kuyash71/ulak-gcs",
        description: "Yer kontrol istasyonu tarafındaki açık kaynak geliştirme çalışmaları.",
        icon: "gcs"
      },
      {
        name: "Umbra Caelis",
        href: "https://github.com/kuyash71/Umbra-Caelis",
        description: "Sun Trilogy evreninin ana hikâye ve worldbuilding üretim alanı.",
        icon: "story"
      }
    ],
    softwareTitle: "Stack Seviyeleri",
    softwareLevels: [
      {
        title: "Beginner",
        items: [
          { icon: "nextjs", name: "Next.js" },
          { icon: "minecraft", name: "Minecraft Modding" },
          { icon: "nodejs", name: "Node.js" },
          { icon: "neovim", name: "Neovim" },
          { icon: "godot", name: "Godot" },
          { icon: "stm32", name: "STM32" },
          { icon: "restapi", name: "REST API" },
          { icon: "react", name: "React" }
        ]
      },
      {
        title: "Intermediate",
        items: [
          { icon: "ssh", name: "SSH" },
          { icon: "postgresql", name: "PostgreSQL" },
          { icon: "springboot", name: "Spring Boot" },
          { icon: "docker", name: "Docker" },
          { icon: "mavproxy", name: "MAVProxy" },
          { icon: "ardupilot", name: "Ardupilot" },
          { icon: "opencv", name: "OpenCV" },
          { icon: "oop", name: "OOP" }
        ]
      },
      {
        title: "Core",
        items: [
          { icon: "python", name: "Python" },
          { icon: "git", name: "Git" },
          { icon: "cpp", name: "C++ / C#" },
          { icon: "java", name: "Java" },
          { icon: "gazebo", name: "Gazebo" },
          { icon: "ros2", name: "ROS2" },
          { icon: "pid", name: "PID Systems" },
          { icon: "arduino", name: "Arduino" }
        ]
      }
    ],
    educationTitle: "Eğitim",
    languageTitle: "Dil",
    languageItems: ["B2 düzey İngilizce", "Ana dil Türkçe"],
    universityTitle: "Üniversite",
    universityValue: "Sakarya Üniversitesi · Bilgisayar Mühendisliği (2024 - Beklenen 2028)",
    achievementsTitle: "Başarılar",
    achievements: [
      {
        title: "2023 MEB Robot Riders",
        detail: "Takım derecesi: 2.’lik"
      },
      {
        title: "2024 RIDERS Roboleague Drone",
        detail: "Takım derecesi: 5.’lik"
      },
      {
        title: "2025 SAURO Teknofest",
        detail: "Kritik Tasarım Raporu aşaması tamamlandı."
      }
    ]
  },
  en: {
    greetingTitle: "Hello",
    intro:
      "I am İsmail Fatih Çolak. I work under the digital aliases “kuyash”, “kuyashe”, and “kuyash71”. As a Computer Engineering student at Sakarya University, I develop projects in robotics software, virtual robotics simulations, and web development. In parallel, I continue writing and expanding Umbra Caelis, the main narrative arc of my TTRPG/RPG universe, Sun Trilogy.",
    ctaLinks: [
      { label: "Get in Touch", href: "contact", type: "internal" },
      { label: "GitHub Profile", href: "https://github.com/kuyash71", type: "external" }
    ],
    currentFocusTitle: "What I’m Currently Working On",
    currentFocusItems: [
      "I am actively contributing to my TEKNOFEST 2025/2026 rotary-wing UAV team with a competition-focused delivery mindset.",
      "I continue maintaining open-source projects (ULAK GCS, Personal Website) while also working on university projects assigned through TOYOTA 32Bit.",
      "On the hobby side, I am developing an STM32-based micromouse + line-follower robot and progressing Umbra Caelis as the core narrative of Sun Trilogy."
    ],
    repoHighlightsTitle: "Featured Repositories",
    repoHighlights: [
      {
        name: "SAURO IHA",
        href: "https://github.com/kuyash71/sauro-iha",
        description: "Team development repository for our TEKNOFEST rotary-wing UAV work.",
        icon: "drone"
      },
      {
        name: "ULAK GCS",
        href: "https://github.com/kuyash71/ulak-gcs",
        description: "Open-source ground control station development repository.",
        icon: "gcs"
      },
      {
        name: "Umbra Caelis",
        href: "https://github.com/kuyash71/Umbra-Caelis",
        description: "Core narrative and worldbuilding workspace for the Sun Trilogy universe.",
        icon: "story"
      }
    ],
    softwareTitle: "Stack Levels",
    softwareLevels: [
      {
        title: "Beginner",
        items: [
          { icon: "nextjs", name: "Next.js" },
          { icon: "minecraft", name: "Minecraft Modding" },
          { icon: "nodejs", name: "Node.js" },
          { icon: "neovim", name: "Neovim" },
          { icon: "godot", name: "Godot" },
          { icon: "stm32", name: "STM32" },
          { icon: "restapi", name: "REST API" },
          { icon: "react", name: "React" }
        ]
      },
      {
        title: "Intermediate",
        items: [
          { icon: "ssh", name: "SSH" },
          { icon: "postgresql", name: "PostgreSQL" },
          { icon: "springboot", name: "Spring Boot" },
          { icon: "docker", name: "Docker" },
          { icon: "mavproxy", name: "MAVProxy" },
          { icon: "ardupilot", name: "Ardupilot" },
          { icon: "opencv", name: "OpenCV" },
          { icon: "oop", name: "OOP" }
        ]
      },
      {
        title: "Core",
        items: [
          { icon: "python", name: "Python" },
          { icon: "git", name: "Git" },
          { icon: "cpp", name: "C++ / C#" },
          { icon: "java", name: "Java" },
          { icon: "gazebo", name: "Gazebo" },
          { icon: "ros2", name: "ROS2" },
          { icon: "pid", name: "PID Systems" },
          { icon: "arduino", name: "Arduino" }
        ]
      }
    ],
    educationTitle: "Education",
    languageTitle: "Language",
    languageItems: ["English (B2 level)", "Turkish (native)"],
    universityTitle: "University",
    universityValue: "Sakarya University · Computer Engineering (2024 - Expected 2028)",
    achievementsTitle: "Achievements",
    achievements: [
      {
        title: "2023 MEB Robot Riders",
        detail: "Team placement: 2nd place"
      },
      {
        title: "2024 RIDERS Roboleague Drone",
        detail: "Team placement: 5th place"
      },
      {
        title: "2025 SAURO Teknofest",
        detail: "Critical Design Report milestone completed."
      }
    ]
  }
};

export const siteFooterContent: Record<Locale, SiteFooterContent> = {
  tr: {
    socialLinks: [
      { label: "github.com/kuyash71", href: "https://github.com/kuyash71", icon: "github" },
      {
        label: "linkedin.com/in/ismail-fatih-colak",
        href: "https://linkedin.com/in/ismail-fatih-colak",
        icon: "linkedin"
      }
    ],
    email: "ismail61x@gmail.com",
    contactLabel: "İletişim",
    warning: "Daha sağlıklı iletişim için lütfen e-posta veya iletişim sayfasını tercih edin.",
    timelineNote: "Şubat 2026",
    signaturePrefix: "by kuyash •",
    signatureLabel: "github.com/kuyash71/Personal-Website",
    signatureHref: "https://github.com/kuyash71/Personal-Website"
  },
  en: {
    socialLinks: [
      { label: "github.com/kuyash71", href: "https://github.com/kuyash71", icon: "github" },
      {
        label: "linkedin.com/in/ismail-fatih-colak",
        href: "https://linkedin.com/in/ismail-fatih-colak",
        icon: "linkedin"
      }
    ],
    email: "ismail61x@gmail.com",
    contactLabel: "Contact",
    warning: "For a more reliable response, please prefer email or the contact page.",
    timelineNote: "February 2026",
    signaturePrefix: "by kuyash •",
    signatureLabel: "github.com/kuyash71/Personal-Website",
    signatureHref: "https://github.com/kuyash71/Personal-Website"
  }
};
