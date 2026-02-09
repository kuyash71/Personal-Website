export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Anasayfa", href: "/" },
  { label: "Güneş Üçlemesi", href: "/gunes-uclemesi" },
  { label: "Projeler", href: "/projeler" },
  { label: "İletişim", href: "/iletisim" },
];
