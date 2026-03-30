import React from "react";

type CardVariant = "outlined" | "elevated" | "flat" | "event" | "award";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  variant = "flat",
  children,
  className = "",
  onClick,
  ...props
}: CardProps) {
  const baseClasses =
    "rounded-[4px] relative overflow-hidden transition-all duration-250";

  const variantStyles: Record<CardVariant, string> = {
    flat: "bg-background-main",
    outlined:
      "bg-background-main border-[3px] border-border-custom hover:border-accent",
    elevated:
      "bg-background-main border-t-[3px] border-border-custom hover:border-accent hover:-translate-y-[4px] hover:shadow-[0_8px_24px_rgba(55,118,78,0.1)]",
    event: "group cursor-pointer",
    award:
      "bg-white border-l-[4px] border-accent-pale hover:border-accent hover:shadow-[0_4px_16px_rgba(55,118,78,0.1)]",
  };

  const combinedClassName =
    `${baseClasses} ${variantStyles[variant]} ${className}`.trim();

  return (
    <div className={combinedClassName} onClick={onClick} {...props}>
      {children}
    </div>
  );
}
