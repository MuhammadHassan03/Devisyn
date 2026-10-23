import type { CSSProperties } from "react";

/**
 * The one motion system. Every JS tween, CSS transition and keyframe reads from here.
 * The tokens are also exposed as CSS custom properties (see `motionCssVars`, set on <html>).
 */
export const motion = {
  /** GSAP name and its cubic-bezier equivalent are the same curve (expo.out). */
  ease: "expo.out",
  easeCss: "cubic-bezier(0.16, 1, 0.3, 1)",
  duration: { fast: 0.3, base: 0.6, slow: 1 },
  stagger: 0.06,
  /** reveal travel in px */
  distance: 24,
  /** ambient loops (seconds); these are decoration, never used for UI feedback */
  loop: { blink: 1.1, wave: 1, ring: 2.4, wiggle: 3, float: 6, floatAlt: 7, travel: 7, spin: 18, marquee: 30, marqueeReverse: 36 },
  /** viewport position where scroll reveals start */
  revealStart: "top 88%",
} as const;

export const motionCssVars = {
  "--ease": motion.easeCss,
  "--dur-fast": `${motion.duration.fast}s`,
  "--dur-base": `${motion.duration.base}s`,
  "--dur-slow": `${motion.duration.slow}s`,
  "--stagger": `${motion.stagger}s`,
  "--reveal-y": `${motion.distance}px`,
  "--loop-blink": `${motion.loop.blink}s`,
  "--loop-wave": `${motion.loop.wave}s`,
  "--loop-ring": `${motion.loop.ring}s`,
  "--loop-wiggle": `${motion.loop.wiggle}s`,
  "--loop-float": `${motion.loop.float}s`,
  "--loop-float-alt": `${motion.loop.floatAlt}s`,
  "--loop-travel": `${motion.loop.travel}s`,
  "--loop-spin": `${motion.loop.spin}s`,
  "--loop-marquee": `${motion.loop.marquee}s`,
  "--loop-marquee-reverse": `${motion.loop.marqueeReverse}s`,
} as CSSProperties;

/** expo.out, for the few places that animate numbers outside GSAP. */
export const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Position in an entrance sequence: delay = n x stagger (see .anim-rise in animations.css). */
export const seq = (n: number) => ({ "--i": n }) as CSSProperties;
