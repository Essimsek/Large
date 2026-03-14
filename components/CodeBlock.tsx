"use client";

import React, { useState, useMemo } from "react";
import { refractor } from "refractor/lib/core.js";
import { Copy, Check } from 'lucide-react';

interface RefractorTextNode { type: 'text'; value: string }
interface RefractorElementNode { type: string; tagName: string; properties?: { [k: string]: any }; children: RefractorNode[] }
type RefractorNode = RefractorTextNode | RefractorElementNode;
interface RefractorRoot { type: 'root'; children: RefractorNode[] }

// Language grammars (only load what you need)
import javascript from "refractor/lang/javascript.js";
import typescript from "refractor/lang/typescript.js";
import python from "refractor/lang/python.js";
import go from "refractor/lang/go.js";
import rust from "refractor/lang/rust.js";
import json from "refractor/lang/json.js";
import c from "refractor/lang/c.js";
import cpp from "refractor/lang/cpp.js";
import csharp from "refractor/lang/csharp.js";
import markup from "refractor/lang/markup.js"; // HTML
import css from "refractor/lang/css.js";

// Only include languages defined in the studio configuration
const grammars = [
  javascript,
  typescript,
  python,
  go,
  rust,
  json,
  c,
  cpp,
  csharp,
  markup,
  css,
];

// Register (idempotent)
for (const g of grammars) {
  try {
    refractor.register(g);
  } catch {
    /* already registered */
  }
}

interface SanityCodeValue {
  code?: string;
  language?: string;
  filename?: string;
  highlightedLines?: number[];
}

interface CodeBlockProps {
  value: SanityCodeValue;
  showLineNumbers?: boolean;
}

const langAlias: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  go: "go",
  rs: "rust",
  html: "markup",
  css: "css",
  json: "json",
  c: "c",
  cpp: "cpp",
  'c++': "cpp",
  cs: "csharp",
};

export function CodeBlock({ value }: CodeBlockProps) {
  if (!value) return null;
  const { code = "", filename } = value;
  let { language } = value;

  const normLangRaw = (language || "javascript").toLowerCase();
  const normLang = langAlias[normLangRaw] || normLangRaw;
  // For user-friendly badge, prefer 'html' over internal 'markup'
  const displayLang = normLang === 'markup' ? 'html' : normLang;

  const [copied, setCopied] = useState(false);

  const ast: RefractorRoot | null = useMemo(() => {
    try {
      return refractor.highlight(code, normLang) as RefractorRoot;
    } catch {
      return null;
    }
  }, [code, normLang]);

  type Node = RefractorNode;
  const isText = (n: RefractorNode): n is RefractorTextNode => n.type === 'text';
  // Token color mapping — uses CSS custom property to adapt to theme
  // These colors are chosen to be readable on both light and dark backgrounds
  const tokenStyle = (cls: string): React.CSSProperties | undefined => {
    if (cls.includes('comment')) return { color: 'var(--code-comment, #6a737d)', fontStyle: 'italic' };
    if (cls.includes('keyword')) return { color: 'var(--code-keyword, #b800d8)', fontWeight: 500 };
    if (cls.includes('string')) return { color: 'var(--code-string, #0b7d13)' };
    if (cls.includes('boolean') || cls.includes('null') || cls.includes('constant')) return { color: 'var(--code-constant, #b05a00)' };
    if (cls.includes('number')) return { color: 'var(--code-number, #1c6fda)' };
    if (cls.includes('function')) return { color: 'var(--code-function, #c7254e)' };
    if (cls.includes('class-name')) return { color: 'var(--code-class, #005cc5)' };
    if (cls.includes('operator')) return { color: 'var(--code-operator, #aa22ff)' };
    if (cls.includes('punctuation')) return { color: 'var(--code-punctuation, #555)' };
    if (cls.includes('tag')) return { color: 'var(--code-tag, #22863a)', fontWeight: 500 };
    if (cls.includes('attr-name')) return { color: 'var(--code-attr-name, #6f42c1)' };
    if (cls.includes('attr-value')) return { color: 'var(--code-attr-value, #032f62)' };
    if (cls.includes('doctype')) return { color: 'var(--code-doctype, #b31d28)', fontStyle: 'italic' };
    if (cls.includes('entity')) return { color: 'var(--code-entity, #005cc5)' };
    return undefined;
  };

  const renderNodes = (nodes: Node[]): React.ReactNode =>
    nodes.map((node, i) => {
      if (isText(node)) return node.value;
      const el = node as RefractorElementNode;
      const classList = el.properties?.className;
      const className = Array.isArray(classList)
        ? classList.join(' ')
        : (classList as string) || '';
      return (
        <span key={i} className={className} style={tokenStyle(className)}>
          {el.children ? renderNodes(el.children as Node[]) : null}
        </span>
      );
    });

  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      })
      .catch(() => {});
  };

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      {(filename || normLang) && (
        <div className="flex items-center justify-between border-b border-border bg-muted/70 backdrop-blur-sm px-3 py-2 text-[11px] font-mono">
          <div className="flex items-center gap-4 min-w-0">
            {filename && (
              <span className="truncate font-medium text-foreground/80 text-[13px]" title={filename}>{filename}</span>
            )}
      {normLang && (
              <span className="rounded bg-muted px-2 py-0.5 text-[13px] font-semibold tracking-wide text-muted-foreground select-none">
        {displayLang}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:bg-muted active:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
            aria-label="Copy code"
            type="button"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      )}
      <div className="relative">
        <pre
          className="m-0 overflow-x-auto p-4 text-[14px] leading-[1.55] font-mono text-foreground selection:bg-yellow-200 dark:selection:bg-yellow-500/30"
          style={{ tabSize: 2 }}
        >
          <code className={`language-${normLang} block`}>{ast ? renderNodes(ast.children as Node[]) : code}</code>
        </pre>
      </div>
    </div>
  );
}