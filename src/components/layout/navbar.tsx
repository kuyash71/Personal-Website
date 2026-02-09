"use client";

import { useEffect, useState } from "react";
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

const THEME_STORAGE_KEY = "personal-website-theme";

type Theme = "light" | "dark";

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const persisted = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (persisted === "light" || persisted === "dark") {
    return persisted;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function Navbar({ locale, labels }: NavbarProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("light");
  const [isThemeReady, setIsThemeReady] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = getNavItems(locale, labels);
  const trHref = pathname ? pathname.replace(/^\/(tr|en)/, "/tr") : "/tr";
  const enHref = pathname ? pathname.replace(/^\/(tr|en)/, "/en") : "/en";

  useEffect(() => {
    const resolvedTheme = resolveInitialTheme();
    setTheme(resolvedTheme);
    document.documentElement.setAttribute("data-theme", resolvedTheme);
    setIsThemeReady(true);
  }, []);

  useEffect(() => {
    if (!isThemeReady) {
      return;
    }

    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, isThemeReady]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  }

  function toggleMenu() {
    setIsMenuOpen((currentState) => !currentState);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link className="brand" href={`/${locale}`} onClick={closeMenu}>
          Kuyash
        </Link>
        <button
          aria-controls="primary-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className={isMenuOpen ? "menu-toggle menu-toggle-active" : "menu-toggle"}
          onClick={toggleMenu}
          type="button"
        >
          <span aria-hidden="true">{isMenuOpen ? "✕" : "☰"}</span>
        </button>
        <nav
          aria-label="Primary navigation"
          className={isMenuOpen ? "primary-nav primary-nav-open" : "primary-nav"}
          id="primary-navigation"
        >
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    className={isActive ? "nav-link nav-link-active" : "nav-link"}
                    href={item.href}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div
          aria-label="Language and theme controls"
          className={isMenuOpen ? "controls controls-open" : "controls"}
        >
          <div className="locale-switch" aria-label="Language switch">
            <Link
              className={locale === "tr" ? "locale-link locale-link-active" : "locale-link"}
              href={trHref}
              onClick={closeMenu}
            >
              TR
            </Link>
            <Link
              className={locale === "en" ? "locale-link locale-link-active" : "locale-link"}
              href={enHref}
              onClick={closeMenu}
            >
              EN
            </Link>
          </div>
          <button
            aria-label="Toggle dark mode"
            aria-pressed={theme === "dark"}
            className={theme === "dark" ? "theme-toggle theme-toggle-active" : "theme-toggle"}
            onClick={toggleTheme}
            type="button"
          >
            {theme === "dark" ? "Dark: On" : "Dark: Off"}
          </button>
        </div>
      </div>
    </header>
  );
}
