"use server";

import { client } from "@/sanity/lib/client";
import { auth } from "@/auth";
import { rateLimit } from "@/lib/rate-limit";

const deletePost = async ({ postId }: { postId: string }) => {
    const session = await auth();
    if (!session?.user?.username) {
        return { success: false, message: "Not authenticated" };
    }
    if (!rateLimit(`delete-post:${session.user.username}`, 5, 10 * 60 * 1000)) {
        return { success: false, message: "Too many deletions. Please wait." };
    }
    try {
        const post = await client.fetch(
        `*[_type == "post" && _id == $postId][0] {
            image { 
            asset->{
                _id,
                _type
            }
            },
            "author": author -> {
            username
            },
            _id,
            title
        }`,
        { postId }
        );
        if (!post) {
            return {success: false, message: "Post not found"};
        }
        await client.delete(post._id);
        if (post.image?.asset?._id) {
            await client.delete(post.image?.asset?._id)
            console.log("Deleted image asset:", post.image?.asset?._id);
        }
        return {success: true, message: "Post deleted successfully", username: post.author.username};
    } catch (error) {
        return {success: false, message: error instanceof Error ? error.message : "An error occurred while deleting the post."};
    }
}

export default deletePost;
