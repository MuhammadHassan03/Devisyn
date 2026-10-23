"use client";

import { useState, type CSSProperties } from "react";
import { site, usd } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ChipGroup } from "@/components/ui/ChipGroup";
import { Reveal } from "@/components/ui/Reveal";
import { useCountUp } from "@/lib/useCountUp";
import styles from "./Calculator.module.css";

const WEEKS_PER_MONTH = 52 / 12;

interface SliderProps {
  id: string;
  label: string;
  display: string;
  min: number;
  max: number;
  step: number;
  value: number;
  hint?: string;
  onChange: (value: number) => void;
}

function Slider({ id, label, display, min, max, step, value, hint, onChange }: SliderProps) {
  return (
    <div className={styles.slider}>
      <label className={styles.sliderLabel} htmlFor={id}>
        <span>{label}</span>
        <output htmlFor={id} className={styles.sliderValue}>{display}</output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        data-cursor="Drag"
        style={{ "--fill": `${((value - min) / (max - min)) * 100}%` } as CSSProperties}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
}

export function CalculatorBody() {
  const { calculator, industries, pricing, stats } = site;
  const [industry, setIndustry] = useState(industries.items[1].id);
  const [calls, setCalls] = useState<number>(calculator.defaults.calls);
  const [missed, setMissed] = useState<number>(calculator.defaults.missed);
  const [book, setBook] = useState<number>(calculator.defaults.book);
  const [value, setValue] = useState<number>(calculator.values[industries.items[1].id]);

  const customers = calls * WEEKS_PER_MONTH * (missed / 100) * (book / 100);
  const perMonth = customers * value;
  const growth = pricing.plans.find((p) => p.name === calculator.breakEvenPlan)!;
  const breakEven = Math.max(1, Math.ceil(growth.priceMonthly / Math.max(value, 1)));

  const customersShown = useCountUp(customers);
  const monthShown = useCountUp(perMonth);
  const yearShown = useCountUp(perMonth * 12);

  const pick = (id: string) => {
    setIndustry(id);
    setValue(calculator.values[id]);
  };

  return (
    <>
      <Reveal className={styles.layout}>
        <Card className={styles.inputs}>
          <ChipGroup
            legend={calculator.industryLabel}
            value={industry}
            onChange={pick}
            options={industries.items.map((item) => ({ value: item.id, label: item.name }))}
          />
          <Slider id="calc-calls" label={calculator.callsLabel} display={String(calls)} min={10} max={400} step={5} value={calls} onChange={setCalls} />
          <Slider
            id="calc-missed"
            label={calculator.missedLabel}
            display={`${missed}%`}
            min={0}
            max={100}
            step={1}
            value={missed}
            hint={`${calculator.sourceNote} ${stats.source}`}
            onChange={setMissed}
          />
          <Slider id="calc-book" label={calculator.bookLabel} display={`${book}%`} min={0} max={100} step={1} value={book} onChange={setBook} />
          <Slider
            id="calc-value"
            label={calculator.valueLabel}
            display={usd(value)}
            min={50}
            max={20000}
            step={50}
            value={value}
            hint={industry === "real-estate" ? calculator.realEstateValueHint : undefined}
            onChange={setValue}
          />
        </Card>

        <div className={styles.results}>
          <Card tone="white" className={styles.result}>
            <p className={styles.resultLabel}>{calculator.outputs.customers}</p>
            <p className={styles.resultValue}>{Math.round(customersShown).toLocaleString("en-US")}</p>
          </Card>
          <Card tone="peach" className={styles.result}>
            <p className={styles.resultLabel}>{calculator.outputs.month}</p>
            <p className={styles.resultValue}>{usd(Math.round(monthShown))}</p>
          </Card>
          <Card tone="mint" className={styles.result}>
            <p className={styles.resultLabel}>{calculator.outputs.year}</p>
            <p className={styles.resultValue}>{usd(Math.round(yearShown))}</p>
          </Card>
          <Card tone="dark" className={styles.payback}>
            <p className={styles.paybackText} aria-live="polite">
              {calculator.breakEven.lead} {growth.name} ({usd(growth.priceMonthly)}/mo) {calculator.breakEven.middle}{" "}
              <b>
                {breakEven} {breakEven === 1 ? calculator.breakEven.one : calculator.breakEven.many}
              </b>
              .
            </p>
            <Button href={calculator.cta.href} variant="light" size="lg">
              {calculator.cta.label}
            </Button>
          </Card>
        </div>
      </Reveal>

      <p className={styles.formula}>{calculator.formula}</p>
    </>
  );
}
