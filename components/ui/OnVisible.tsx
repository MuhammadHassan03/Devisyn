"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Props {
  /** reserves the space so nothing shifts when the content arrives */
  minHeight: string;
  children: ReactNode;
}

const MARGIN = "800px 0px";

/** Renders its children once it is within 800px of the viewport. */
export function OnVisible({ minHeight, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setNear(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: MARGIN },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: near ? undefined : minHeight }}>
      {near ? children : null}
    </div>
  );
}
