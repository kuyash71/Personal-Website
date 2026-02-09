import { homeContent, type SoftwareIconKey } from "@/content/home";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";
import type { IconType } from "react-icons";
import Link from "next/link";
import {
  BsBoxes,
  BsBraces,
  BsCodeSlash,
  BsDiagram3,
  BsHddNetwork,
  BsKey,
  BsMoonFill,
  BsMortarboardFill,
  BsRobot,
  BsRocketTakeoff,
  BsTerminal,
  BsTrophyFill,
  BsTranslate
} from "react-icons/bs";
import { FaMicrochip } from "react-icons/fa";
import {
  SiArduino,
  SiCplusplus,
  SiDocker,
  SiGit,
  SiGodotengine,
  SiNeovim,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRos,
  SiSpringboot
} from "react-icons/si";
import { TbBrandMinecraft } from "react-icons/tb";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

const repoIconMap = {
  drone: BsRocketTakeoff,
  gcs: BsHddNetwork,
  story: BsMoonFill
} as const;

const softwareIconMap: Record<SoftwareIconKey, IconType> = {
  cpp: SiCplusplus,
  java: SiOpenjdk,
  minecraft: TbBrandMinecraft,
  react: SiReact,
  neovim: SiNeovim,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  ardupilot: BsRobot,
  mavproxy: BsTerminal,
  git: SiGit,
  godot: SiGodotengine,
  ssh: BsKey,
  ros2: SiRos,
  gazebo: BsBoxes,
  stm32: FaMicrochip,
  opencv: SiOpencv,
  pid: BsDiagram3,
  arduino: SiArduino,
  python: SiPython,
  restapi: BsHddNetwork,
  oop: BsBraces,
  postgresql: SiPostgresql,
  springboot: SiSpringboot,
  docker: SiDocker
};

export default async function HomePage({ params }: HomePageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const content = homeContent[resolvedParams.locale];

  return (
    <>
      <section className="section home-intro">
        <h1>{content.greetingTitle}</h1>
        <p>{content.intro}</p>
        <div className="cta-row">
          {content.ctaLinks.map((link) =>
            link.type === "internal" ? (
              <Link className="cta-link" href={`/${resolvedParams.locale}/${link.href}`} key={link.label}>
                {link.label}
              </Link>
            ) : (
              <a className="cta-link" href={link.href} key={link.label} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            )
          )}
        </div>
      </section>

      <section className="section">
        <h2>{content.currentFocusTitle}</h2>
        <ul className="focus-list">
          {content.currentFocusItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>{content.repoHighlightsTitle}</h2>
        <div className="repo-grid">
          {content.repoHighlights.map((repo) => {
            const RepoIcon = repoIconMap[repo.icon];

            return (
              <article className="repo-card" key={repo.href}>
                <span className="repo-icon" aria-hidden="true">
                  <RepoIcon size={20} />
                </span>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <a href={repo.href} rel="noreferrer" target="_blank">
                  {repo.href.replace(/^https?:\/\//, "")}
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <h2>{content.softwareTitle}</h2>
        <div className="stack-level-grid" aria-label={content.softwareTitle}>
          {content.softwareLevels.map((level) => (
            <article className="stack-level-card" key={level.title}>
              <h3>{level.title}</h3>
              <div className="software-grid">
                {level.items.map((skill) => {
                  const SkillIcon = softwareIconMap[skill.icon] ?? BsCodeSlash;

                  return (
                    <article className="software-card" key={`${level.title}-${skill.name}`}>
                      <span className="software-icon" aria-hidden="true">
                        <SkillIcon size={18} />
                      </span>
                      <span className="software-name">{skill.name}</span>
                    </article>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>{content.educationTitle}</h2>
        <div className="education-grid">
          <article className="education-card">
            <h3>
              <span className="education-heading-icon" aria-hidden="true">
                <BsTranslate size={16} />
              </span>
              <span>{content.languageTitle}</span>
            </h3>
            <ul className="meta-list">
              {content.languageItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="education-card">
            <h3>
              <span className="education-heading-icon" aria-hidden="true">
                <BsMortarboardFill size={16} />
              </span>
              <span>{content.universityTitle}</span>
            </h3>
            <p>{content.universityValue}</p>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>{content.achievementsTitle}</h2>
        <div className="achievement-grid">
          {content.achievements.map((achievement) => (
            <article className="achievement-card" key={achievement.title}>
              <span className="achievement-icon" aria-hidden="true">
                <BsTrophyFill size={20} />
              </span>
              <h3>{achievement.title}</h3>
              <p>{achievement.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
