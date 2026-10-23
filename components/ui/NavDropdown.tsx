"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cx } from "@/lib/cx";
import styles from "./NavDropdown.module.css";

export interface DropdownItem {
  href: string;
  title: string;
  description?: string;
}

interface Props {
  label: string;
  items: DropdownItem[];
  columns?: 1 | 2;
}

const HOVER_CLOSE_MS = 140;

/**
 * Disclosure menu: opens on hover and on click, closes on Escape, outside click
 * and when focus leaves. Arrow keys move between links.
 */
export function NavDropdown({ label, items, columns = 1 }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const pinned = useRef(false);
  const closeTimer = useRef<number>(0);
  const panelId = useId();

  const close = (returnFocus = false) => {
    window.clearTimeout(closeTimer.current);
    pinned.current = false;
    setOpen(false);
    if (returnFocus) trigger.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) close();
    };
    const onEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") close(root.current?.contains(document.activeElement) ?? false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const links = () => [...(root.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      close(true);
      return;
    }
    const all = links();
    const index = all.indexOf(document.activeElement as HTMLAnchorElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      pinned.current = true;
      if (document.activeElement === trigger.current) requestAnimationFrame(() => links()[0]?.focus());
      else all[(index + 1) % all.length]?.focus();
    } else if (event.key === "ArrowUp" && index >= 0) {
      event.preventDefault();
      if (index === 0) trigger.current?.focus();
      else all[index - 1]?.focus();
    } else if (event.key === "Home" && index >= 0) {
      event.preventDefault();
      all[0]?.focus();
    } else if (event.key === "End" && index >= 0) {
      event.preventDefault();
      all[all.length - 1]?.focus();
    }
  };

  return (
    <div
      ref={root}
      className={styles.root}
      onKeyDown={onKeyDown}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        window.clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse" || pinned.current) return;
        closeTimer.current = window.setTimeout(() => setOpen(false), HOVER_CLOSE_MS);
      }}
      onBlur={(event) => {
        if (!root.current?.contains(event.relatedTarget as Node)) close();
      }}
    >
      <button
        ref={trigger}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (open && pinned.current) close();
          else {
            pinned.current = true;
            setOpen(true);
          }
        }}
      >
        {label}
        <span className={cx(styles.chevron, open && styles.chevronOpen)} aria-hidden="true">▾</span>
      </button>

      <div id={panelId} className={cx(styles.panel, open && styles.panelOpen)}>
        <ul className={cx(styles.list, columns === 2 && styles.twoColumns)}>
          {items.map((item) => (
            <li key={item.href}>
              <a className={styles.item} href={item.href} tabIndex={open ? 0 : -1} onClick={() => close()}>
                <span className={styles.itemTitle}>{item.title}</span>
                {item.description && <span className={styles.itemText}>{item.description}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
