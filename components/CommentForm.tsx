"use client";

import { useState, useTransition } from "react";
import { createComment } from "@/sanity/lib/comments";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type CommentFormProps = {
    postId: string;
};

export default function CommentForm({ postId }: CommentFormProps) {
    const [text, setText] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!text.trim()) return;

        startTransition(async () => {
            const result = await createComment(postId, text);
            if (result.success) {
                setText("");
                router.refresh();
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
                maxLength={500}
                rows={3}
                className="w-full p-4 bg-muted/50 dark:bg-muted/30 border border-border/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-transparent text-foreground placeholder:text-muted-foreground transition-all duration-200"
                disabled={isPending}
            />
            <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{text.length}/500</span>
                <Button
                    type="submit"
                    disabled={isPending || !text.trim()}
                    className="bg-foreground text-background hover:opacity-90 rounded-full px-5 transition-all duration-200 disabled:opacity-40"
                >
                    {isPending ? "Posting..." : (
                        <span className="flex items-center gap-1.5">
                            Post <Send size={13} />
                        </span>
                    )}
                </Button>
            </div>
        </form>
    );
}
