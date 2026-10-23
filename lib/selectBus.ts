"use client";

import { useEffect } from "react";

/**
 * Links such as #service-03 or #dental-medical point at a tab that lives inside an explorer.
 * Clicking one (or loading the page with that hash) selects the tab; the browser then scrolls to it.
 */
type Kind = "service" | "industry";

const EVENT = "devisyn:select";
const SERVICE_HASH = /^#service-(\d{2})$/;

export function parseHash(hash: string, industryIds: string[]): { kind: Kind; id: string } | null {
  const service = SERVICE_HASH.exec(hash);
  if (service) return { kind: "service", id: service[1] };
  const id = hash.slice(1);
  return industryIds.includes(id) ? { kind: "industry", id } : null;
}

export function emitSelect(kind: Kind, id: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { kind, id } }));
}

/** Calls `onSelect` when a link or the URL hash targets this kind of tab. */
export function useSelectFromLinks(kind: Kind, valid: string[], onSelect: (id: string) => void) {
  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ kind: Kind; id: string }>).detail;
      if (detail.kind === kind && valid.includes(detail.id)) onSelect(detail.id);
    };
    window.addEventListener(EVENT, handler);

    const fromHash = parseHash(window.location.hash, kind === "industry" ? valid : []);
    if (fromHash?.kind === kind && valid.includes(fromHash.id)) onSelect(fromHash.id);

    return () => window.removeEventListener(EVENT, handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind, valid.join("|")]);
}
