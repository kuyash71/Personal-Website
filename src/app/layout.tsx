import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuyash | Personal Website",
  description: "Personal profile, projects, and Sun Trilogy worlds."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main className="page">
          <div className="container">{children}</div>
        </main>
      </body>
    </html>
  );
}
