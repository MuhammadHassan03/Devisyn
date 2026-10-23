"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { site, usd } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cx } from "@/lib/cx";
import { useSelectFromLinks } from "@/lib/selectBus";
import styles from "./Industries.module.css";

export function Industries() {
  const { industries, pricing } = site;
  const items = industries.items;
  const ids = items.map((item) => item.id);
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const list = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  useSelectFromLinks("industry", ids, (id) => setActive(ids.indexOf(id)));

  const measure = useCallback(() => {
    const tab = tabs.current[active];
    if (tab) setIndicator({ x: tab.offsetLeft, y: tab.offsetTop, w: tab.offsetWidth, h: tab.offsetHeight });
  }, [active]);

  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    const observer = new ResizeObserver(measure);
    if (list.current) observer.observe(list.current);
    return () => observer.disconnect();
  }, [measure]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    const jump = { Home: 0, End: items.length - 1 }[event.key];
    if (step === undefined && jump === undefined) return;
    event.preventDefault();
    const next = jump ?? (active + (step as number) + items.length) % items.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <Section id="industries" tone="peach">
      <SectionHeading
        eyebrow={industries.eyebrow}
        start={industries.headlineStart}
        accent={industries.accent}
        className={styles.heading}
      />

      <div ref={list} className={styles.tabs} role="tablist" aria-label={industries.eyebrow} onKeyDown={onKeyDown}>
        {indicator && (
          <span
            className={styles.indicator}
            aria-hidden="true"
            style={{ width: indicator.w, height: indicator.h, transform: `translate(${indicator.x}px, ${indicator.y}px)` }}
          />
        )}
        {items.map((item, i) => (
          <button
            key={item.id}
            id={item.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            className={cx(styles.tab, active === i && styles.tabActive)}
            aria-selected={active === i}
            aria-controls={`${item.id}-panel`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className={styles.panels}>
        {items.map((item, i) => {
          const plan = pricing.plans.find((p) => p.name === item.plan);
          return (
            <div
              key={item.id}
              id={`${item.id}-panel`}
              role="tabpanel"
              aria-labelledby={item.id}
              className={cx(styles.panel, active === i && styles.panelActive)}
              inert={active !== i}
            >
              <p className={styles.audience}>{item.audience}</p>
              <h3 className={styles.headline}>{item.headline}</h3>
              <ul className={styles.grid}>
                {item.cards.map((card) => (
                  <li key={card.title} className={styles.cell}>
                    <Card tone={card.tone} lift className={styles.card}>
                      <p className={cx(styles.big, card.tone === "dark" && styles.bigDark)}>{card.big}</p>
                      <h4 className={styles.cardTitle}>{card.title}</h4>
                      <p className={card.tone === "dark" ? styles.textDark : styles.text}>{card.text}</p>
                    </Card>
                  </li>
                ))}
              </ul>
              <div className={styles.footer}>
                {plan && (
                  <p className={styles.plan}>
                    <span className={styles.planLabel}>{industries.recommendedLabel}</span>
                    <span className={styles.planName}>
                      {plan.name} <span className={styles.planPrice}>{usd(plan.priceMonthly)}/mo</span>
                    </span>
                  </p>
                )}
                <Button href="#contact" size="lg">
                  {item.cta}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
