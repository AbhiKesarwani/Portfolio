import type { ButtonHTMLAttributes, ReactNode } from "react";

type BaseButtonProps = {
  children: ReactNode;
};

type ButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

type AnchorProps = BaseButtonProps & {
  href: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

const join = (base: string, extra?: string) => (extra ? `${base} ${extra}` : base);

export function PrimaryButton({ children, className, ...props }: ButtonProps) {
  return (
    <button type="button" className={join("btn btn-primary", className)} {...props}>
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className, ...props }: ButtonProps) {
  return (
    <button type="button" className={join("btn btn-secondary", className)} {...props}>
      {children}
    </button>
  );
}

export function PrimaryLinkButton({ children, href, target, rel, ariaLabel }: AnchorProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className="btn btn-primary btn-link"
    >
      {children}
    </a>
  );
}

export function SecondaryLinkButton({ children, href, target, rel, ariaLabel }: AnchorProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      className="btn btn-secondary btn-link"
    >
      {children}
    </a>
  );
}
