import { cx } from "@/lib/cx";
import styles from "./ChatBubble.module.css";

interface Props {
  from: "us" | "them";
  children: string;
}

export function ChatBubble({ from, children }: Props) {
  return <div className={cx(styles.bubble, "anim-pop", from === "us" ? styles.us : styles.them)}>{children}</div>;
}
