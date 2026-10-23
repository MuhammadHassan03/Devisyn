"use client";

import { useRef, useState } from "react";
import styles from "./Footer.module.css";

const COPIED_MS = 2000;

interface Props {
  email: string;
  label: string;
  copiedLabel: string;
}

export function CopyEmail({ email, label, copiedLabel }: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
  };

  return (
    <>
      <button type="button" className={styles.copy} onClick={copy} aria-label={label}>
        {copied ? copiedLabel : "Copy"}
      </button>
      <span className="sr-only" role="status">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
