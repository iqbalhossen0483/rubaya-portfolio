import { Loader2, UploadCloud } from "lucide-react";
import React, { InputHTMLAttributes, forwardRef } from "react";

export interface FileInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
  isUploading?: boolean;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className = "",
      label,
      error,
      isUploading,
      disabled,
      accept = "image/*",
      ...props
    },
    ref,
  ) => {
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
            type="file"
            accept={accept}
            disabled={disabled || isUploading}
            className={`w-full px-4 py-3 bg-background-alt border rounded-lg text-text-body 
              file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-soft 
              focus:outline-none focus:border-accent transition-colors
              ${error ? "border-red-500" : "border-border-custom"}
              ${disabled || isUploading ? "opacity-70 cursor-not-allowed" : ""}
              ${className}
            `}
            {...props}
          />
          {isUploading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2 text-sm text-accent font-medium">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Uploading...</span>
            </div>
          )}
          {!isUploading && !disabled && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <UploadCloud className="w-5 h-5 text-text-light opacity-50" />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600 animate-slideUp">{error}</p>
        )}
      </div>
    );
  },
);

FileInput.displayName = "FileInput";

export default FileInput;
