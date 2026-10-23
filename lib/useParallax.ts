"use client";

import { useEffect, type RefObject } from "react";
import { prefersReducedMotion } from "./motion";
import { getMotion } from "./motionRuntime";

/** Moves the element `distance` px (negative = up) while its section scrolls past. */
export function useParallax<T extends HTMLElement>(ref: RefObject<T | null>, distance: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let cancelled = false;
    let kill = () => {};
    getMotion().then((rt) => {
      if (cancelled || !rt) return;
      const trigger = el.closest("section") ?? el;
      const tween = rt.gsap.to(el, {
        y: distance,
        ease: "none",
        scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
      });
      kill = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => {
      cancelled = true;
      kill();
    };
  }, [ref, distance]);
}
