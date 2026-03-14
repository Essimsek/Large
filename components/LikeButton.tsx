"use client";

import { Heart } from "lucide-react";
import { useRef, useState } from "react";
import { toggleLike } from "@/sanity/lib/toggle-like";

type LikeButtonProps = {
    postId: string;
    initialLiked: boolean;
    initialCount: number;
    isAuthenticated: boolean;
};

export default function LikeButton({
    postId,
    initialLiked,
    initialCount,
    isAuthenticated,
}: LikeButtonProps) {
    const [liked, setLiked] = useState(initialLiked);
    const [count, setCount] = useState(initialCount);
    const pendingRef = useRef(false);

    async function handleClick() {
        if (!isAuthenticated || pendingRef.current) return;
        pendingRef.current = true;

        const prevLiked = liked;
        const prevCount = count;
        setLiked(!prevLiked);
        setCount(prevLiked ? prevCount - 1 : prevCount + 1);

        try {
            const result = await toggleLike(postId);
            setLiked(result.liked);
            setCount(result.likeCount);
        } catch {
            setLiked(prevLiked);
            setCount(prevCount);
        } finally {
            pendingRef.current = false;
        }
    }

    return (
        <button
            onClick={handleClick}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                isAuthenticated
                    ? "cursor-pointer hover:bg-red-50 dark:hover:bg-red-500/10 active:scale-95"
                    : "cursor-default opacity-60"
            } ${liked ? "bg-red-50 dark:bg-red-500/10" : ""}`}
            aria-label={liked ? "Unlike" : "Like"}
            title={!isAuthenticated ? "Sign in to like" : undefined}
        >
            <Heart
                size={18}
                className={`transition-all duration-300 ${
                    liked
                        ? "fill-red-500 stroke-red-500 scale-110"
                        : "stroke-muted-foreground"
                }`}
            />
            <span className={`text-sm font-semibold transition-colors duration-200 ${
                liked ? "text-red-500" : "text-muted-foreground"
            }`}>
                {count.toLocaleString()}
            </span>
        </button>
    );
}
