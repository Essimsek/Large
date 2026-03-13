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
        <div className={`flex gap-3 p-3 rounded-lg bg-gray-50 ${isPending ? "opacity-50" : ""}`}>
            <Link
                href={`/${comment.author?.username}`}
                className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex-shrink-0"
            >
                {comment.author?.image ? (
                    <img
                        src={urlForImage(comment.author.image).width(32).height(32).url()}
                        alt={comment.author.username}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-300 rounded-full" />
                )}
            </Link>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <Link
                        href={`/${comment.author?.username}`}
                        className="font-medium text-sm hover:underline"
                    >
                        {comment.author?.name}
                    </Link>
                    <span className="text-xs text-gray-400">
                        {formatDate(comment._createdAt)}
                    </span>
                </div>
                <p className="text-sm text-gray-700 mt-1 break-words whitespace-pre-line">
                    {comment.text}
                </p>
            </div>
            {isOwner && (
                <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="text-gray-400 hover:text-red-500 transition-colors self-start p-1"
                    aria-label="Delete comment"
                >
                    <Trash2 size={14} />
                </button>
            )}
        </div>
    );
}
