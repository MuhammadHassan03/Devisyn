import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cx } from "@/lib/cx";
import styles from "./Journey.module.css";

export function Journey() {
  const { journey } = site;

  return (
    <Section id="journey" tone="ink">
      <SectionHeading
        eyebrow={journey.eyebrow}
        start={journey.headlineStart}
        accent={journey.accent}
        end={journey.headlineEnd}
        accentTone="peach"
        eyebrowTone="mint"
        maxEm={15}
        className={styles.heading}
      />
      <div className={styles.track}>
        <div className={styles.line} aria-hidden="true" />
        <span className={cx("anim-travel", styles.traveler)} aria-hidden="true" />
        <Reveal as="ol" mode="children" className={styles.steps}>
          {journey.steps.map((step, i) => (
            <li key={step.title} className={styles.step}>
              <div className={cx(styles.node, styles[step.tone])}>{i + 1}</div>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
