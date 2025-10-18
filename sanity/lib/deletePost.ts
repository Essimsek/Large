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
            _id,
            title
        }`,
        { postId }
        );
        if (!post) {
            throw new Error("post not found");
        }
        await client.delete(post._id);
        if (post.image?.asset?._id) {
            await client.delete(post.image?.asset?._id)
            console.log("Deleted image asset:", post.image?.asset?._id);
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "An error occurred while deleting the post images.");
    }
}

export default deletePost;
