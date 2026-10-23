"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./RotatingWord.module.css";

interface Props {
  words: string[];
  intervalMs?: number;
}

const TONES = ["green", "rust", "violet", "green"] as const;

export function RotatingWord({ words, intervalMs = 2200 }: Props) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs);
    return () => clearInterval(id);
  }, [reduced, words.length, intervalMs]);

  return (
    <span className={styles.window}>
      <span className={styles.list} style={{ transform: `translateY(-${reduced ? 0 : index}em)` }} aria-hidden="true">
        {words.map((word, i) => (
          <span key={word} className={`${styles.word} ${styles[TONES[i % TONES.length]]}`}>
            {word}
          </span>
        ))}
      </span>
    </span>
  );
}
