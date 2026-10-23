"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { NavDropdown } from "@/components/ui/NavDropdown";
import { cx } from "@/lib/cx";
import { lockScroll } from "@/lib/motionRuntime";
import { MobileMenu } from "./MobileMenu";
import styles from "./Header.module.css";

const SOLID_AFTER_PX = 8;
const HIDE_AFTER_PX = 160;
const SCROLL_DEADZONE_PX = 6;

interface Props {
  /** "/" on pages other than the home page, so anchors become /#services */
  basePath?: string;
}

export function Header({ basePath = "" }: Props) {
  const { nav, name, services, industries } = site;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > SOLID_AFTER_PX);
      if (Math.abs(y - lastY) > SCROLL_DEADZONE_PX) {
        setHidden(y > lastY && y > HIDE_AFTER_PX);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    lockScroll(menuOpen);
    return () => lockScroll(false);
  }, [menuOpen]);

  const href = (hash: string) => `${basePath}${hash}`;
  const serviceItems = services.map((s) => ({ href: href(`#service-${s.n}`), title: s.name, description: s.short }));
  const industryItems = industries.items.map((i) => ({ href: href(`#${i.id}`), title: i.menuLabel }));

  return (
    <header
      ref={header}
      className={cx(styles.header, (scrolled || menuOpen) && styles.solid, hidden && !menuOpen && styles.hidden)}
      onFocusCapture={() => setHidden(false)}
    >
      <a className={styles.logo} href={basePath ? basePath : "#top"} aria-label={`${name} home`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo.svg" alt={name} width={154} height={40} />
      </a>

      <nav className={styles.nav} aria-label="Main">
        <NavDropdown label={nav.services.label} items={serviceItems} columns={2} />
        <NavDropdown label={nav.industries.label} items={industryItems} columns={2} />
        {nav.links.map((link) => (
          <a key={link.href} href={href(link.href)}>
            {link.label}
          </a>
        ))}
      </nav>

      <Button className={styles.cta} href={href(nav.cta.href)} size="sm">
        {nav.cta.label}
      </Button>

      <button
        ref={menuButton}
        type="button"
        className={styles.burger}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? nav.menuClose : nav.menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={cx(styles.bar, menuOpen && styles.barTop)} />
        <span className={cx(styles.bar, menuOpen && styles.barBottom)} />
      </button>

      <MobileMenu
        id="mobile-menu"
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          menuButton.current?.focus();
        }}
        serviceItems={serviceItems}
        industryItems={industryItems}
        links={nav.links.map((l) => ({ ...l, href: href(l.href) }))}
        cta={{ label: nav.cta.label, href: href(nav.cta.href) }}
      />
    </header>
  );
}
