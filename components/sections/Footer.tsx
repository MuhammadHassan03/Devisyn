import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CopyEmail } from "./CopyEmail";
import styles from "./Footer.module.css";

interface Props {
  /** "/" on pages other than the home page, so anchors become /#services */
  basePath?: string;
}

export function Footer({ basePath = "" }: Props) {
  const { footer, name, services, industries, contact } = site;
  const href = (hash: string) => `${basePath}${hash}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <h2 className={styles.cta}>{footer.ctaTitle}</h2>
          <Button href={href(footer.cta.href)} variant="light" size="lg">
            {footer.cta.label}
          </Button>
        </div>

        <div className={styles.columns}>
          <div className={styles.brand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-on-dark.svg" alt={name} width={154} height={40} loading="lazy" decoding="async" />
            <p>{footer.tagline}</p>
          </div>

          <nav aria-label={footer.columns.services}>
            <h3 className={styles.heading}>{footer.columns.services}</h3>
            <ul className={styles.list}>
              {services.map((s) => (
                <li key={s.n}>
                  <a href={href(`#service-${s.n}`)}>{s.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={footer.columns.industries}>
            <h3 className={styles.heading}>{footer.columns.industries}</h3>
            <ul className={styles.list}>
              {industries.items.map((i) => (
                <li key={i.id}>
                  <a href={href(`#${i.id}`)}>{i.menuLabel}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={footer.columns.company}>
            <h3 className={styles.heading}>{footer.columns.company}</h3>
            <ul className={styles.list}>
              {footer.company.map((link) => (
                <li key={link.href}>
                  <a href={href(link.href)}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className={styles.heading}>{footer.columns.contact}</h3>
            <ul className={styles.list}>
              <li className={styles.email}>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <CopyEmail email={contact.email} label={footer.copyEmail} copiedLabel={footer.copied} />
              </li>
              <li>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={contact.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div aria-hidden="true" className={styles.markWrap}>
          <Reveal className={styles.mark}>{name.toLowerCase()}</Reveal>
        </div>

        <div className={styles.bottom}>
          <span>{footer.copyright}</span>
          <ul className={styles.legal}>
            {footer.legal.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a href="#top">{footer.backToTop}</a>
        </div>
      </div>
    </footer>
  );
}
