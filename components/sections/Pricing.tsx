"use client";

import { useState } from "react";
import { site, usd } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CheckList } from "@/components/ui/CheckList";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Toggle } from "@/components/ui/Toggle";
import { cx } from "@/lib/cx";
import styles from "./Pricing.module.css";

type Billing = "monthly" | "yearly";

const BUTTON_VARIANT = { white: "outline", dark: "light", lilac: "secondary" } as const;

export function Pricing() {
  const { pricing } = site;
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <Section id="pricing">
      <div className={styles.head}>
        <SectionHeading start={pricing.headlineStart} accent={pricing.accent} />
        <Toggle<Billing>
          label="Billing period"
          value={billing}
          onChange={setBilling}
          options={[
            { value: "monthly", label: pricing.monthly },
            { value: "yearly", label: pricing.yearly },
          ]}
        />
      </div>

      <Reveal as="ul" mode="children" className={styles.grid}>
        {pricing.plans.map((plan) => {
          const dark = plan.tone === "dark";
          return (
            <li key={plan.name} className={styles.cell}>
              <Card tone={plan.tone} lift className={cx(styles.card, plan.badge && styles.featured)}>
                {plan.badge && (
                  <Pill tone="peach" mono className={cx("anim-wiggle", styles.badge)}>
                    {plan.badge}
                  </Pill>
                )}
                <h3 className={styles.name}>{plan.name}</h3>
                <div>
                  <span className={styles.price}>{usd(billing === "yearly" ? plan.priceYearly : plan.priceMonthly)}</span>
                  <span className={dark ? styles.perDark : styles.per}> {pricing.perMonth}</span>
                  <p className={cx(styles.billing, dark && styles.billingDark)}>
                    {billing === "yearly" ? pricing.billedYearly : pricing.billedMonthly}
                  </p>
                </div>
                <p className={dark ? styles.blurbDark : styles.blurb}>{plan.blurb}</p>
                <CheckList className={styles.features} items={plan.features} />
                <Button href="#contact" variant={BUTTON_VARIANT[plan.tone]} block className={styles.cta}>
                  {plan.cta}
                </Button>
              </Card>
            </li>
          );
        })}
      </Reveal>

      <p className={styles.footnote}>{pricing.footnote}</p>
    </Section>
  );
}
