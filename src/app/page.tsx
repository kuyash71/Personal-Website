import { profileData } from "@/content/profile";

export default function HomePage() {
  return (
    <>
      <section className="section">
        <h1>{profileData.fullName}</h1>
        <p>
          <strong>{profileData.title}</strong>
        </p>
        <p>{profileData.summary}</p>
      </section>

      <section className="section">
        <h2>Yetkinlikler</h2>
        <ul className="meta-list">
          {profileData.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>Baglantilar</h2>
        <ul className="meta-list">
          {profileData.socialLinks.map((link) => (
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
