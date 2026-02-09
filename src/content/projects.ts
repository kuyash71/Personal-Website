import type { Locale } from "@/i18n/config";

export type ProjectCategoryKey = "academic" | "creative" | "robotics";
export type ProjectStatusKey = "active" | "pending" | "planned" | "planning";

export type ProjectRepository = {
  label: string;
  href: string;
};

export type ProjectDetail = {
  id: string;
  title: string;
  category: ProjectCategoryKey;
  description: string;
  status: ProjectStatusKey;
  technologies: string[];
  repositories: ProjectRepository[];
};

export type ProjectCategory = {
  key: ProjectCategoryKey;
  title: string;
  projectIds: string[];
};

export type ProjectsContent = {
  introTitle: string;
  introText: string;
  quoteText: string;
  quoteAuthor: string;
  listTitle: string;
  detailsTitle: string;
  statusLabel: string;
  technologiesLabel: string;
  githubLabel: string;
  noTechLabel: string;
  noRepoLabel: string;
  statusLabels: Record<ProjectStatusKey, string>;
  categories: ProjectCategory[];
  projects: ProjectDetail[];
};

export const projectsData: Record<Locale, ProjectsContent> = {
  tr: {
    introTitle: "Giriş",
    introText:
      "Aşağıda başlıca projelerim listelenmektedir. Daha detaylı teknik bilgi için ilgili GitHub depolarına erişebilirsiniz. Projelerimi mümkün olduğunca açık kaynak geliştirme prensibiyle ilerletiyorum.",
    quoteText: "In real open source, you have the right to control your own destiny.",
    quoteAuthor: "Linus Torvalds",
    listTitle: "Proje Listesi",
    detailsTitle: "Proje Ayrıntıları",
    statusLabel: "Durum",
    technologiesLabel: "Kullanılan Yazılımlar",
    githubLabel: "GitHub",
    noTechLabel: "Henüz net karar verilmedi.",
    noRepoLabel: "Henüz açık repo paylaşılmadı.",
    statusLabels: {
      active: "Çalışıyor",
      pending: "Bekliyor",
      planned: "Planlandı",
      planning: "Planlanıyor"
    },
    categories: [
      {
        key: "academic",
        title: "Akademik",
        projectIds: ["itsm-website", "tubitak-2204b"]
      },
      {
        key: "creative",
        title: "Yaratıcı Ürünler",
        projectIds: ["yel-micromouse", "clades"]
      },
      {
        key: "robotics",
        title: "Robotik Yazılım",
        projectIds: ["ulak-gcs", "sauro-iha"]
      }
    ],
    projects: [
      {
        id: "itsm-website",
        title: "ITSM Website",
        category: "academic",
        description:
          "SAÜ TOYOTA 32Bit tarafından bu yıl başlatılan proje çağrısında IT Ticket Service Management alanında aktif görev alıyorum. Hedefim, sektör standartlarına uygun iş akışlarının doğru sırada uygulandığı, sürdürülebilir bir ITSM platformu üretmek.",
        status: "active",
        technologies: ["Spring Boot", "Spring Data JPA", "PostgreSQL", "Keycloak", "Docker", "Log4j2"],
        repositories: [{ label: "kuyash71/it-ticket-management", href: "https://github.com/kuyash71/it-ticket-management" }]
      },
      {
        id: "tubitak-2204b",
        title: "TUBITAK 2204-B",
        category: "academic",
        description:
          "TUBITAK 2204-B başvuru sürecini tamamladım ve onay sürecini bekliyorum. Proje, Sakarya ölçeğinde su tüketimi verisini analiz ederek verimliliği artırmayı ve modelin diğer şehirlerde de uygulanabilir olmasını hedefliyor.",
        status: "pending",
        technologies: [],
        repositories: []
      },
      {
        id: "yel-micromouse",
        title: "YEL Micromouse",
        category: "creative",
        description:
          "A* ve Dijkstra gibi algoritmalarla labirenti en kısa sürede çözmeyi hedefleyen bir micromouse robot projesi. ST Nucleo F411RE tabanlı bu çalışmada odak noktam, STM32 geliştirme yetkinliğimi ve algoritmik robotik yazılım pratiğimi güçlendirmek.",
        status: "planned",
        technologies: ["C", "STM32 IDE"],
        repositories: [{ label: "kuyash71/yel-micromouse", href: "https://github.com/kuyash71/yel-micromouse" }]
      },
      {
        id: "clades",
        title: "CLADES",
        category: "creative",
        description:
          "Sun Trilogy'nin üçüncü anlatısı Pax Clades ile karıştırılmamalıdır. CLADES, ayrımı 17. yüzyılda başlayan alternatif bir tarih çizgisinde geçen, 27. yüzyılda Dünya'ya dönen paralı askerleri konu alan rogue-like boomer shooter oyun tasarımıdır.",
        status: "planning",
        technologies: ["Godot", "GDScript"],
        repositories: []
      },
      {
        id: "ulak-gcs",
        title: "ULAK GCS",
        category: "robotics",
        description:
          "İHA operasyonları için geliştirilen açık kaynak bir yer kontrol istasyonu projesi. Uçuş telemetrisi, görev planlama, görselleştirme ve modüler eklenti kabiliyetiyle saha kullanımına uygun bir yazılım altyapısı hedefleniyor.",
        status: "planning",
        technologies: ["Qt", "C++", "Python", "MAVProxy", "OpenCV", "Lua", "Ardupilot", "ROS2"],
        repositories: [{ label: "kuyash71/ulak-gcs", href: "https://github.com/kuyash71/ulak-gcs" }]
      },
      {
        id: "sauro-iha",
        title: "SAURO IHA",
        category: "robotics",
        description:
          "TEKNOFEST odaklı döner kanat İHA geliştirme sürecinin yazılım tarafı. Görev simülasyonu, otonom kontrol akışları ve saha entegrasyon adımlarını aynı hat üzerinde ilerletmek için iki ayrı depo üzerinden geliştiriliyor.",
        status: "planning",
        technologies: ["ROS2", "Gazebo", "Ardupilot", "Ardupilot SITL", "PyMAVLink", "MAVProxy", "Python"],
        repositories: [
          { label: "kuyash71/sauro-iha", href: "https://github.com/kuyash71/sauro-iha" },
          { label: "kuyash71/sauro-simulation", href: "https://github.com/kuyash71/sauro-simulation" }
        ]
      }
    ]
  },
  en: {
    introTitle: "Introduction",
    introText:
      "My primary projects are listed below. For deeper technical details, you can review each project's GitHub repositories. I generally follow an open-source-first approach in my development workflow.",
    quoteText: "In real open source, you have the right to control your own destiny.",
    quoteAuthor: "Linus Torvalds",
    listTitle: "Project List",
    detailsTitle: "Project Details",
    statusLabel: "Status",
    technologiesLabel: "Tech Stack",
    githubLabel: "GitHub",
    noTechLabel: "No finalized stack yet.",
    noRepoLabel: "No public repository yet.",
    statusLabels: {
      active: "In Progress",
      pending: "Pending",
      planned: "Planned",
      planning: "Planning"
    },
    categories: [
      {
        key: "academic",
        title: "Academic",
        projectIds: ["itsm-website", "tubitak-2204b"]
      },
      {
        key: "creative",
        title: "Creative Products",
        projectIds: ["yel-micromouse", "clades"]
      },
      {
        key: "robotics",
        title: "Robotics Software",
        projectIds: ["ulak-gcs", "sauro-iha"]
      }
    ],
    projects: [
      {
        id: "itsm-website",
        title: "ITSM Website",
        category: "academic",
        description:
          "I actively contribute to an IT Ticket Service Management initiative launched this year through SAU TOYOTA 32Bit. The objective is to build a sustainable ITSM platform with properly sequenced, industry-aligned delivery practices.",
        status: "active",
        technologies: ["Spring Boot", "Spring Data JPA", "PostgreSQL", "Keycloak", "Docker", "Log4j2"],
        repositories: [{ label: "kuyash71/it-ticket-management", href: "https://github.com/kuyash71/it-ticket-management" }]
      },
      {
        id: "tubitak-2204b",
        title: "TUBITAK 2204-B",
        category: "academic",
        description:
          "I completed the TUBITAK 2204-B application and am currently waiting for final approval. The project focuses on water-consumption analytics for Sakarya, with a design that can later be adapted to other cities.",
        status: "pending",
        technologies: [],
        repositories: []
      },
      {
        id: "yel-micromouse",
        title: "YEL Micromouse",
        category: "creative",
        description:
          "A micromouse robotics project targeting fast maze-solving with algorithms such as A* and Dijkstra. It is planned on ST Nucleo F411RE to strengthen my STM32 engineering practice and algorithmic robotics software skills.",
        status: "planned",
        technologies: ["C", "STM32 IDE"],
        repositories: [{ label: "kuyash71/yel-micromouse", href: "https://github.com/kuyash71/yel-micromouse" }]
      },
      {
        id: "clades",
        title: "CLADES",
        category: "creative",
        description:
          "This project should not be confused with Pax Clades, the third narrative arc of Sun Trilogy. CLADES is a rogue-like boomer shooter concept set in an alternate timeline branching in the 17th century and unfolding in the 27th century.",
        status: "planning",
        technologies: ["Godot", "GDScript"],
        repositories: []
      },
      {
        id: "ulak-gcs",
        title: "ULAK GCS",
        category: "robotics",
        description:
          "An open-source ground control station for UAV operations. The scope includes telemetry, mission-planning workflows, visualization, and modular plugin capabilities suitable for real deployment scenarios.",
        status: "planning",
        technologies: ["Qt", "C++", "Python", "MAVProxy", "OpenCV", "Lua", "Ardupilot", "ROS2"],
        repositories: [{ label: "kuyash71/ulak-gcs", href: "https://github.com/kuyash71/ulak-gcs" }]
      },
      {
        id: "sauro-iha",
        title: "SAURO IHA",
        category: "robotics",
        description:
          "Software track of our TEKNOFEST-oriented rotary-wing UAV effort. Simulation, autonomy pipelines, and field-integration steps are developed across two repositories to keep research and deployment flows modular.",
        status: "planning",
        technologies: ["ROS2", "Gazebo", "Ardupilot", "Ardupilot SITL", "PyMAVLink", "MAVProxy", "Python"],
        repositories: [
          { label: "kuyash71/sauro-iha", href: "https://github.com/kuyash71/sauro-iha" },
          { label: "kuyash71/sauro-simulation", href: "https://github.com/kuyash71/sauro-simulation" }
        ]
      }
    ]
  }
};
