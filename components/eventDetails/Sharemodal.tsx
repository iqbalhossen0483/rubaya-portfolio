"use client";

import { Check, Copy, ExternalLink, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.095 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.932-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.1 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function ShareModal({
  isOpen,
  onClose,
  title,
  url,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const shareUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "");
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!isOpen) return null;

  const platforms = [
    {
      id: "facebook",
      label: "Facebook",
      description: "Share to your timeline",
      icon: <FacebookIcon />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-[#1877F2] hover:bg-[#0e65d9]",
      textColor: "text-white",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      description: "Share with your network",
      icon: <LinkedInIcon />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}`,
      color: "bg-[#0A66C2] hover:bg-[#0858a8]",
      textColor: "text-white",
    },
  ];

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: "rgba(14, 28, 20, 0.55)",
        backdropFilter: "blur(4px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Share event"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md"
        style={{ boxShadow: "0 24px 64px rgba(14,28,20,0.25)" }}
      >
        {/* Header strip */}
        <div className="bg-accent-soft px-6 py-5 flex items-start justify-between rounded-t-md">
          <div>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-accent-pale mb-1">
              Share this event
            </p>
            <p
              className="text-white font-serif text-lg leading-snug max-w-70 truncate"
              title={title}
            >
              {title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3 bg-white rounded-b-md">
          {/* Social platform buttons */}
          {platforms.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 w-full px-4 py-3.5 rounded-xl transition-all duration-150 group ${p.color} ${p.textColor}`}
            >
              <span className="shrink-0 w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                {p.icon}
              </span>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold leading-none mb-0.5">
                  {p.label}
                </p>
                <p className="text-xs opacity-75">{p.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-border-custom" />
            <span className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted">
              or
            </span>
            <div className="flex-1 h-px bg-border-custom" />
          </div>

          {/* Copy link row */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-background-alt border border-border-custom">
            <div className="flex-1 px-3 py-2 min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-muted mb-0.5">
                Page link
              </p>
              <p className="text-sm text-text-mid truncate font-mono">
                {shareUrl}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                copied
                  ? "bg-accent text-white"
                  : "bg-background-deep text-accent hover:bg-accent hover:text-white"
              }`}
              aria-label="Copy link"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
