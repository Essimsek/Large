"use server";

import { client } from "./client";
import { checkExistingSlug } from "./generate-slug";
import { auth } from "@/auth";
import { GET_IMAGE_REF_BY_ID } from "./queries";

function getStringField(
  data: FormData,
  fieldName: string
): string | null {
  const field = data.get(fieldName);
  return typeof field === "string" ? field.trim() : null;
}

type Success<T = {}> = {
  type: "success";
  message: string;
} & T;

type Failure = {
  type: "fail";
  message: string;
};

export type Result<T = {}> = Success<T> | Failure;

async function updatePost(data: FormData, postId?: string): Promise<Result> {
    const session = await auth();
    if (!session || !session?.user) {
        console.log("User not authenticated. Cannot update post.");
        return {type: "fail", message: "User not authenticated."};
    }
    if (!postId) {
        console.log("Post ID is required to update a post.");
        return {type: "fail", message: "Post not found to update."};
    }
    const title = getStringField(data, 'post-title')
    const description = getStringField(data, 'post-description')
    const content = getStringField(data, 'post-content')
    const category = getStringField(data, 'post-category')
    if (!title || !description || !content || !category) {
        console.log("Missing required fields to update post.");
        return {type: "fail", message: "Missing required fields."};
    }
    const file = data.get('post-thumbnail') as File
    const slug = await checkExistingSlug(title)

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
        return { type: "success", message: "Post updated successfully."};
    } catch (error) {
        console.error("Error while updating the post: ", error);
        return { type: "fail", message: "An error occurred while updating the post."};
    }
}

export { updatePost };