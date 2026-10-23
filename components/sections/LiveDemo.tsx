import { site } from "@/content/site";
import { Pill } from "@/components/ui/Pill";
import { Section, SectionHeading } from "@/components/ui/Section";
import { LiveDemoLazy } from "./LiveDemoLazy";
import styles from "./LiveDemo.module.css";

export function LiveDemo() {
  const { demo } = site;

  return (
    <Section id={demo.id}>
      <div className={styles.head}>
        <div>
          <Pill mono className={styles.pill}>{demo.pill}</Pill>
          <SectionHeading start={demo.headlineStart} accent={demo.accent} className={styles.title} />
        </div>
        <p className={styles.intro}>{demo.intro}</p>
      </div>
      <LiveDemoLazy />
    </Section>
  );
}
