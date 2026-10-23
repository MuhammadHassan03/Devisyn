import type { ElementType, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Reveal } from "./Reveal";
import styles from "./Section.module.css";

interface SectionProps {
  id?: string;
  /** plain sections sit on the page; peach and ink are full-bleed bands */
  tone?: "plain" | "peach" | "ink";
  className?: string;
  children: ReactNode;
}

/** Full-bleed band with the one shared container, so every section hits the same grid edges. */
export function Section({ id, tone = "plain", className, children }: SectionProps) {
  return (
    <section id={id} className={cx(styles.section, styles[tone])}>
      <div className={cx(styles.container, className)}>{children}</div>
    </section>
  );
}

interface HeadingProps {
  start?: string;
  accent: string;
  end?: string;
  eyebrow?: string;
  as?: "h1" | "h2" | "h3";
  accentTone?: "inherit" | "peach" | "mint";
  eyebrowTone?: "inherit" | "peach" | "mint";
  center?: boolean;
  size?: "md" | "lg";
  /** caps the heading width, in em of the heading font size */
  maxEm?: number;
  className?: string;
}

/** Wraps each word in a mask so the heading can rise in word by word. The full text stays in the DOM. */
function words(text: string) {
  return text.split(" ").map((word, i, all) => (
    <span key={`${word}-${i}`}>
      <span className={styles.mask}>
        <span data-word className={styles.word}>{word}</span>
      </span>
      {i < all.length - 1 && " "}
    </span>
  ));
}

/** Display heading with the italic serif accent word. */
export function SectionHeading({
  start,
  accent,
  end,
  eyebrow,
  as = "h2",
  accentTone = "inherit",
  eyebrowTone = "inherit",
  center,
  size = "md",
  maxEm,
  className,
}: HeadingProps) {
  return (
    <div className={cx(center && styles.center, className)}>
      {eyebrow && (
        <p className={cx(styles.eyebrow, eyebrowTone === "mint" && styles.mint, eyebrowTone === "peach" && styles.peachText)}>
          {eyebrow}
        </p>
      )}
      <Reveal
        as={as}
        mode="words"
        className={cx(styles.heading, size === "lg" && styles.headingLg, eyebrow && styles.afterEyebrow)}
        style={maxEm ? { maxWidth: `${maxEm}em` } : undefined}
      >
        {start && <>{words(start)} </>}
        <em className={cx(styles.accent, accentTone === "peach" && styles.peachText, accentTone === "mint" && styles.mint)}>
          {words(accent)}
        </em>
        {end && <> {words(end)}</>}
      </Reveal>
    </div>
  );
}
