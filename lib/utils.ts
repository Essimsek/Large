import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const newDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  return newDate
}

function extractText(node: Record<string, unknown>): string {
  if (node.type === "text" && typeof node.text === "string") return node.text;
  if (Array.isArray(node.content)) {
    return node.content.map((child: Record<string, unknown>) => extractText(child)).join(" ");
  }
  return "";
}

export function estimateReadingTime(content: string): number {
  try {
    const json = JSON.parse(content);
    const text = extractText(json);
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
  } catch {
    return 1;
  }
}
