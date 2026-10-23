import { site } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CalculatorLazy } from "./CalculatorLazy";
import styles from "./Calculator.module.css";

export function Calculator() {
  const { calculator } = site;

  return (
    <Section id={calculator.id}>
      <SectionHeading
        eyebrow={calculator.eyebrow}
        start={calculator.headlineStart}
        accent={calculator.accent}
        className={styles.heading}
      />
      <p className={styles.intro}>{calculator.intro}</p>
      <CalculatorLazy />
    </Section>
  );
}
