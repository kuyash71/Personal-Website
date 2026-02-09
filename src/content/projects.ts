import type { Project } from "@/types/content";

export const projectsData: Project[] = [
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
];
