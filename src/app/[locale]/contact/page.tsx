import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact/contact-form";
import { isLocale } from "@/i18n/config";
import { messages } from "@/i18n/messages";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
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

      <ContactForm labels={dictionary.contact} locale={resolvedParams.locale} />

      <p className="footer-note">{dictionary.contact.note}</p>
    </section>
  );
}
