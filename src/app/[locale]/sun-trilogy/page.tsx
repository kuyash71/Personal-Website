import { notFound } from "next/navigation";
import { sunTrilogyData } from "@/content/sun-trilogy";
import { isLocale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

type SunTrilogyPageProps = {
  params: Promise<{ locale: string }> | { locale: string };
};

export default async function SunTrilogyPage({ params }: SunTrilogyPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const dictionary = messages[resolvedParams.locale];
  const universes = sunTrilogyData[resolvedParams.locale];

  return (
    <section className="section">
      <h1>{dictionary.sunTrilogy.title}</h1>
      <p>{dictionary.sunTrilogy.subtitle}</p>
      <div className="grid grid-3">
        {universes.map((universe) => (
          <article className="section" key={universe.id}>
            <span className="badge">{dictionary.sunTrilogy.wipBadge}</span>
            <h2>{universe.name}</h2>
            <p>{universe.tagline}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
