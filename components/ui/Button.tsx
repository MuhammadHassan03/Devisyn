import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "outline" | "light";
type Size = "sm" | "md" | "lg";

interface Props {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
}

type ButtonProps = Props & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof Props>;

export function Button({ variant = "primary", size = "md", block, href, target, rel, className, children, ...rest }: ButtonProps) {
  const classes = cx(styles.button, styles[variant], styles[size], block && styles.block, className);

  const magnetic = variant === "primary" && size !== "md" ? { "data-magnetic": "" } : {};

  if (href) {
    return (
      <a className={classes} href={href} target={target} rel={rel} {...(rest as object)} {...magnetic}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} type="button" {...rest} {...magnetic}>
      {children}
    </button>
  );
}
