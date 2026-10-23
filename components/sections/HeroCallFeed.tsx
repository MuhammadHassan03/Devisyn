"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { cx } from "@/lib/cx";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./HeroCallFeed.module.css";

const STEP_MS = 1700;
const VISIBLE = 3;

/** Looping example of a call being caught, booked and followed up. */
export function HeroCallFeed() {
  const { feed, feedTitle } = site.hero;
  const reduced = useReducedMotion();
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (reduced) {
      setStep(feed.length);
      return;
    }
    setStep(1);
    const id = setInterval(() => setStep((s) => (s >= feed.length ? 1 : s + 1)), STEP_MS);
    return () => clearInterval(id);
  }, [reduced, feed.length]);

  const visible = feed.slice(Math.max(0, step - VISIBLE), step);
  const firstIndex = Math.max(0, step - VISIBLE);

  return (
    <div className={cx("anim-float", styles.card)}>
      <div className={styles.top}>
        <span className={styles.live}>
          <span className={cx("anim-blink", styles.liveDot)} aria-hidden="true" />
          {feedTitle}
        </span>
        <span className={styles.clock}>{feed[step - 1].clock}</span>
      </div>

      <ul className={styles.events}>
        {visible.map((event, i) => (
          <li key={firstIndex + i} className={cx("anim-pop", styles.event, styles[event.tone])}>
            <span className={styles.icon} aria-hidden="true">{event.icon}</span>
            <span className={styles.body}>
              <span className={styles.label}>{event.label}</span>
              <span className={styles.text}>{event.text}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.progress} aria-hidden="true">
        {feed.map((event, i) => (
          <span key={event.label} className={cx(styles.segment, i < step && styles.done)} />
        ))}
      </div>
    </div>
  );
}
