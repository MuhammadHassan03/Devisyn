"use client";

import { useEffect, useRef, useState } from "react";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";
import styles from "./Cursor.module.css";

const INTERACTIVE = "a, button, summary, select, label, [role='button'], [data-cursor]";
const TEXT_FIELD = "input:not([type='range']):not([type='radio']):not([type='checkbox']), textarea";
const RING_LERP = 0.18;
const DOT_LERP = 0.7;
const MAGNET_RADIUS = 48;
const MAGNET_PULL = 0.3;

/**
 * Dot plus trailing ring. It is an overlay: the native cursor is never hidden and nothing
 * here captures pointer events. Off on touch devices and with reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [state, setState] = useState<"idle" | "link" | "labelled" | "text">("idle");
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setEnabled(finePointer.matches && !reduced.matches);
    sync();
    finePointer.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    return () => {
      finePointer.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const pointer = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    let magnet: HTMLElement | null = null;
    let frame = 0;

    const releaseMagnet = () => {
      if (magnet) magnet.style.translate = "";
      magnet = null;
    };

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      const target = event.target instanceof Element ? event.target : null;
      const interactive = target?.closest<HTMLElement>(INTERACTIVE);
      if (target?.closest(TEXT_FIELD)) setState("text");
      else if (interactive?.dataset.cursor) {
        setLabel(interactive.dataset.cursor);
        setState("labelled");
      } else setState(interactive ? "link" : "idle");

      const near = [...document.querySelectorAll<HTMLElement>("[data-magnetic]")].find((el) => {
        const r = el.getBoundingClientRect();
        return (
          event.clientX > r.left - MAGNET_RADIUS && event.clientX < r.right + MAGNET_RADIUS &&
          event.clientY > r.top - MAGNET_RADIUS && event.clientY < r.bottom + MAGNET_RADIUS
        );
      });
      if (near !== magnet) releaseMagnet();
      if (near) {
        magnet = near;
        const r = near.getBoundingClientRect();
        const dx = (event.clientX - (r.left + r.width / 2)) * MAGNET_PULL;
        const dy = (event.clientY - (r.top + r.height / 2)) * MAGNET_PULL;
        near.style.translate = `${dx}px ${dy}px`;
      }
    };

    const tick = () => {
      ringPos.x += (pointer.x - ringPos.x) * RING_LERP;
      ringPos.y += (pointer.y - ringPos.y) * RING_LERP;
      dotPos.x += (pointer.x - dotPos.x) * DOT_LERP;
      dotPos.y += (pointer.y - dotPos.y) * DOT_LERP;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      if (dot.current) dot.current.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      pointer.x = pointer.y = -100;
      releaseMagnet();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      releaseMagnet();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true">
      <div ref={ring} className={styles.anchor}>
        <div className={`${styles.ring} ${styles[state]}`}>
          <span className={styles.caption}>{state === "labelled" ? label : ""}</span>
        </div>
      </div>
      <div ref={dot} className={styles.anchor}>
        <div className={`${styles.dot} ${state === "text" ? styles.dotHidden : ""}`} />
      </div>
    </div>
  );
}
