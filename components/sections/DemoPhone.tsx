"use client";

import { useEffect, useRef } from "react";
import { site, type DemoScript, type DemoSlot } from "@/content/site";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { cx } from "@/lib/cx";
import { typedText, type RunStatus, type TimedStep } from "@/lib/useDemoRun";
import styles from "./DemoPhone.module.css";

interface Props {
  script: DemoScript;
  timeline: TimedStep[];
  elapsed: number;
  status: RunStatus;
  instantText: boolean;
}

const same = (a: DemoSlot | undefined, b: DemoSlot) => !!a && a.day === b.day && a.time === b.time;

/** Visual only. The same information is available as text in the timeline next to it. */
export function DemoPhone({ script, timeline, elapsed, status, instantText }: Props) {
  const { demo } = site;
  const body = useRef<HTMLDivElement>(null);
  const visible = timeline.filter((t) => t.start <= elapsed);
  const last = visible[visible.length - 1]?.step;
  const textStarted = visible.some((t) => t.step.kind === "text" || t.step.kind === "lead" || t.step.kind === "slot");
  const inCall = !!last && !textStarted;
  const answered = visible.some((t) => t.step.kind === "transcript");
  const clock = last?.clock ?? script.steps[0].clock;

  const slots = visible.filter((t) => t.step.slot);
  const booked = slots.length ? slots[slots.length - 1].step.slot : script.calendar.booked;
  const freed = slots.find((t) => t.step.moved)?.step.moved;
  const showCalendar = !!booked && (slots.length > 0 || textStarted);
  const thread = visible.filter((t) => t.step.kind === "text" || t.step.kind === "lead");

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [elapsed]);

  return (
    <div className={styles.phone} aria-hidden="true">
      <div className={styles.screen}>
        <div className={styles.status}>
          <span>{status === "idle" ? "9:38 PM" : clock}</span>
          <span className={styles.notch} />
          <svg width="22" height="12" viewBox="0 0 22 12"><rect x="0.75" y="0.75" width="18" height="10.5" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" /><rect x="2.5" y="2.5" width="12" height="7" rx="1.5" fill="currentColor" /><rect x="20" y="4" width="2" height="4" rx="1" fill="currentColor" /></svg>
        </div>

        {status === "idle" && (
          <div className={styles.idle}>
            <span className={styles.idleIcon}>☎</span>
            <p>{demo.idlePhone}</p>
          </div>
        )}

        {status !== "idle" && inCall && (
          <div className={styles.call}>
            <div className={cx(styles.avatar, !answered && "anim-ring")}>
              <span>?</span>
            </div>
            <p className={styles.callLabel}>{answered ? "On the line" : "Incoming call"}</p>
            <p className={styles.callSub}>{script.steps[0].text}</p>
            <div className={styles.captions} ref={body}>
              {visible
                .filter((t) => t.step.kind === "transcript")
                .map((t) => (
                  <div key={t.start} className={cx("anim-pop", styles.caption, t.step.speaker === "agent" && styles.captionAgent)}>
                    <span className={styles.who}>{t.step.speaker === "agent" ? "Assistant" : "Caller"}</span>
                    {typedText(t, elapsed, instantText)}
                  </div>
                ))}
            </div>
          </div>
        )}

        {status !== "idle" && !inCall && (
          <div className={styles.thread}>
            <p className={styles.threadTitle}>{script.business}</p>
            <div className={styles.messages} ref={body}>
              {thread.map((t) =>
                t.step.kind === "lead" ? (
                  <div key={t.start} className={cx("anim-pop", styles.lead)}>
                    <span className={styles.who}>{t.step.label}</span>
                    {t.step.text}
                  </div>
                ) : (
                  <ChatBubble key={t.start} from={t.step.from ?? "us"}>
                    {t.step.text}
                  </ChatBubble>
                ),
              )}
              {showCalendar && booked && (
                <div className={styles.calendar}>
                  <div className={styles.grid} style={{ gridTemplateColumns: `auto repeat(${script.calendar.days.length}, 1fr)` }}>
                    <span />
                    {script.calendar.days.map((day) => (
                      <span key={day} className={styles.day}>{day}</span>
                    ))}
                    {script.calendar.times.map((time) => (
                      <CalendarRow key={time} time={time} script={script} booked={booked} freed={freed} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <p className={styles.footer}>{demo.phoneFooter}</p>
      </div>
    </div>
  );
}

function CalendarRow({ time, script, booked, freed }: { time: string; script: DemoScript; booked: DemoSlot; freed?: DemoSlot }) {
  return (
    <>
      <span className={styles.time}>{time.replace(" AM", "a").replace(" PM", "p")}</span>
      {script.calendar.days.map((day) => {
        const slot = { day, time };
        const isBooked = same(booked, slot);
        const wasBooked = same(script.calendar.booked, slot) && !same(freed, slot);
        const busy = script.calendar.busy.some((b) => same(b, slot));
        return (
          <span
            key={day}
            className={cx(styles.cell, busy && styles.busy, (isBooked || wasBooked) && styles.booked, isBooked && "anim-pop")}
          >
            {isBooked || wasBooked ? "✓" : ""}
          </span>
        );
      })}
    </>
  );
}
