"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { cx } from "@/lib/cx";
import styles from "./MobileMenu.module.css";

interface Item {
  href: string;
  title: string;
  description?: string;
}

interface Props {
  id: string;
  open: boolean;
  onClose: () => void;
  serviceItems: Item[];
  industryItems: Item[];
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
}

const FOCUSABLE = "a[href], button:not([disabled])";

/** Full-screen menu for small screens. Traps focus while open and closes on Escape. */
export function MobileMenu({ id, open, onClose, serviceItems, industryItems, links, cta }: Props) {
  const { nav } = site;
  const [group, setGroup] = useState<"services" | "industries" | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setGroup(null);
      return;
    }
    root.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
  }, [open]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [...(root.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].filter((el) => el.offsetParent !== null);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const disclosure = (key: "services" | "industries", label: string, items: Item[]) => (
    <li className={styles.group}>
      <button
        type="button"
        className={styles.groupButton}
        aria-expanded={group === key}
        aria-controls={`${id}-${key}`}
        onClick={() => setGroup(group === key ? null : key)}
      >
        {label}
        <span className={cx(styles.chevron, group === key && styles.chevronOpen)} aria-hidden="true">+</span>
      </button>
      <ul id={`${id}-${key}`} className={cx(styles.sub, group === key && styles.subOpen)} hidden={group !== key}>
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} onClick={onClose}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );

  return (
    <div
      ref={root}
      id={id}
      className={cx(styles.menu, open && styles.open)}
      role="dialog"
      aria-modal="true"
      aria-label={nav.menuOpen}
      inert={!open}
      onKeyDown={onKeyDown}
    >
      <ul className={styles.list}>
        {disclosure("services", nav.services.label, serviceItems)}
        {disclosure("industries", nav.industries.label, industryItems)}
        {links.map((link) => (
          <li key={link.href}>
            <a className={styles.link} href={link.href} onClick={onClose}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <Button href={cta.href} size="lg" block onClick={onClose}>
        {cta.label}
      </Button>
    </div>
  );
}
