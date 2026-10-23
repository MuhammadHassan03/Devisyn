"use client";

import { useEffect, useRef, useState } from "react";
import { easeOutExpo, motion, prefersReducedMotion } from "./motion";

/** Eases a displayed number toward `target` with the shared motion ease and slow duration. */
export function useCountUp(target: number): number {
  const [value, setValue] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (prefersReducedMotion()) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = from.current;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - startedAt) / (motion.duration.slow * 1000), 1);
      const next = start + (target - start) * easeOutExpo(t);
      from.current = next;
      setValue(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return value;
}
