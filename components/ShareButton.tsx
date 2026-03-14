"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Link2, Check } from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out "${title}" on Large`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
  }

  function shareLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm text-muted-foreground hover:bg-muted/50 transition-all duration-200 hover:text-foreground"
        aria-label="Share"
      >
        <Share2 size={15} />
        <span className="font-medium">Share</span>
      </button>

      {open && (
        <div className="absolute bottom-full right-0 mb-2 bg-card border border-border/60 rounded-xl shadow-xl p-2 min-w-[180px] animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
          <button
            onClick={copyLink}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-muted/60 transition-colors text-left"
          >
            {copied ? <Check size={15} className="text-green-500" /> : <Link2 size={15} />}
            {copied ? "Copied!" : "Copy link"}
          </button>
          <button
            onClick={shareTwitter}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-muted/60 transition-colors text-left"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Post on X
          </button>
          <button
            onClick={shareLinkedIn}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm hover:bg-muted/60 transition-colors text-left"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            Share on LinkedIn
          </button>
        </div>
      )}
    </div>
  );
}
