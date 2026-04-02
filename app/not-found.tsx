import Button from "@/components/utils/Button";
import Typography from "@/components/utils/Typography";
import { ArrowLeft, Compass, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background-main flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative background grid + botanical marks */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Subtle dot grid */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dotgrid"
              x="0"
              y="0"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#a8cfb8" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotgrid)" />
        </svg>

        {/* Large faint "404" watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-serif font-bold select-none text-accent-pale"
            style={{
              fontSize: "clamp(140px, 28vw, 280px)",
              opacity: 0.07,
              letterSpacing: "-0.05em",
              lineHeight: 1,
            }}
          >
            404
          </span>
        </div>

        {/* Corner leaf accents */}
        <svg
          className="absolute top-0 left-0 opacity-[0.07]"
          width="260"
          height="260"
          viewBox="0 0 260 260"
          fill="none"
        >
          <ellipse
            cx="30"
            cy="60"
            rx="90"
            ry="28"
            fill="#1f6b42"
            transform="rotate(-50 30 60)"
          />
          <ellipse
            cx="80"
            cy="20"
            rx="70"
            ry="20"
            fill="#1f6b42"
            transform="rotate(-20 80 20)"
          />
        </svg>
        <svg
          className="absolute bottom-0 right-0 opacity-[0.07]"
          width="260"
          height="260"
          viewBox="0 0 260 260"
          fill="none"
        >
          <ellipse
            cx="230"
            cy="200"
            rx="90"
            ry="28"
            fill="#1f6b42"
            transform="rotate(50 230 200)"
          />
          <ellipse
            cx="180"
            cy="240"
            rx="70"
            ry="20"
            fill="#1f6b42"
            transform="rotate(20 180 240)"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Label ribbon */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border-custom" />
          <span className="font-serif text-[11px] tracking-[0.22em] uppercase text-accent-muted">
            Page not found
          </span>
          <div className="h-px flex-1 bg-border-custom" />
        </div>

        {/* Icon row */}
        <div className="flex items-end gap-5 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-background-deep border border-border-custom flex items-center justify-center shrink-0">
            <Compass className="w-7 h-7 text-accent" strokeWidth={1.5} />
          </div>
          <div className="leading-none">
            <Typography
              variant="h1"
              className="font-serif text-[5.5rem] leading-none tracking-tight text-text-head opacity-10 select-none"
            >
              404
            </Typography>
          </div>
        </div>

        {/* Headline */}
        <Typography
          variant="h2"
          className="font-serif text-text-head mb-3 leading-tight"
        >
          This path leads nowhere
        </Typography>

        {/* Body */}
        <Typography
          variant="body1"
          className="text-text-body leading-relaxed mb-6"
        >
          The page you&apos;re looking for may have been moved, renamed, or
          doesn&apos;t exist. Double-check the URL or head back to familiar
          ground.
        </Typography>

        {/* Suggested links card */}
        <div className="rounded-2xl bg-background-alt border border-border-custom divide-y divide-border-custom mb-8">
          {[
            { label: "Homepage", href: "/", hint: "Start from the beginning" },
            {
              label: "Events",
              href: "/events",
              hint: "Browse all engagements",
            },
          ].map(({ label, href, hint }) => (
            <a
              key={href}
              href={href}
              className="flex items-center justify-between px-5 py-4 group hover:bg-background-mid transition-colors first:rounded-t-2xl last:rounded-b-2xl"
            >
              <div>
                <p className="text-sm font-semibold text-text-mid group-hover:text-accent transition-colors">
                  {label}
                </p>
                <p className="text-xs text-accent-muted mt-0.5">{hint}</p>
              </div>
              <ArrowLeft className="w-4 h-4 text-accent-muted group-hover:text-accent rotate-180 transition-all group-hover:translate-x-0.5" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" href="/">
            <Home className="w-4 h-4 mr-1" />
            <p>Go home</p>
          </Button>
          <Button
            variant="secondary"
            href="/events"
            icon={<Compass className="w-4 h-4" />}
          >
            Browse events
          </Button>
        </div>

        {/* Bottom rule */}
        <div className="mt-12 h-px bg-border-custom opacity-60" />
        <p className="mt-4 text-[12px] text-accent-muted tracking-wide">
          Error 404 — The requested resource could not be found.
        </p>
      </div>
    </div>
  );
}
