import { Loader2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "icon" | "nav";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export default function Button({
  variant = "primary",
  href,
  children,
  className = "",
  icon,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses =
    "font-sans font-bold uppercase transition-all duration-200 inline-flex items-center justify-center";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "px-[2.2rem] py-[0.9rem] bg-accent text-white text-[0.88rem] tracking-[0.07em] rounded-[3px] hover:bg-accent-soft hover:-translate-y-[2px]",
    secondary:
      "gap-[0.4rem] text-[0.88rem] tracking-[0.07em] text-accent hover:gap-[0.75rem] after:content-['→']",
    icon: "gap-[0.8rem] px-[2rem] py-[1rem] bg-accent text-white text-[0.88rem] tracking-[0.07em] rounded-[3px] hover:opacity-100 opacity-95 hover:-translate-y-[2px]",
    nav: "text-[0.85rem] tracking-[0.09em] text-text-mid hover:text-accent",
  };

  const combinedClassName =
    `${baseClasses} ${variantStyles[variant]} ${className}`.trim();

  const content = (
    <>
      {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
      {icon && !isLoading && <span>{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${combinedClassName} ${isLoading || disabled ? "opacity-70 cursor-not-allowed" : ""}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
}
