"use client";

import { useTransition } from "react";
import { deleteComment } from "@/sanity/lib/comments";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";
import Link from "next/link";

type CommentData = {
    _id: string;
    _createdAt: string;
    text: string;
    author: {
        username: string;
        name: string;
        image?: string;
    };
};

type CommentItemProps = {
    comment: CommentData;
    isOwner: boolean;
};

export default function CommentItem({ comment, isOwner }: CommentItemProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function handleDelete() {
        startTransition(async () => {
            const result = await deleteComment(comment._id);
            if (result.success) {
                router.refresh();
            }
        });
    }

    return (
        <div className={`flex gap-3 p-4 rounded-xl bg-muted/40 dark:bg-muted/20 border border-border/30 transition-all duration-200 ${isPending ? "opacity-40" : "hover:bg-muted/60 dark:hover:bg-muted/30"}`}>
            <Link
                href={`/${comment.author?.username}`}
                className="w-9 h-9 rounded-full bg-muted overflow-hidden flex-shrink-0 ring-2 ring-border/50"
            >
                {comment.author?.image ? (
                    <img
                        src={urlForImage(comment.author.image).width(36).height(36).url()}
                        alt={comment.author.username}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-muted rounded-full" />
                )}
            </Link>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <Link
                        href={`/${comment.author?.username}`}
                        className="font-semibold text-sm hover:text-red-500 transition-colors"
                    >
                        {comment.author?.name}
                    </Link>
                    <span className="text-xs text-muted-foreground">
                        {formatDate(comment._createdAt)}
                    </span>
                </div>
                <p className="text-sm text-foreground/80 mt-1.5 break-words whitespace-pre-line leading-relaxed">
                    {comment.text}
                </p>
            </div>
            {isOwner && (
                <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="text-muted-foreground hover:text-red-500 transition-all duration-200 self-start p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
                    aria-label="Delete comment"
                >
                    <Trash2 size={14} />
                </button>
            )}
        </div>
    );
}
