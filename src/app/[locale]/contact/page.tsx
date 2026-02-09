import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

type ContactPageProps = {
  params: Promise<{ locale: string }> | { locale: string };
};

export default async function ContactPage({ params }: ContactPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const dictionary = messages[resolvedParams.locale];

  return (
    <section className="section">
      <h1>{dictionary.contact.title}</h1>
      <p>{dictionary.contact.description}</p>

      <form action="/api/contact" method="post">
        <div className="form-row">
          <label htmlFor="name">{dictionary.contact.labels.name}</label>
          <input className="input" id="name" name="name" required />
        </div>

        <div className="form-row">
          <label htmlFor="email">{dictionary.contact.labels.email}</label>
          <input className="input" id="email" name="email" required type="email" />
        </div>

        <div className="form-row">
          <label htmlFor="subject">{dictionary.contact.labels.subject}</label>
          <input className="input" id="subject" name="subject" required />
        </div>

        <div className="form-row">
          <label htmlFor="message">{dictionary.contact.labels.message}</label>
          <textarea className="textarea" id="message" name="message" required />
        </div>

        <input aria-hidden="true" autoComplete="off" name="website" style={{ display: "none" }} tabIndex={-1} />

        <button className="button" type="submit">
          {dictionary.contact.submit}
        </button>
      </form>

      <p className="footer-note">{dictionary.contact.note}</p>
    </section>
  );
}
