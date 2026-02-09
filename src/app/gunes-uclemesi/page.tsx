import { sunTrilogyData } from "@/content/sun-trilogy";

export default function SunTrilogyPage() {
  return (
    <section className="section">
      <h1>Güneş Üçlemesi</h1>
      <p>Bu bolum ozel olarak insa edilecek. Simdilik WIP durumundadir.</p>
      <div className="grid grid-3">
        {sunTrilogyData.map((universe) => (
          <article className="section" key={universe.id}>
            <span className="badge">WIP</span>
            <h2>{universe.name}</h2>
            <p>{universe.tagline}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
