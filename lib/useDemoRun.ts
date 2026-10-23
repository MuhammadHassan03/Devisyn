"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { DemoScript, DemoStep } from "@/content/site";

export const WORD_MS = 130;
/** pause after the last step before the summary card appears */
const SETTLE_MS = 900;
/** state updates per second while running */
const TICK_MS = 40;

export interface TimedStep {
  step: DemoStep;
  start: number;
  end: number;
}

/** Turns relative `after` delays into absolute start/end times in ms. */
export function schedule(steps: DemoStep[]): TimedStep[] {
  let t = 0;
  return steps.map((step) => {
    const start = t + step.after;
    const end = start + (step.kind === "transcript" ? step.text.split(" ").length * WORD_MS : 0);
    t = end;
    return { step, start, end };
  });
}

/** The words of a transcript line that have been typed so far. */
export function typedText(timed: TimedStep, elapsed: number, instant: boolean): string {
  const { step, start } = timed;
  if (step.kind !== "transcript" || instant) return step.text;
  const words = step.text.split(" ");
  const count = Math.min(words.length, Math.max(0, Math.floor((elapsed - start) / WORD_MS) + 1));
  return words.slice(0, count).join(" ");
}

export function formatElapsed(ms: number): string {
  const total = Math.floor(ms / 1000);
  return `+${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

export type RunStatus = "idle" | "running" | "done";

/** Real-time clock for a scripted demo. Restarts cleanly and resets whenever the script changes. */
export function useDemoRun(script: DemoScript) {
  const [status, setStatus] = useState<RunStatus>("idle");
  const [elapsed, setElapsed] = useState(0);
  const timeline = useMemo(() => schedule(script.steps), [script]);
  const frame = useRef(0);

  const stop = useCallback(() => cancelAnimationFrame(frame.current), []);

  const reset = useCallback(() => {
    stop();
    setStatus("idle");
    setElapsed(0);
  }, [stop]);

  const play = useCallback(() => {
    stop();
    const total = timeline[timeline.length - 1].end + SETTLE_MS;
    const startedAt = performance.now();
    let lastRender = 0;
    setStatus("running");
    setElapsed(0);

    const tick = (now: number) => {
      const ms = now - startedAt;
      if (ms >= total) {
        setElapsed(total);
        setStatus("done");
        return;
      }
      if (now - lastRender >= TICK_MS) {
        lastRender = now;
        setElapsed(ms);
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  }, [stop, timeline]);

  useEffect(() => {
    reset();
    return stop;
  }, [script, reset, stop]);

  return { status, elapsed, timeline, play, reset };
}
