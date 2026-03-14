"use client";

import { useState, useEffect } from "react";

const words = ["inspiration", "knowledge", "creativity", "ideas", "stories"];

export default function TypedText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause before deleting
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <span className="bg-black/80 px-2 py-0.5 rounded-lg font-semibold inline-block min-w-[120px]">
      {words[wordIndex].substring(0, charIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
}
