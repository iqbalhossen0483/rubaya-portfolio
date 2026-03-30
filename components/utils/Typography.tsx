import React from "react";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  component?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export default function Typography({
  variant = "body1",
  component,
  children,
  className = "",
  ...props
}: TypographyProps) {
  // Determine the tag to render
  let Component: React.ElementType = component || "p";

  if (!component) {
    if (variant.startsWith("h")) {
      Component = variant as React.ElementType;
    } else if (variant === "subtitle1" || variant === "subtitle2") {
      Component = "h6";
    } else if (variant === "caption" || variant === "overline") {
      Component = "span";
    }
  }

  // Base styles mapping
  const variantStyles: Record<TypographyVariant, string> = {
    h1: "font-serif text-[clamp(2.6rem,4.5vw,4.2rem)] font-bold leading-[1.1] text-text-head",
    h2: "font-serif text-[clamp(1.9rem,3vw,2.8rem)] font-bold text-text-head leading-[1.2]",
    h3: "font-serif text-3xl font-bold text-text-head",
    h4: "font-serif text-2xl font-bold text-text-head",
    h5: "font-serif text-xl font-bold text-text-head",
    h6: "font-serif text-[1.2rem] font-bold text-text-head",
    subtitle1: "font-sans text-[1.05rem] leading-[1.85] text-text-body",
    subtitle2: "font-sans text-[0.95rem] font-bold text-text-mid",
    body1: "font-sans text-[1rem] leading-[1.8] text-text-body",
    body2: "font-sans text-[0.93rem] leading-[1.8] text-text-mid",
    caption: "font-sans text-[0.78rem] tracking-[0.05em]",
    overline: "font-sans text-[0.78rem] font-bold tracking-[0.18em] uppercase",
  };

  const combinedClassName = `${variantStyles[variant]} ${className}`.trim();

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
}
