"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { buildDemoScript, site, type ScenarioId } from "@/content/site";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { Button } from "@/components/ui/Button";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { Reveal } from "@/components/ui/Reveal";
import { cx } from "@/lib/cx";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { formatElapsed, typedText, useDemoRun } from "@/lib/useDemoRun";
import { DemoPhone } from "./DemoPhone";
import styles from "./LiveDemo.module.css";

const KIND_ICON = { call: "☎", transcript: "☎", lead: "✉", text: "✉", slot: "✓" } as const;

export function LiveDemoStage() {
  const { demo, industries } = site;
  const [industry, setIndustry] = useState(industries.items[1].id);
  const [scenario, setScenario] = useState<ScenarioId>("after-hours");
  const script = useMemo(() => buildDemoScript(industry, scenario), [industry, scenario]);
  const { status, elapsed, timeline, play } = useDemoRun(script);
  const reduced = useReducedMotion();
  const list = useRef<HTMLOListElement>(null);

  const visible = timeline.filter((t) => t.start <= elapsed);
  // a transcript line joins the (screen-reader announced) timeline once it has been fully typed
  const listed = visible.filter((t) => t.step.kind !== "transcript" || elapsed >= t.end);

  useEffect(() => {
    list.current?.scrollTo({ top: list.current.scrollHeight });
  }, [listed.length]);

  const trigger = timeline.find((t) => t.step.trigger);
  const reply = timeline.find((t) => t.step.reply);
  const replySeconds = trigger && reply ? Math.round((reply.start - trigger.start) / 1000) : 0;
  const lastSlot = [...timeline].reverse().find((t) => t.step.slot)?.step.slot;

  return (
    <>
      <div className={styles.controls}>
        <ChipGroup
          legend={demo.industryLabel}
          value={industry}
          onChange={setIndustry}
          options={industries.items.map((item) => ({ value: item.id, label: item.name }))}
        />
        <ChipGroup
          legend={demo.scenarioLabel}
          value={scenario}
          onChange={setScenario}
          options={demo.scenarios.map((s) => ({ value: s.id, label: s.label }))}
        />
        <Button
          size="lg"
          className={styles.play}
          onClick={play}
          disabled={status === "running"}
          data-cursor="Play"
          aria-label={status === "idle" ? demo.play : status === "running" ? demo.playing : demo.replay}
        >
          <span aria-hidden="true">{status === "running" ? "●" : status === "done" ? "↻" : "▶"}</span>{" "}
          {status === "idle" ? demo.play : status === "running" ? demo.playing : demo.replay}
        </Button>
      </div>

      <Reveal className={styles.stage}>
        <DemoPhone script={script} timeline={timeline} elapsed={elapsed} status={status} instantText={reduced} />

        <div className={styles.side}>
          <h3 className={styles.sideTitle}>{demo.timelineTitle}</h3>
          <ol ref={list} className={styles.timeline} aria-live="polite" aria-relevant="additions">
            {listed.length === 0 && <li className={styles.empty}>{demo.timelineEmpty}</li>}
            {listed.map((t) => (
              <li key={t.start} className={cx("anim-pop", styles.entry)}>
                <span className={cx(styles.icon, t.step.kind === "slot" && styles.iconBooked)} aria-hidden="true">
                  {KIND_ICON[t.step.kind]}
                </span>
                <div className={styles.entryBody}>
                  <p className={styles.entryLabel}>
                    {t.step.label}
                    <span className={styles.stamp}>
                      {formatElapsed(t.start)} · {t.step.clock}
                    </span>
                  </p>
                  <p className={styles.entryText}>{typedText(t, elapsed, true)}</p>
                </div>
              </li>
            ))}
          </ol>

          {status === "done" && lastSlot && (
            <div className={cx("anim-pop", styles.summary)}>
              <p className={styles.summaryLine}>
                <span>
                  <b>{script.summaryLabel === "booked" ? demo.summary.booked : demo.summary.rebooked}:</b> {lastSlot.day} {lastSlot.time}
                </span>
                <span>
                  <b>{demo.summary.reply}:</b> {replySeconds} seconds
                </span>
                <span>
                  <b>{demo.summary.staff}:</b> {demo.summary.staffValue}
                </span>
              </p>
              <div className={styles.summaryActions}>
                <Button href={demo.cta.href} variant="light" size="lg">
                  {demo.cta.label}
                </Button>
                <BookCallButton />
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </>
  );
}
