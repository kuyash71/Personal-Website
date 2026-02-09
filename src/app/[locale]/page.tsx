import { profileData } from "@/content/profile";
import { isLocale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import { notFound } from "next/navigation";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const profile = profileData[resolvedParams.locale];
  const dictionary = messages[resolvedParams.locale];

  return (
    <>
      <section className="section">
        <h1>{profile.fullName}</h1>
        <p>
          <strong>{profile.title}</strong>
        </p>
        <p>{profile.summary}</p>
      </section>

      <section className="section">
        <h2>{dictionary.home.skillsHeading}</h2>
        <ul className="meta-list">
          {profile.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>{dictionary.home.linksHeading}</h2>
        <ul className="meta-list">
          {profile.socialLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
