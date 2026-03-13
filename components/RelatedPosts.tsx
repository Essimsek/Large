import { client } from "@/sanity/lib/client";
import { GET_RELATED_POSTS } from "@/sanity/lib/queries";
import PostCard from "./PostCard";
import type { Post } from "@/sanity.types";

type RelatedPostsProps = {
    category: string;
    postId: string;
};

export default async function RelatedPosts({ category, postId }: RelatedPostsProps) {
    const posts: Post[] = await client.fetch(GET_RELATED_POSTS, { category, postId });

    if (!posts || posts.length === 0) return null;

    return (
        <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold mb-4">Related Posts</h3>
            <ul className="grid-card-area">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </ul>
        </div>
    );
}
