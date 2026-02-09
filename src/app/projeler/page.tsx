import { projectsData } from "@/content/projects";

export default function ProjectsPage() {
  return (
    <section className="section">
      <h1>Projeler</h1>
      <p>Yazilim projeleri ve bagli GitHub repo linkleri.</p>
      <div className="grid grid-3">
        {projectsData.map((project) => (
          <article className="section" key={project.name}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
            <p>
              <strong>Teknolojiler:</strong> {project.techStack.join(", ")}
            </p>
            <p>
              <a href={project.repoUrl} rel="noreferrer" target="_blank">
                GitHub Repo
              </a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
