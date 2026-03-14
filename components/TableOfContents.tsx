"use client";

import { useState, useEffect } from "react";
import { List, ChevronRight } from "lucide-react";

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents() {
  const [items, setItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    // Wait a tick for TipTap to render
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll(
        ".tiptap h1, .tiptap h2, .tiptap h3"
      );
      const tocItems: TOCItem[] = [];

      headings.forEach((heading, index) => {
        const id = `toc-heading-${index}`;
        heading.id = id;
        tocItems.push({
          id,
          text: heading.textContent || "",
          level: parseInt(heading.tagName[1]),
        });
      });

      setItems(tocItems);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav className="hidden xl:block fixed right-8 top-1/3 w-56 z-40">
      <div className="bg-card/80 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-lg">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3 w-full"
        >
          <List size={14} />
          <span>On this page</span>
          <ChevronRight
            size={14}
            className={`ml-auto transition-transform duration-200 ${collapsed ? "" : "rotate-90"}`}
          />
        </button>

        {!collapsed && (
          <ul className="space-y-1 text-sm max-h-[50vh] overflow-y-auto pr-1">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`block py-1 border-l-2 transition-all duration-200 truncate ${
                    activeId === item.id
                      ? "border-red-500 text-red-500 font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                  style={{ paddingLeft: `${(item.level - 1) * 12 + 12}px` }}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
