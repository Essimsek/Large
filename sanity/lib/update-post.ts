"use server";

import { client } from "./client";
import { checkExistingSlug } from "./generate-slug";
import { auth } from "@/auth";
import { GET_IMAGE_REF_BY_ID } from "./queries";

async function updatePost({data} : {data: FormData}, {postId}: {postId?: string}) {
    const session = await auth();
    if (!session || !session?.user) {
        console.log("User not authenticated. Cannot update post.");
        return;
    }
    if (!postId) {
        console.log("Post ID is required to update a post.");
        return;
    }
    const title = data.get('post-title') as string
    const description = data.get('post-description') as string
    const file = data.get('post-thumbnail') as File
    const slug = await checkExistingSlug(title.trim())
    const content = data.get('post-content')
    const category = data.get('post-category') as string

    try {
        if (file && file.size > 0) {
            const oldImageRef = await client.fetch(GET_IMAGE_REF_BY_ID, {postId});
            const newImage = await client.assets.upload('image', file, {filename: file.name});

            const imageRef = {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: newImage._id,
                },
            }
            await client.patch(postId).set({
                title,
                description,
                slug: {current: slug, _type: "slug"},
                image: imageRef,
                content: content,
                category: category,
            }).commit();

            if (oldImageRef) {
                await client.delete(oldImageRef);
            }
        }
        else {
            await client.patch(postId).set({
                title: title,
                description: description,
                slug: {current: slug, _type: "slug"},
                content: content,
                category: category,
            }).commit();
        }
    } catch (error) {
        console.error("Error while updating the post: ", error);
    }
}

export { updatePost };