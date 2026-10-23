"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useReveal, type RevealMode } from "@/lib/useReveal";

interface Props {
  /** self: the element itself. children: each direct child, staggered. words: each [data-word], staggered. */
  mode?: RevealMode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export function Reveal({ mode = "self", as: Tag = "div", delay, className, style, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, { mode, delay });

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
