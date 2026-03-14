"use client";

import { Search } from "lucide-react";

export default function CmdKButton() {
  function triggerPalette() {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
    );
  }

  return (
    <>
      {/* Desktop */}
      <button
        onClick={triggerPalette}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/60 hover:bg-muted rounded-lg text-sm text-muted-foreground transition-colors duration-200 border border-border/50 cursor-pointer"
      >
        <Search size={13} />
        <span className="text-xs">Search...</span>
        <kbd className="px-1 py-0.5 bg-background rounded text-[10px] font-mono border border-border/50">
          Ctrl K
        </kbd>
      </button>
      {/* Mobile */}
      <button
        onClick={triggerPalette}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-muted transition-colors cursor-pointer"
        aria-label="Open command palette"
      >
        <Search size={18} className="text-muted-foreground" />
      </button>
    </>
  );
}
