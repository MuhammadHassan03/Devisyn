"use client";

import { useEffect, type RefObject } from "react";
import { motion, prefersReducedMotion } from "./motion";
import { getMotion } from "./motionRuntime";

export type RevealMode = "self" | "children" | "words";

interface Options {
  mode?: RevealMode;
  delay?: number;
}

/** if the animation libraries have not arrived by now, show the content anyway */
const FAILSAFE_MS = 8000;
/** an element whose top is above this fraction of the viewport is already visible and is left alone */
const ALREADY_VISIBLE = 0.92;

interface Job {
  root: HTMLElement;
  start: () => void;
}

/**
 * Every reveal on the page measures its position in one batch (all reads, then all writes),
 * so mounting dozens of them costs a single layout instead of one each.
 */
let jobs: Job[] = [];
let frame = 0;

function flush() {
  frame = 0;
  const batch = jobs;
  jobs = [];
  const limit = window.innerHeight * ALREADY_VISIBLE;
  const below = batch.filter((job) => job.root.getBoundingClientRect().top >= limit);
  below.forEach((job) => job.start());
}

function enqueue(job: Job) {
  jobs.push(job);
  if (!frame) frame = requestAnimationFrame(flush);
  return () => {
    jobs = jobs.filter((j) => j !== job);
  };
}

/**
 * Fade-and-rise on scroll. Content is visible in the server HTML; only elements that start
 * below the fold are hidden (by a data attribute, after hydration) and then revealed.
 * Only transform and opacity are animated.
 */
export function useReveal<T extends HTMLElement>(ref: RefObject<T | null>, { mode = "self", delay = 0 }: Options = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    let cancelled = false;
    let kill = () => {};
    let failsafe = 0;
    let targets: Element[] = [];

    // targets may carry their own CSS transitions (cards lift on hover); keep those out of the tween
    const settle = () => targets.forEach((t) => (t as HTMLElement).style.removeProperty("transition"));
    const show = () => {
      targets.forEach((t) => t.removeAttribute("data-reveal"));
      settle();
    };

    const start = () => {
      targets =
        mode === "children" ? [...root.children] : mode === "words" ? [...root.querySelectorAll("[data-word]")] : [root];
      if (!targets.length) return;
      targets.forEach((t) => {
        t.setAttribute("data-reveal", mode === "words" ? "word" : "item");
        (t as HTMLElement).style.transition = "none";
      });
      failsafe = window.setTimeout(show, FAILSAFE_MS);

      getMotion().then((rt) => {
        window.clearTimeout(failsafe);
        if (cancelled) return;
        if (!rt) return show();

        const from = mode === "words" ? { yPercent: 110 } : { opacity: 0, y: motion.distance };
        const to = mode === "words" ? { yPercent: 0 } : { opacity: 1, y: 0 };
        const tween = rt.gsap.fromTo(targets, from, {
          ...to,
          duration: mode === "words" ? motion.duration.slow : motion.duration.base,
          stagger: motion.stagger,
          delay,
          clearProps: "transform,opacity",
          onComplete: settle,
          scrollTrigger: { trigger: root, start: motion.revealStart, once: true },
        });
        // the inline "from" state now holds the hidden pose
        targets.forEach((t) => t.removeAttribute("data-reveal"));
        kill = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    };

    const dequeue = enqueue({ root, start });
    return () => {
      cancelled = true;
      dequeue();
      window.clearTimeout(failsafe);
      kill();
      show();
    };
  }, [ref, mode, delay]);
}
