import type { ReactNode } from "react";
import { Montserrat } from "next/font/google";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans"
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>{children}</body>
    </html>
  );
}
