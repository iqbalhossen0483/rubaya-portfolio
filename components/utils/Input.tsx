import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { InputHTMLAttributes, forwardRef, useState } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isLoading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className = "", label, error, isLoading, disabled, type, ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

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
            type={showPassword ? "text" : type}
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
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-body"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
