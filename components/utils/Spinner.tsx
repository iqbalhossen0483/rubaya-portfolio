import { Loader2 } from "lucide-react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export default function Spinner({
  size = "md",
  className = "",
  text,
}: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div
      className={`flex items-center justify-center text-accent ${className}`}
      role="status"
      aria-live="polite"
    >
      <Loader2 className={`${sizeClasses[size]} animate-spin`} />
      {text && <span className="ml-2 text-sm text-text-mid">{text}</span>}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
