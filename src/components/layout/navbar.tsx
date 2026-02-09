"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link className="brand" href="/">
          Kuyash
        </Link>
        <nav aria-label="Ana gezinti">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => {
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
      </div>
    </header>
  );
}
