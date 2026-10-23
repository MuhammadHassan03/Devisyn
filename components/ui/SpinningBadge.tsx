import { useId } from "react";
import { cx } from "@/lib/cx";
import styles from "./SpinningBadge.module.css";

interface Props {
  text: string;
  size: number;
  tone: "peach" | "mint";
  /** outlined badge with a solid centre dot */
  outlined?: boolean;
  className?: string;
}

/** Decorative rotating text badge. */
export function SpinningBadge({ text, size, tone, outlined, className }: Props) {
  const pathId = `badge-${useId().replace(/\W/g, "")}`;

  return (
    <svg
      className={cx("anim-spin", styles.badge, className)}
      width={size}
      height={size}
      viewBox="0 0 132 132"
      aria-hidden="true"
    >
      <circle
        cx="66"
        cy="66"
        r="64"
        fill={tone === "peach" ? "var(--peach)" : "var(--mint)"}
        stroke={outlined ? "var(--ink)" : "none"}
        strokeWidth="1.5"
      />
      <defs>
        <path id={pathId} d="M66,66 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
      </defs>
      <text className={styles.text} fontSize="11.5" letterSpacing="2.4" fill="var(--ink)">
        <textPath href={`#${pathId}`}>{text}</textPath>
      </text>
      {outlined && <circle cx="66" cy="66" r="10" fill="var(--ink)" />}
    </svg>
  );
}
