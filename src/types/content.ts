export type ProjectStatus = "active" | "archived" | "wip";
export type UniverseState = "wip" | "ready";
export type SunTrilogyTheme = "war" | "shadow" | "dawn";
export type SunTrilogyIcon = "eye" | "moon" | "sun";
export type SunTrilogyStoryStatus = "pending" | "writing" | "planned";

export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  fullName: string;
  title: string;
  summary: string;
  skills: string[];
  socialLinks: SocialLink[];
};

export type Project = {
  name: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  status: ProjectStatus;
};

export type SunTrilogyUniverse = {
  id: string;
  name: string;
  era: string;
  summary: string;
  githubUrl: string;
  detailId: string;
  theme: SunTrilogyTheme;
  icon: SunTrilogyIcon;
};

export type SunTrilogyStory = {
  id: string;
  title: string;
  startDate: string;
  description: string;
  status: SunTrilogyStoryStatus;
  icon: SunTrilogyIcon;
};

export type SunTrilogyContent = {
  introTitle: string;
  introText: string;
  title: string;
  slogan: string;
  storiesTitle: string;
  statuses: Record<SunTrilogyStoryStatus, string>;
  universes: SunTrilogyUniverse[];
  stories: SunTrilogyStory[];
};

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};
