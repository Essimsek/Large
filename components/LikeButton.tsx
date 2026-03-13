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
            className={`flex items-center gap-1.5 text-sm transition-all ${
                isAuthenticated
                    ? "cursor-pointer hover:scale-105 active:scale-95"
                    : "cursor-default opacity-70"
            }`}
            aria-label={liked ? "Unlike" : "Like"}
            title={!isAuthenticated ? "Sign in to like" : undefined}
        >
            <Heart
                size={20}
                className={`transition-colors duration-200 ${
                    liked
                        ? "fill-red-500 stroke-red-500"
                        : "stroke-gray-500"
                }`}
            />
            <span className="font-medium text-gray-600">
                {count.toLocaleString()}
            </span>
        </button>
    );
}
