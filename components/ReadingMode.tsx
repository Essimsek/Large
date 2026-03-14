"use client";

import { useState, useEffect } from "react";
import { BookOpen, X } from "lucide-react";

export default function ReadingMode() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      document.documentElement.classList.add("reading-mode");
    } else {
      document.documentElement.classList.remove("reading-mode");
    }
    return () => {
      document.documentElement.classList.remove("reading-mode");
    };
  }, [active]);

  // R key toggles reading mode
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) return;
      if (e.key === "r" && !e.metaKey && !e.ctrlKey) {
        setActive((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <button
      onClick={() => setActive(!active)}
      className={`fixed bottom-8 left-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 ${
        active
          ? "bg-red-500 text-white hover:bg-red-600"
          : "bg-foreground text-background hover:scale-110"
      } active:scale-95`}
      aria-label={active ? "Exit reading mode" : "Enter reading mode"}
      title={active ? "Exit reading mode (R)" : "Reading mode (R)"}
    >
      {active ? <X size={20} /> : <BookOpen size={20} />}
    </button>
  );
}
