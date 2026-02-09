"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { getNavItems } from "@/lib/constants/navigation";

type NavbarProps = {
  locale: Locale;
  labels: {
    home: string;
    sunTrilogy: string;
    projects: string;
    contact: string;
  };
};

export function Navbar({ locale, labels }: NavbarProps) {
  const pathname = usePathname();
  const navItems = getNavItems(locale, labels);
  const trHref = pathname ? pathname.replace(/^\/(tr|en)/, "/tr") : "/tr";
  const enHref = pathname ? pathname.replace(/^\/(tr|en)/, "/en") : "/en";

  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link className="brand" href={`/${locale}`}>
          Kuyash
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    className={isActive ? "nav-link nav-link-active" : "nav-link"}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="locale-switch" aria-label="Language switch">
          <Link className={locale === "tr" ? "locale-link locale-link-active" : "locale-link"} href={trHref}>
            TR
          </Link>
          <Link className={locale === "en" ? "locale-link locale-link-active" : "locale-link"} href={enHref}>
            EN
          </Link>
        </div>
      </div>
    </header>
  );
}
