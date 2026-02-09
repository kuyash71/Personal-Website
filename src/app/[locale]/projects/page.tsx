import { notFound } from "next/navigation";
import {
  projectsData,
  type ProjectCategoryKey,
  type ProjectStatusKey
} from "@/content/projects";
import { isLocale } from "@/i18n/config";
import { messages } from "@/i18n/messages";
import type { IconType } from "react-icons";
import {
  BsArrowUpRight,
  BsCheck2Circle,
  BsChevronDown,
  BsClockHistory,
  BsGithub,
  BsHourglassSplit,
  BsMortarboardFill,
  BsPaletteFill,
  BsRobot
} from "react-icons/bs";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

const categoryIconMap: Record<ProjectCategoryKey, IconType> = {
  academic: BsMortarboardFill,
  creative: BsPaletteFill,
  robotics: BsRobot
};

const statusIconMap: Record<ProjectStatusKey, IconType> = {
  active: BsCheck2Circle,
  pending: BsHourglassSplit,
  planned: BsClockHistory,
  planning: BsClockHistory
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const dictionary = messages[resolvedParams.locale];
  const content = projectsData[resolvedParams.locale];
  const categoryTitleByKey = new Map(content.categories.map((category) => [category.key, category.title]));
  const projectById = new Map(content.projects.map((project) => [project.id, project]));

  return (
    <section className="projects-layout">
      <article className="section projects-intro-card">
        <p className="projects-kicker">{content.introTitle}</p>
        <h1>{dictionary.projects.title}</h1>
        <p className="projects-intro-text">{content.introText}</p>

        <blockquote className="projects-quote-card">
          <p>{content.quoteText}</p>
          <cite>{content.quoteAuthor}</cite>
        </blockquote>
      </article>

      <article className="section projects-list-card">
        <h2>{content.listTitle}</h2>
        <div className="projects-category-grid">
          {content.categories.map((category) => {
            const CategoryIcon = categoryIconMap[category.key];

            return (
              <article className="projects-category-card" key={category.key}>
                <h3>
                  <span className="projects-category-icon" aria-hidden="true">
                    <CategoryIcon size={16} />
                  </span>
                  {category.title}
                </h3>
                <ul>
                  {category.projectIds.map((projectId) => {
                    const project = projectById.get(projectId);

                    if (!project) {
                      return null;
                    }

                    return (
                      <li key={project.id}>
                        <a href={`#project-${project.id}`}>
                          <span>{project.title}</span>
                          <span className="projects-category-link-icon" aria-hidden="true">
                            <BsArrowUpRight size={14} />
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>
      </article>

      <article className="section projects-details-card">
        <h2>{content.detailsTitle}</h2>

        <div className="projects-detail-list">
          {content.projects.map((project, index) => {
            const StatusIcon = statusIconMap[project.status];

            return (
              <details className="project-detail-entry" id={`project-${project.id}`} key={project.id} open={index === 0}>
                <summary className="project-detail-summary">
                  <span className="project-detail-summary-main">
                    <span className="project-detail-title">{project.title}</span>
                    <span className="project-category-pill">
                      {categoryTitleByKey.get(project.category) ?? project.category}
                    </span>
                  </span>
                  <span className="project-detail-summary-caret" aria-hidden="true">
                    <BsChevronDown size={16} />
                  </span>
                </summary>

                <div className="project-detail-body">
                  <p className="project-detail-description">{project.description}</p>

                  <p className="project-status-row">
                    <span className="project-meta-label">{content.statusLabel}</span>
                    <span className="project-status-pill">
                      {content.statusLabels[project.status]}
                      <StatusIcon size={14} />
                    </span>
                  </p>

                  <div className="project-meta-section">
                    <p className="project-meta-label">{content.technologiesLabel}</p>
                    {project.technologies.length > 0 ? (
                      <div className="project-tech-pills">
                        {project.technologies.map((technology) => (
                          <span className="project-tech-pill" key={`${project.id}-${technology}`}>
                            {technology}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="project-empty">{content.noTechLabel}</p>
                    )}
                  </div>

                  <div className="project-meta-section">
                    <p className="project-meta-label">{content.githubLabel}</p>
                    {project.repositories.length > 0 ? (
                      <div className="project-repo-links">
                        {project.repositories.map((repository) => (
                          <a href={repository.href} key={repository.href} rel="noreferrer" target="_blank">
                            <span className="project-repo-icon" aria-hidden="true">
                              <BsGithub size={14} />
                            </span>
                            {repository.label}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <p className="project-empty">{content.noRepoLabel}</p>
                    )}
                  </div>
                </div>
              </details>
            );
          })}
        </div>
      </article>
    </section>
  );
}
