"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ImageLightbox() {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState("");

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      // Only target images inside the tiptap content or post images
      if (target.tagName === "IMG" && (target.closest(".tiptap") || target.closest("[data-lightbox]"))) {
        e.preventDefault();
        setSrc((target as HTMLImageElement).src);
        setAlt((target as HTMLImageElement).alt || "");
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSrc(null);
    }
    if (src) {
      window.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [src]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-zoom-out"
      onClick={() => setSrc(null)}
    >
      <button
        onClick={() => setSrc(null)}
        className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Close"
      >
        <X size={24} />
      </button>
      <img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
