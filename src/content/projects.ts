import type { Locale } from "@/i18n/config";
import type { Project } from "@/types/content";

export const projectsData: Record<Locale, Project[]> = {
  tr: [
    {
      name: "Portfolio Core",
      description: "Kisisel website altyapisini olusturan cekirdek uygulama.",
      techStack: ["Next.js", "TypeScript", "CSS"],
      repoUrl: "https://github.com/",
      status: "active"
    },
    {
      name: "Contact Pipeline",
      description: "Formdan gelen mesajlarin API uzerinden guvenli yonetimi.",
      techStack: ["Next.js API Routes", "Validation", "Rate Limiting"],
      repoUrl: "https://github.com/",
      status: "wip"
    }
  ],
  en: [
    {
      name: "Portfolio Core",
      description: "Core application powering the personal website structure.",
      techStack: ["Next.js", "TypeScript", "CSS"],
      repoUrl: "https://github.com/",
      status: "active"
    },
    {
      name: "Contact Pipeline",
      description: "Secure handling of contact form messages through API routes.",
      techStack: ["Next.js API Routes", "Validation", "Rate Limiting"],
      repoUrl: "https://github.com/",
      status: "wip"
    }
  ]
};
