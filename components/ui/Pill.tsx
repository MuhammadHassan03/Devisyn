import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Pill.module.css";

interface Props {
  tone?: "white" | "peach" | "lilac";
  mono?: boolean;
  /** blinking green dot, used for status pills */
  live?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Pill({ tone = "white", mono, live, className, style, children }: Props) {
  return (
    <span className={cx(styles.pill, styles[tone], mono && styles.mono, live && styles.live, className)} style={style}>
      {live && <span className={cx("anim-blink", styles.dot)} aria-hidden="true" />}
      {children}
    </span>
  );
}
