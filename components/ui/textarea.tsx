"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

function TextareaWithCounter(
  { maxChars, className, ...props }: { maxChars: number } & React.ComponentProps<"textarea">
) {
  const [value, setValue] = useState(props.defaultValue ? String(props.defaultValue).slice(0, maxChars) : "")

  return (
    <div className="grid w-full gap-1">
      <Textarea
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxChars}
        className={cn("!text-lg !font-semibold", className)}
        {...props}
      />
      <p className={`text-sm text-muted-foreground text-right ${value.length === maxChars ? 'text-red-500 font-semibold' : ''}`}>
        {value.length}/{maxChars} characters
      </p>
    </div>
  )
}

export { Textarea, TextareaWithCounter }
