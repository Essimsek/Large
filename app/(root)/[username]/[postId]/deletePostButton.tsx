"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Delete } from "lucide-react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import deletePost from "@/sanity/lib/deletePost"

export default function DeletePostButton({ postId }: { postId: string }) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deletePost({ postId })
    
    // Close dialog
    setOpen(false)
    
    // Reset state after a short delay.
    if (result.message) {
      setTimeout(() => {
        setIsDeleting(false)
        toast.success("Post deleted successfully.")
        router.push(`/${result.username}`)
      }, 100)
    }
    else {
      toast.error(result.message)
      setOpen(false)
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full justify-between !bg-transparent hover:!bg-red-400">
          Delete
          <Delete />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The post will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="!justify-center items-center">
          <AlertDialogCancel disabled={isDeleting}>
            No, cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Yes, delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}