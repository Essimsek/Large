"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, PenLine, Home, User, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
type CommandItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string;
};

export default function CommandPalette({ username }: { username?: string | null }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "Go to Home",
      icon: <Home size={16} />,
      action: () => { router.push("/"); close(); },
      keywords: "home feed explore",
    },
    {
      id: "new-post",
      label: "Create New Post",
      icon: <PenLine size={16} />,
      action: () => { router.push("/new-post"); close(); },
      keywords: "write create new post blog",
    },
    ...(username ? [{
      id: "profile",
      label: "Go to Profile",
      icon: <User size={16} />,
      action: () => { router.push(`/${username}`); close(); },
      keywords: "profile account me",
    }] : []),
    {
      id: "toggle-theme",
      label: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      action: () => { setTheme(theme === "dark" ? "light" : "dark"); close(); },
      keywords: "theme dark light mode toggle",
    },
    {
      id: "search",
      label: "Search Posts...",
      icon: <Search size={16} />,
      action: () => {
        close();
        const searchInput = document.querySelector('input[name="query"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          router.push("/");
        }
      },
      keywords: "search find posts",
    },
  ];

  const filtered = query
    ? commands.filter((cmd) => {
        const searchStr = `${cmd.label} ${cmd.keywords || ""}`.toLowerCase();
        return query.toLowerCase().split(" ").every((word) => searchStr.includes(word));
      })
    : commands;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        close();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150"
        onClick={close}
      />

      {/* Palette */}
      <div className="relative w-full max-w-lg mx-4 bg-card border border-border/60 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
          <Search size={18} className="text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Commands List */}
        <div className="max-h-[300px] overflow-y-auto p-2">
          {filtered.length > 0 ? (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  i === selectedIndex
                    ? "bg-muted/80 text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <span className="flex-shrink-0 opacity-70">{cmd.icon}</span>
                <span className="font-medium">{cmd.label}</span>
              </button>
            ))
          ) : (
            <p className="text-center text-sm text-muted-foreground py-6">No commands found</p>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center justify-center gap-4 px-4 py-2 border-t border-border/50 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-muted rounded text-[10px] font-mono">↑↓</kbd> navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-muted rounded text-[10px] font-mono">↵</kbd> select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 bg-muted rounded text-[10px] font-mono">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  );
}
