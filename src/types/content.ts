export type ProjectStatus = "active" | "archived" | "wip";
export type UniverseState = "wip" | "ready";

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
  tagline: string;
  state: UniverseState;
  coverImage?: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};
