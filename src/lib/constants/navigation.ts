import type { Locale } from "@/i18n/config";

type NavigationLabels = {
  home: string;
  sunTrilogy: string;
  projects: string;
  contact: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export function getNavItems(locale: Locale, labels: NavigationLabels): NavItem[] {
  return [
    { label: labels.home, href: `/${locale}` },
    { label: labels.sunTrilogy, href: `/${locale}/sun-trilogy` },
    { label: labels.projects, href: `/${locale}/projects` },
    { label: labels.contact, href: `/${locale}/contact` }
  ];
}
