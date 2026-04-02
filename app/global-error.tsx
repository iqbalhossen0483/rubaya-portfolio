"use client";

import Button from "@/components/utils/Button";
import Typography from "@/components/utils/Typography";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background-main flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background botanical ring decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {/* Outer faint ring */}
        <div
          className="rounded-full border border-border-custom opacity-30"
          style={{ width: 520, height: 520 }}
        />
        {/* Middle ring */}
        <div
          className="absolute rounded-full border border-border-custom opacity-20"
          style={{ width: 360, height: 360 }}
        />
        {/* Inner ring */}
        <div
          className="absolute rounded-full border border-accent-pale opacity-25"
          style={{ width: 220, height: 220 }}
        />
        {/* Floating leaf shapes */}
        <svg
          className="absolute opacity-[0.06]"
          width="600"
          height="600"
          viewBox="0 0 600 600"
          fill="none"
        >
          <ellipse
            cx="150"
            cy="120"
            rx="80"
            ry="30"
            fill="#1f6b42"
            transform="rotate(-40 150 120)"
          />
          <ellipse
            cx="460"
            cy="200"
            rx="60"
            ry="22"
            fill="#1f6b42"
            transform="rotate(30 460 200)"
          />
          <ellipse
            cx="100"
            cy="430"
            rx="70"
            ry="25"
            fill="#1f6b42"
            transform="rotate(20 100 430)"
          />
          <ellipse
            cx="500"
            cy="420"
            rx="55"
            ry="20"
            fill="#1f6b42"
            transform="rotate(-55 500 420)"
          />
          <ellipse
            cx="300"
            cy="80"
            rx="50"
            ry="18"
            fill="#1f6b42"
            transform="rotate(10 300 80)"
          />
        </svg>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Error code ribbon */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border-custom" />
          <span className="font-serif text-[11px] tracking-[0.22em] uppercase text-accent-muted">
            Something went wrong
          </span>
          <div className="h-px flex-1 bg-border-custom" />
        </div>

        {/* Icon + large numeral */}
        <div className="flex items-end gap-5 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-background-deep border border-border-custom flex items-center justify-center shrink-0">
            <AlertTriangle className="w-7 h-7 text-accent" strokeWidth={1.5} />
          </div>
          <Typography
            variant="h1"
            className="font-serif text-[5.5rem] leading-none tracking-tight text-text-head opacity-10 select-none"
          >
            500
          </Typography>
        </div>

        {/* Headline */}
        <Typography
          variant="h2"
          className="font-serif text-text-head mb-3 leading-tight"
        >
          An unexpected error occurred
        </Typography>

        {/* Body */}
        <Typography
          variant="body1"
          className="text-text-body mb-2 leading-relaxed"
        >
          The page encountered a problem it couldn&apos;t recover from. You can
          try refreshing, or return home and continue from there.
        </Typography>

        {/* Digest / error message — shown only when available */}
        {(error.digest || error.message) && (
          <div className="mt-4 mb-6 px-4 py-3 rounded-xl bg-background-alt border border-border-custom">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-1">
              Error detail
            </p>
            <p className="font-mono text-sm text-text-mid break-all leading-relaxed">
              {error.digest ?? error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <Button
            variant="primary"
            icon={<RefreshCw className="w-4 h-4" />}
            onClick={reset}
          >
            Try again
          </Button>
          <Button
            variant="secondary"
            href="/"
            icon={<Home className="w-4 h-4" />}
          >
            Back to home
          </Button>
        </div>

        {/* Bottom rule */}
        <div className="mt-12 h-px bg-border-custom opacity-60" />
        <p className="mt-4 text-[12px] text-accent-muted tracking-wide">
          If this keeps happening, please contact support.
        </p>
      </div>
    </div>
  );
}
