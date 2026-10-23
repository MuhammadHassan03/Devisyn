import { site } from "@/content/site";
import { CheckList } from "@/components/ui/CheckList";
import { SectionHeading } from "@/components/ui/Section";
import { Parallax } from "@/components/ui/Parallax";
import { SpinningBadge } from "@/components/ui/SpinningBadge";
import { ContactForm } from "./ContactForm";
import styles from "./Contact.module.css";

export function Contact() {
  const { contact } = site;

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.panel}>
        <Parallax className={styles.badgeSlot} distance={-40}>
          <SpinningBadge text={contact.badgeText} size={220} tone="mint" />
        </Parallax>

        <div className={styles.copy}>
          <SectionHeading
            eyebrow={contact.eyebrow}
            eyebrowTone="peach"
            start={contact.headlineStart}
            accent={contact.accent}
            accentTone="mint"
            size="lg"
          />
          <p className={styles.body}>{contact.body}</p>
          <CheckList className={styles.checks} items={[...contact.checks]} />
        </div>

        <div className={styles.formWrap}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
