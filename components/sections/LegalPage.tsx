import { site } from "@/content/site";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./LegalPage.module.css";

interface Props {
  doc: (typeof site.legal)["privacy"];
}

/** Shared layout for the plain-text Privacy and Terms pages. */
export function LegalPage({ doc }: Props) {
  return (
    <div id="top">
      <Header basePath="/" />
      <main className={styles.main}>
        <h1 className={styles.title}>{doc.title}</h1>
        <p className={styles.updated}>{site.legal.updated}</p>
        {doc.sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h2 className={styles.heading}>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </main>
      <Footer basePath="/" />
    </div>
  );
}
