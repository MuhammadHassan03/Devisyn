import { motion, prefersReducedMotion } from "./motion";

type Runtime = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  lenis: import("lenis").default;
};

let runtime: Promise<Runtime | null> | null = null;

/** start the libraries even without interaction after this long */
const FALLBACK_START_MS = 5000;
const MAX_RATE_BOOST = 1.2;
const VELOCITY_TO_RATE = 0.04;
const RATE_LERP = 0.08;

/** Marquees run a little faster while the page is scrolling. */
function linkMarqueesToScroll(lenis: import("lenis").default, gsap: Runtime["gsap"]) {
  const animations = [...document.querySelectorAll<HTMLElement>(".anim-marquee, .anim-marquee-reverse")]
    .flatMap((el) => el.getAnimations());
  let target = 1;
  let rate = 1;

  lenis.on("scroll", ({ velocity }: { velocity: number }) => {
    target = 1 + Math.min(Math.abs(velocity) * VELOCITY_TO_RATE, MAX_RATE_BOOST);
  });
  gsap.ticker.add(() => {
    target += (1 - target) * 0.04;
    rate += (target - rate) * RATE_LERP;
    for (const animation of animations) animation.playbackRate = rate;
  });
}

async function start(): Promise<Runtime | null> {
  if (prefersReducedMotion()) return null;

  // the animation libraries are ~45 KB gzipped and only matter once someone engages with the page,
  // so they load on the first interaction (or after a few seconds) and never compete with first paint
  await new Promise<void>((resolve) => {
    const events = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"];
    const go = () => {
      events.forEach((name) => window.removeEventListener(name, go));
      window.clearTimeout(timer);
      resolve();
    };
    const timer = window.setTimeout(go, FALLBACK_START_MS);
    events.forEach((name) => window.addEventListener(name, go, { once: true, passive: true }));
  });

  const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("lenis"),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: motion.ease, duration: motion.duration.base });

  const lenis = new Lenis({ anchors: true, lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  linkMarqueesToScroll(lenis, gsap);

  return { gsap, ScrollTrigger, lenis };
}

/** Resolves once GSAP, ScrollTrigger and Lenis are running, or null when motion is off. */
export function getMotion(): Promise<Runtime | null> {
  runtime ??= start().catch(() => null);
  return runtime;
}

/** Pauses or resumes page scrolling (native and smooth) while an overlay is open. */
export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  getMotion().then((rt) => (locked ? rt?.lenis.stop() : rt?.lenis.start()));
}
