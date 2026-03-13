"use client";

import { useState, useTransition } from "react";
import { createComment } from "@/sanity/lib/comments";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a comment..."
                maxLength={500}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
                disabled={isPending}
            />
            <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">{text.length}/500</span>
                <Button
                    type="submit"
                    disabled={isPending || !text.trim()}
                    className="bg-black text-white hover:bg-gray-800"
                >
                    {isPending ? "Posting..." : "Post Comment"}
                </Button>
            </div>
        </form>
    );
}
