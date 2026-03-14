"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function KeyboardShortcuts() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Ignore when typing in inputs/textareas
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement)?.isContentEditable) {
        return;
      }

      // T - Toggle theme
      if (e.key === "t" && !e.metaKey && !e.ctrlKey) {
        setTheme(theme === "dark" ? "light" : "dark");
      }

      // / - Focus search
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        const searchInput = document.querySelector('input[name="query"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }

      // N - New post
      if (e.key === "n" && !e.metaKey && !e.ctrlKey) {
        router.push("/new-post");
      }

      // H - Go home
      if (e.key === "h" && !e.metaKey && !e.ctrlKey) {
        router.push("/");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, theme, setTheme]);

  return null;
}
