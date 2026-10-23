import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";
import styles from "./CheckList.module.css";

interface Props {
  items: string[];
  /** draw: animated circled check, tick: text ✓, cross: text ✕ */
  variant?: "draw" | "tick" | "cross";
  /** colour the mark (green for ticks, red for crosses) */
  accent?: boolean;
  /** lay items out in a wrapping row */
  row?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function CheckList({ items, variant = "tick", accent, row, className, style }: Props) {
  return (
    <ul className={cx(styles.list, row && styles.row, className)} style={style}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {variant === "draw" ? (
            <svg className={cx("anim-check", styles.draw)} width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="11" fill="#fff" stroke="var(--ink)" strokeWidth="1.5" />
              <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="var(--green-deep)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <span
              className={cx(styles.mark, accent && (variant === "cross" ? styles.cross : styles.tick))}
              aria-hidden="true"
            >
              {variant === "cross" ? "✕" : "✓"}
            </span>
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
