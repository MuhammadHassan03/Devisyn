"use client";

import { useState } from "react";
import { servicePriceLabel, site } from "@/content/site";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { CheckList } from "@/components/ui/CheckList";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { cx } from "@/lib/cx";
import { useSelectFromLinks } from "@/lib/selectBus";
import styles from "./ServicesExplorer.module.css";

/**
 * Tab list on the left, detail panel on the right.
 * Every panel is in the HTML; only the active one is visible.
 */
export function ServicesExplorer() {
  const { services, servicesSection: copy } = site;
  const [active, setActive] = useState(0);
  const numbers = services.map((service) => service.n);
  useSelectFromLinks("service", numbers, (n) => setActive(numbers.indexOf(n)));

  return (
    <div className={styles.explorer}>
      <Reveal as="ul" mode="children" className={styles.tabs}>
        {services.map((service, i) => {
          const isActive = active === i;
          return (
            <li key={service.n} id={`service-${service.n}`}>
              <button
                type="button"
                className={cx(styles.tab, isActive && styles.tabActive)}
                aria-pressed={isActive}
                aria-controls={`service-${service.n}-panel`}
                onClick={() => setActive(i)}
              >
                <span className={styles.number}>{service.n}</span>
                <span className={styles.tabText}>
                  <span className={styles.name}>{service.name}</span>
                  <span className={styles.short}>{service.short}</span>
                </span>
                <span className={cx(styles.arrow, isActive && styles.arrowActive)} aria-hidden="true">→</span>
              </button>
            </li>
          );
        })}
      </Reveal>

      <div className={styles.panels}>
        {services.map((service, i) => (
          <article
            key={service.n}
            id={`service-${service.n}-panel`}
            className={cx("anim-pop", styles.panel, styles[service.tone])}
            hidden={active !== i}
          >
            <div className={styles.panelTop}>
              <Pill mono className={styles.serviceTag}>{copy.serviceLabel} {service.n}</Pill>
              <span className={styles.price}>{servicePriceLabel(service)}</span>
            </div>
            <h3 className={styles.headline}>{service.headline}</h3>
            <p className={styles.body}>{service.body}</p>

            <div className={styles.result}>
              <span className={styles.resultLabel}>{copy.resultLabel}</span>
              {service.result}
            </div>

            <CheckList className={styles.points} variant="draw" items={service.points} />

            <div className={styles.chat}>
              <p className={styles.chatLabel}>{copy.chatLabel}</p>
              <div className={styles.messages}>
                {service.chat.map((message) => (
                  <ChatBubble key={message.text} from={message.from}>
                    {message.text}
                  </ChatBubble>
                ))}
              </div>
            </div>

            <p className={styles.bestFor}>
              <b>{copy.bestForLabel}</b> {service.bestFor}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
