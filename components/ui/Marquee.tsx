import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Marquee.module.css";

interface Props {
  items: string[];
  /** rendered between items */
  separator: (index: number) => ReactNode;
  variant: "display" | "serif";
  reverse?: boolean;
}

/** One endlessly scrolling row. The list is rendered twice so the -50% loop is seamless. */
export function Marquee({ items, separator, variant, reverse }: Props) {
  const group = items.map((item, i) => (
    <span key={item} className={styles.group}>
      <span>{item}</span>
      <span className={styles.separator}>{separator(i)}</span>
    </span>
  ));

  return (
    <div
      className={cx(styles.track, styles[variant], reverse ? "anim-marquee-reverse" : "anim-marquee")}
      aria-hidden="true"
    >
      <div className={styles.half}>{group}</div>
      <div className={styles.half}>{group}</div>
    </div>
  );
}
