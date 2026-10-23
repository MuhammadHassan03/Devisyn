import { site } from "@/content/site";
import { Card } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import styles from "./Comparison.module.css";

export function Comparison() {
  const { comparison } = site;

  return (
    <Section>
      <SectionHeading
        start={comparison.headlineStart}
        accent={comparison.accent}
        end={comparison.headlineEnd}
        center
        className={styles.heading}
      />
      <Reveal mode="children" className={styles.grid}>
        <Card tone="dashed" className={styles.card}>
          <h3 className={styles.label}>{comparison.beforeLabel}</h3>
          <CheckList className={styles.before} variant="cross" accent items={comparison.before} />
        </Card>
        <Card tone="mint" lift shadow className={styles.card}>
          <h3 className={styles.labelDark}>{comparison.afterLabel}</h3>
          <CheckList className={styles.after} variant="tick" accent items={comparison.after} />
        </Card>
      </Reveal>
    </Section>
  );
}
