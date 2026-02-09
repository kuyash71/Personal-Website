import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { isLocale, locales } from "@/i18n/config";
import { messages } from "@/i18n/messages";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    return {};
  }

  return {
    title: messages[resolvedParams.locale].metadata.title,
    description: messages[resolvedParams.locale].metadata.description
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const dictionary = messages[resolvedParams.locale];

  return (
    <>
      <Navbar labels={dictionary.nav} locale={resolvedParams.locale} />
      <main className="page">
        <div className="container">{children}</div>
      </main>
    </>
  );
}
