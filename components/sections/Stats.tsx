import { site } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import styles from "./Stats.module.css";

export function Stats() {
  const { stats } = site;

  return (
    <Section>
      <SectionHeading
        eyebrow={stats.eyebrow}
        start={stats.headlineStart}
        accent={stats.accent}
        end={stats.headlineEnd}
        maxEm={14}
        className={styles.heading}
      />
      <Reveal as="ul" mode="children" className={styles.grid}>
        {stats.items.map((item) => (
          <li key={item.value} className={styles.cell}>
            <Card tone={item.tone} lift className={styles.card}>
              <p className={styles.value}>{item.value}</p>
              <p className={item.tone === "white" ? styles.textSoft : styles.text}>{item.text}</p>
            </Card>
          </li>
        ))}
      </Reveal>
      <p className={styles.source}>{stats.source}</p>
    </Section>
  );
}
