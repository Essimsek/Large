import { client } from "@/sanity/lib/client";
import { GET_RELATED_POSTS } from "@/sanity/lib/queries";
import PostCard from "./PostCard";
import type { Post } from "@/sanity.types";
import { Sparkles } from "lucide-react";

type RelatedPostsProps = {
    category: string;
    postId: string;
};

export default async function RelatedPosts({ category, postId }: RelatedPostsProps) {
    const posts: Post[] = await client.fetch(GET_RELATED_POSTS, { category, postId });

    if (!posts || posts.length === 0) return null;

    return (
        <div className="mt-12 pt-8 border-t border-border/50">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-6">
                <Sparkles size={18} className="text-yellow-500" />
                Related Posts
            </h3>
            <ul className="grid-card-area">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </ul>
        </div>
    );
}
