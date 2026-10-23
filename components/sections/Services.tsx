import { site } from "@/content/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServicesExplorer } from "./ServicesExplorer";
import styles from "./Services.module.css";

export function Services() {
  const { servicesSection } = site;

  return (
    <Section id="services">
      <div className={styles.head}>
        <SectionHeading start={servicesSection.headlineStart} accent={servicesSection.accent} />
        <p className={styles.intro}>{servicesSection.intro}</p>
      </div>
      <ServicesExplorer />
    </Section>
  );
}
