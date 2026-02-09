import type { Locale } from "@/i18n/config";
import type { SunTrilogyContent } from "@/types/content";

export const sunTrilogyData: Record<Locale, SunTrilogyContent> = {
  tr: {
    introTitle: "Giriş",
    introText:
      "Sun Trilogy, İsmail Fatih \"Kuyash\" Çolak tarafından 2024 yılında Fate tabanlı bir TTRPG fikri olarak başladı; zamanla üç tarihsel kırılma etrafında büyüyen, karanlık-fantezi odaklı bir evrene dönüştü.",
    title: "SUN TRILOGY",
    slogan: "Üç çağ. Tek kırık güneş.",
    storiesTitle: "Stories of Trilogy",
    statuses: {
      pending: "Bekliyor",
      writing: "Yazılıyor",
      planned: "Planlanıyor"
    },
    universes: [
      {
        id: "bellum-mendax",
        name: "Bellum Mendax",
        era: "108 BHC",
        summary: "Ateşin çağında insanlığın karanlığa karşı ilk büyük direnişi.",
        githubUrl: "https://github.com/kuyash71/Bellum-Mendax",
        detailId: "bellum-mendax-story",
        theme: "war",
        icon: "eye"
      },
      {
        id: "umbra-caelis",
        name: "Umbra Caelis",
        era: "1221 BHC",
        summary: "Taçların çatışması, isyanlar ve gölgede yükselen yeni güçler.",
        githubUrl: "https://github.com/kuyash71/Umbra-Caelis",
        detailId: "umbra-caelis-story",
        theme: "shadow",
        icon: "moon"
      },
      {
        id: "pax-clades",
        name: "Pax Clades",
        era: "2424 BHC",
        summary: "İmparatorluk, darbe ve isyanlarla şekillenen nihai anlatı.",
        githubUrl: "https://github.com/kuyash71/Pax-Clades",
        detailId: "pax-clades-story",
        theme: "dawn",
        icon: "sun"
      }
    ],
    stories: [
      {
        id: "bellum-mendax-story",
        title: "Bellum Mendax",
        startDate: "108 BHC",
        description:
          "Yalnızca köz, ateş ve toprak. Yüz yıl önce başlayan \"bilinmeyen\" istilası merkez kıtayı kuşatırken insanlık, Büyük Ayphan Leit'ateirr önderliğinde zincirlerini kırmak için son bir mücadeleye hazırlanır.",
        status: "pending",
        icon: "eye"
      },
      {
        id: "umbra-caelis-story",
        title: "Umbra Caelis",
        startDate: "1221 BHC",
        description:
          "Leit'ateirr kıtasındaki kırılgan barış, Highclash of Two Crowns ile yıkılır. Cüce isyanı özgürlüğü getirir; ancak Joshua I Blaze ile başlayan kıtasal savaşlar bu düzeni yeniden parçalar.",
        status: "writing",
        icon: "moon"
      },
      {
        id: "pax-clades-story",
        title: "Pax Clades",
        startDate: "2424 BHC",
        description:
          "Umbra Caelis'ten bin yıl sonra Meldrax İmparatorluğu'nun dönüşümü, kanlı darbe süreci ve II. Kehribar İsyanı anlatılır. Üçleme, bu çağda evrenin nihai anlatısını tamamlar.",
        status: "planned",
        icon: "sun"
      }
    ]
  },
  en: {
    introTitle: "Introduction",
    introText:
      "Sun Trilogy began in 2024 as a Fate-inspired TTRPG concept by Ismail Fatih \"Kuyash\" Colak, then evolved into a dark-fantasy universe centered on three defining historical fractures.",
    title: "SUN TRILOGY",
    slogan: "Three ages. One wounded sun.",
    storiesTitle: "Stories of Trilogy",
    statuses: {
      pending: "Pending",
      writing: "Writing",
      planned: "Planned"
    },
    universes: [
      {
        id: "bellum-mendax",
        name: "Bellum Mendax",
        era: "108 BHC",
        summary: "Humanity's first great resistance against darkness in the age of embers.",
        githubUrl: "https://github.com/kuyash71/Bellum-Mendax",
        detailId: "bellum-mendax-story",
        theme: "war",
        icon: "eye"
      },
      {
        id: "umbra-caelis",
        name: "Umbra Caelis",
        era: "1221 BHC",
        summary: "Crowns collide, rebellions rise, and a hidden force reshapes the continent.",
        githubUrl: "https://github.com/kuyash71/Umbra-Caelis",
        detailId: "umbra-caelis-story",
        theme: "shadow",
        icon: "moon"
      },
      {
        id: "pax-clades",
        name: "Pax Clades",
        era: "2424 BHC",
        summary: "Empire, coup, and revolt converge into the trilogy's final account.",
        githubUrl: "https://github.com/kuyash71/Pax-Clades",
        detailId: "pax-clades-story",
        theme: "dawn",
        icon: "sun"
      }
    ],
    stories: [
      {
        id: "bellum-mendax-story",
        title: "Bellum Mendax",
        startDate: "108 BHC",
        description:
          "Nothing remains but embers, fire, and soil. A century-old invasion from the unknown surrounds the central continent, and humanity prepares for one decisive stand under the leadership of Great Ayphan Leit'ateirr.",
        status: "pending",
        icon: "eye"
      },
      {
        id: "umbra-caelis-story",
        title: "Umbra Caelis",
        startDate: "1221 BHC",
        description:
          "The fragile peace of Leit'ateirr is shattered by the Highclash of Two Crowns. A dwarven uprising wins freedom in the east, yet the continental wars launched by Joshua I Blaze tear that freedom apart.",
        status: "writing",
        icon: "moon"
      },
      {
        id: "pax-clades-story",
        title: "Pax Clades",
        startDate: "2424 BHC",
        description:
          "Set a thousand years after Umbra Caelis, this arc follows the transformation of the Meldrax Empire, a bloody coup, and the Second Amber Uprising to complete the universe's final narrative thread.",
        status: "planned",
        icon: "sun"
      }
    ]
  }
};
