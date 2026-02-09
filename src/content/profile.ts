import type { Locale } from "@/i18n/config";
import type { Profile } from "@/types/content";

export const profileData: Record<Locale, Profile> = {
  tr: {
    fullName: "Kuyash",
    title: "Software Developer",
    summary: "Yazilim projeleri gelistiriyor ve kendi fantastik evrenlerini insa eden bir gelistirici.",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "Testing"],
    socialLinks: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" }
    ]
  },
  en: {
    fullName: "Kuyash",
    title: "Software Developer",
    summary: "A developer building software projects while crafting original fantasy worlds.",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "Testing"],
    socialLinks: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" }
    ]
  }
};
