import type { Locale } from "@/i18n/config";
import type { SunTrilogyUniverse } from "@/types/content";

export const sunTrilogyData: Record<Locale, SunTrilogyUniverse[]> = {
  tr: [
    {
      id: "universe-1",
      name: "Evren I",
      tagline: "İlk fantastik katmanın temel hikâyesi.",
      state: "wip"
    },
    {
      id: "universe-2",
      name: "Evren II",
      tagline: "İkincil dünya ve karakter yapısı.",
      state: "wip"
    },
    {
      id: "universe-3",
      name: "Evren III",
      tagline: "Üçlemeyi tamamlayacak final çatışması.",
      state: "wip"
    }
  ],
  en: [
    {
      id: "universe-1",
      name: "Universe I",
      tagline: "The foundational story layer of the first world.",
      state: "wip"
    },
    {
      id: "universe-2",
      name: "Universe II",
      tagline: "The second world and its character architecture.",
      state: "wip"
    },
    {
      id: "universe-3",
      name: "Universe III",
      tagline: "The final conflict that completes the trilogy.",
      state: "wip"
    }
  ]
};
