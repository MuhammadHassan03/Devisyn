import { site } from "@/content/site";
import { Accordion } from "@/components/ui/Accordion";
import { Section, SectionHeading } from "@/components/ui/Section";
import styles from "./Faq.module.css";

export function Faq() {
  const { faq } = site;

  return (
    <Section id="faq">
      <SectionHeading start={faq.headlineStart} accent={faq.accent} className={styles.heading} />
      <div className={styles.list}>
        <Accordion items={faq.items.map(({ q, a }) => ({ question: q, answer: a }))} />
      </div>
    </Section>
  );
}
