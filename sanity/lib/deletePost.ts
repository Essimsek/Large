"use server";

import { client } from "@/sanity/lib/client";

const deletePost = async ({ postId }: { postId: string }) => {
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
