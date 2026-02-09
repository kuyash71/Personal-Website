import { contactContent } from "@/content/contact";

export default function ContactPage() {
  return (
    <section className="section">
      <h1>{contactContent.title}</h1>
      <p>{contactContent.description}</p>

      <form action="/api/contact" method="post">
        <div className="form-row">
          <label htmlFor="name">Ad</label>
          <input className="input" id="name" name="name" required />
        </div>

        <div className="form-row">
          <label htmlFor="email">E-posta</label>
          <input className="input" id="email" name="email" required type="email" />
        </div>

        <div className="form-row">
          <label htmlFor="subject">Konu</label>
          <input className="input" id="subject" name="subject" required />
        </div>

        <div className="form-row">
          <label htmlFor="message">Mesaj</label>
          <textarea className="textarea" id="message" name="message" required />
        </div>

        <input aria-hidden="true" autoComplete="off" name="website" style={{ display: "none" }} tabIndex={-1} />

        <button className="button" type="submit">
          Mesaj Gonder
        </button>
      </form>

      <p className="footer-note">
        Not: E-posta gonderimi icin `.env.local` dosyasinda `EMAIL_PROVIDER=resend` ve ilgili anahtarlar tanimli olmalidir.
      </p>
    </section>
  );
}
