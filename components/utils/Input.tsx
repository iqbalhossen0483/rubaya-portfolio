import { Loader2 } from "lucide-react";
import React, { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isLoading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, isLoading, disabled, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-mid mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            disabled={disabled || isLoading}
            className={`w-full px-4 py-3 bg-background-alt border rounded-lg text-text-body focus:outline-none focus:border-accent transition-colors
              ${error ? "border-red-500" : "border-border-custom"}
              ${disabled || isLoading ? "opacity-70 cursor-not-allowed" : ""}
              ${className}
            `}
            {...props}
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-accent animate-spin" />
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
