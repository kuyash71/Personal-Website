import Link from "next/link";
import { siteFooterContent } from "@/content/home";
import type { Locale } from "@/i18n/config";
import { BsChatDots, BsEnvelope, BsGithub, BsLinkedin } from "react-icons/bs";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const content = siteFooterContent[locale];

  return (
    <footer className="site-footer">
      <div className="container site-footer-grid">
        <div className="site-footer-column">
          {content.socialLinks.map((link) => (
            <a className="footer-item" href={link.href} key={link.href} rel="noreferrer" target="_blank">
              <span className="footer-icon">
                {link.icon === "github" ? <BsGithub size={16} /> : <BsLinkedin size={16} />}
              </span>
              <span>{link.label}</span>
            </a>
          ))}
          <p className="site-footer-timeline">{content.timelineNote}</p>
        </div>

        <div className="site-footer-column site-footer-column-right">
          <a className="footer-item" href={`mailto:${content.email}`}>
            <span className="footer-icon">
              <BsEnvelope size={16} />
            </span>
            <span>{content.email}</span>
          </a>

          <Link className="footer-item" href={`/${locale}/contact`}>
            <span className="footer-icon">
              <BsChatDots size={16} />
            </span>
            <span>{content.contactLabel}</span>
          </Link>

          <p className="site-footer-warning">{content.warning}</p>
        </div>
      </div>

      <div className="site-footer-meta">
        <div className="container site-footer-meta-inner">
          <p className="site-footer-signature">
            <span>{content.signaturePrefix}</span>{" "}
            <a href={content.signatureHref} rel="noreferrer" target="_blank">
              {content.signatureLabel}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
