"use client";

import { useId, useState } from "react";
import { cx } from "@/lib/cx";
import styles from "./Accordion.module.css";

interface Item {
  question: string;
  answer: string;
}

interface Props {
  items: Item[];
  defaultOpen?: number;
}

/**
 * Single-open accordion. Every answer stays in the HTML (hidden, not removed)
 * so crawlers and AI engines can read it.
 */
export function Accordion({ items, defaultOpen = 0 }: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const base = useId();

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-panel-${i}`;
        return (
          <div key={item.question} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.question}</span>
                <span className={cx(styles.icon, isOpen && styles.iconOpen)} aria-hidden="true">+</span>
              </button>
            </h3>
            <p id={panelId} className={cx(styles.answer, "anim-pop")} hidden={!isOpen}>
              {item.answer}
            </p>
          </div>
        );
      })}
    </div>
  );
}
