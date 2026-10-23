"use client";

import { useRef, type ReactNode } from "react";
import { useParallax } from "@/lib/useParallax";

interface Props {
  /** px travelled across the section, negative moves up */
  distance: number;
  className?: string;
  children: ReactNode;
}

/** Wrapper that carries the parallax transform so the child can keep its own float/entrance animation. */
export function Parallax({ distance, className, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(ref, distance);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
