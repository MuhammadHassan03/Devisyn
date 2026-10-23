"use client";

import dynamic from "next/dynamic";
import { OnVisible } from "@/components/ui/OnVisible";

const Body = dynamic(() => import("./CalculatorBody").then((m) => m.CalculatorBody), { ssr: false });

/** The calculator only loads and hydrates when it is about to scroll into view. */
export function CalculatorLazy() {
  return (
    <OnVisible minHeight="var(--calculator-min-height)">
      <Body />
    </OnVisible>
  );
}
