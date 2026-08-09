import type { ReactNode } from "react";

type CardVariant = "small" | "standard" | "featured" | "glass" | "highlighted";

type CardFoundationProps = {
  variant: CardVariant;
  children: ReactNode;
  className?: string;
};

export function CardFoundation({ variant, children, className }: CardFoundationProps) {
  const classes = ["card-foundation", `card-${variant}`, className].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}
