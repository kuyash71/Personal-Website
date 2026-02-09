import { notFound } from "next/navigation";
import { sunTrilogyData } from "@/content/sun-trilogy";
import { isLocale } from "@/i18n/config";
import type { SunTrilogyIcon, SunTrilogyStoryStatus, SunTrilogyTheme } from "@/types/content";
import type { IconType } from "react-icons";
import {
  BsChevronRight,
  BsClockHistory,
  BsEyeFill,
  BsGithub,
  BsHourglassSplit,
  BsMoonFill,
  BsPenFill,
  BsSunFill
} from "react-icons/bs";

type SunTrilogyPageProps = {
  params: Promise<{ locale: string }>;
};

const universeIconMap: Record<SunTrilogyIcon, IconType> = {
  eye: BsEyeFill,
  moon: BsMoonFill,
  sun: BsSunFill
};

const statusIconMap: Record<SunTrilogyStoryStatus, IconType> = {
  pending: BsHourglassSplit,
  writing: BsPenFill,
  planned: BsClockHistory
};

const universeThemeClassMap: Record<SunTrilogyTheme, string> = {
  war: "sun-universe-node-war",
  shadow: "sun-universe-node-shadow",
  dawn: "sun-universe-node-dawn"
};

const iconToneClassMap: Record<SunTrilogyIcon, string> = {
  eye: "sun-tone-war",
  moon: "sun-tone-shadow",
  sun: "sun-tone-dawn"
};

export default async function SunTrilogyPage({ params }: SunTrilogyPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const content = sunTrilogyData[resolvedParams.locale];

  return (
    <section className="sun-trilogy-layout">
      <article className="section sun-intro-card">
        <h2>{content.introTitle}</h2>
        <p>{content.introText}</p>
      </article>

      <article className="section sun-core-card">
        <h1 className="sun-core-title">{content.title}</h1>
        <p className="sun-core-slogan">{content.slogan}</p>

        <div className="sun-universe-track">
          {content.universes.map((universe, index) => {
            const UniverseIcon = universeIconMap[universe.icon];

            return (
              <div className="sun-universe-track-item" key={universe.id}>
                <article className={`sun-universe-node ${universeThemeClassMap[universe.theme]}`}>
                  <a className="sun-universe-anchor" href={`#${universe.detailId}`}>
                    <span className={`sun-universe-icon ${iconToneClassMap[universe.icon]}`} aria-hidden="true">
                      <UniverseIcon size={18} />
                    </span>
                    <h2>{universe.name}</h2>
                    <p className="sun-universe-era">{universe.era}</p>
                  </a>
                  <p className="sun-universe-summary">{universe.summary}</p>
                  <a className="sun-universe-repo" href={universe.githubUrl} rel="noreferrer" target="_blank">
                    <span className="sun-universe-repo-icon" aria-hidden="true">
                      <BsGithub size={15} />
                    </span>
                    GitHub
                  </a>
                </article>

                {index < content.universes.length - 1 ? (
                  <span className="sun-universe-separator" aria-hidden="true">
                    <BsChevronRight size={18} />
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </article>

      <article className="section sun-stories-card">
        <h2>{content.storiesTitle}</h2>

        <div className="sun-story-list">
          {content.stories.map((story) => {
            const StoryIcon = universeIconMap[story.icon];
            const StatusIcon = statusIconMap[story.status];

            return (
              <article className="sun-story-item" id={story.id} key={story.id}>
                <header className="sun-story-header">
                  <div className="sun-story-title-row">
                    <span className={`sun-story-icon ${iconToneClassMap[story.icon]}`} aria-hidden="true">
                      <StoryIcon size={18} />
                    </span>
                    <h3>{story.title}</h3>
                  </div>
                  <span className="sun-story-era">{story.startDate}</span>
                </header>

                <p className="sun-story-description">{story.description}</p>

                <p className="sun-story-status">
                  <span className="sun-story-status-icon" aria-hidden="true">
                    <StatusIcon size={14} />
                  </span>
                  {content.statuses[story.status]}
                </p>
              </article>
            );
          })}
        </div>
      </article>
    </section>
  );
}
