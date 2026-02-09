import { notFound } from "next/navigation";
import { projectsData } from "@/content/projects";
import { isLocale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

type ProjectsPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const dictionary = messages[resolvedParams.locale];
  const projects = projectsData[resolvedParams.locale];

  return (
    <section className="section">
      <h1>{dictionary.projects.title}</h1>
      <p>{dictionary.projects.subtitle}</p>
      <div className="grid grid-3">
        {projects.map((project) => (
          <article className="section" key={project.name}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>
              <strong>{dictionary.projects.technologiesLabel}:</strong> {project.techStack.join(", ")}
            </p>
            <p>
              <a href={project.repoUrl} rel="noreferrer" target="_blank">
                {dictionary.projects.repoCta}
              </a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
