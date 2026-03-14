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
    const [burst, setBurst] = useState(false);
    const pendingRef = useRef(false);

    async function handleClick() {
        if (!isAuthenticated || pendingRef.current) return;
        pendingRef.current = true;

        const prevLiked = liked;
        const prevCount = count;
        setLiked(!prevLiked);
        setCount(prevLiked ? prevCount - 1 : prevCount + 1);

        // Trigger burst animation on like
        if (!prevLiked) {
            setBurst(true);
            setTimeout(() => setBurst(false), 600);
        }

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
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                isAuthenticated
                    ? "cursor-pointer hover:bg-red-50 dark:hover:bg-red-500/10 active:scale-95"
                    : "cursor-default opacity-60"
            } ${liked ? "bg-red-50 dark:bg-red-500/10" : ""}`}
            aria-label={liked ? "Unlike" : "Like"}
            title={!isAuthenticated ? "Sign in to like" : undefined}
        >
            {/* Burst particles */}
            {burst && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <span
                            key={i}
                            className="absolute w-1.5 h-1.5 rounded-full bg-red-400 animate-like-burst"
                            style={{
                                animationDelay: `${i * 40}ms`,
                                transform: `rotate(${i * 60}deg) translateY(-12px)`,
                            }}
                        />
                    ))}
                </span>
            )}
            <Heart
                size={18}
                className={`transition-all duration-300 ${
                    liked
                        ? "fill-red-500 stroke-red-500 scale-110"
                        : "stroke-muted-foreground"
                } ${burst ? "animate-like-pop" : ""}`}
            />
            <span className={`text-sm font-semibold transition-colors duration-200 ${
                liked ? "text-red-500" : "text-muted-foreground"
            }`}>
                {count.toLocaleString()}
            </span>
        </button>
    );
}
