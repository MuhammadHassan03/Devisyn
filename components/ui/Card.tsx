import type { CSSProperties, ElementType, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Card.module.css";

interface Props {
  tone?: "white" | "peach" | "mint" | "lilac" | "dark" | "dashed";
  lift?: boolean;
  shadow?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Card({ tone = "white", lift, shadow, as: Tag = "div", className, style, children }: Props) {
  return (
    <Tag className={cx(styles.card, styles[tone], lift && styles.lift, shadow && styles.shadow, className)} style={style}>
      {children}
    </Tag>
  );
}
