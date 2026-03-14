"use client";

export default function CmdKButton() {
  return (
    <button
      onClick={() => {
        window.dispatchEvent(
          new KeyboardEvent("keydown", { key: "k", ctrlKey: true, bubbles: true })
        );
      }}
      className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/60 hover:bg-muted rounded-lg text-sm text-muted-foreground transition-colors duration-200 border border-border/50 cursor-pointer"
    >
      <span className="text-xs">Search...</span>
      <kbd className="px-1 py-0.5 bg-background rounded text-[10px] font-mono border border-border/50">
        Ctrl K
      </kbd>
    </button>
  );
}
