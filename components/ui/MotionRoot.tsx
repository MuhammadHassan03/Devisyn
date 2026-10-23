"use client";

import { useEffect } from "react";
import { site } from "@/content/site";
import { getMotion } from "@/lib/motionRuntime";
import { emitSelect, parseHash } from "@/lib/selectBus";
import { Cursor } from "./Cursor";

const INDUSTRY_IDS = site.industries.items.map((item) => item.id);

/**
 * App-level behaviour: starts smooth scroll and ScrollTrigger once the page is idle,
 * turns clicks on tab links (#service-03, #dental-medical) into selections, and mounts the cursor.
 */
export function MotionRoot() {
  useEffect(() => {
    getMotion();

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href*='#']");
      const hash = link?.hash;
      if (!hash) return;
      const target = parseHash(hash, INDUSTRY_IDS);
      if (target) emitSelect(target.kind, target.id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <Cursor />;
}
