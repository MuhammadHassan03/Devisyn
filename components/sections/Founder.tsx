import fs from "node:fs";
import path from "node:path";
import { site } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import styles from "./Founder.module.css";

const PHOTO = "/brand/founder.jpg";

/** Shows the photo once public/brand/founder.jpg exists, initials until then. */
const hasPhoto = () => fs.existsSync(path.join(process.cwd(), "public", PHOTO));

export function Founder() {
  const { founder } = site;
  const initials = founder.name.split(" ").map((part) => part[0]).join("");

  return (
    <Section id={founder.id}>
      <SectionHeading
        eyebrow={founder.eyebrow}
        start={founder.headlineStart}
        accent={founder.accent}
        className={styles.heading}
      />
      <Reveal className={styles.layout}>
        <div className={styles.photo}>
          {hasPhoto() ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={PHOTO} alt={founder.photoAlt} width={480} height={560} loading="lazy" decoding="async" />
          ) : (
            <span className={styles.initials} aria-hidden="true">{initials}</span>
          )}
        </div>

        <div className={styles.copy}>
          {founder.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {founder.linkedin && (
            <p>
              <a href={founder.linkedin} target="_blank" rel="noopener noreferrer">
                {founder.linkedinLabel} →
              </a>
            </p>
          )}
        </div>

        <Card className={styles.facts}>
          <p className={styles.factsName}>{founder.name}</p>
          <dl>
            {founder.facts.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </Reveal>
    </Section>
  );
}
