"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Button } from "./button"
import { Trash } from "lucide-react"

export default function SimpleDropzone() {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = (file: File) => {
    setPreview(URL.createObjectURL(file))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    e.preventDefault()
    setPreview(null)
  }

  return (
    <>
    <Label htmlFor="fileUpload" className="text-2xl">Post Thumbnail</Label>
    <div className="w-full max-w-md mx-auto">
      <Label
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        htmlFor="fileUpload"
        className="relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-8 cursor-pointer hover:bg-muted/50 transition"
      >
        {preview ? (
            <>
                <Image
                    src={preview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="w-auto h-auto object-cover rounded-lg shadow-md"
                />
                <Button
                  type="button"
                  onClick={handleDelete}
                  className="absolute top-1 right-1 rounded-full"
                  variant="destructive"
                >
                  <Trash/>
                </Button>
            </>
        ) : (
          <>
            <p className="text-sm font-medium">Click or drag & drop</p>
            <p className="text-xs text-muted-foreground">PNG, JPG (max 10MB)</p>
          </>
        )}
      </Label>
      <Input
        id="fileUpload"
        type="file"
        name="fileUpload"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  </>
  )
}
