"use server"

import { client } from "./client";
import { checkExistingSlug } from "@/sanity/lib/generate-slug";
import { auth } from "@/auth";
import { GET_AUTHOR_ID_BY_USERNAME_QUERY } from "./queries";
import { type Result } from "./update-post";

type CreatePostResult = Result<{username: string}>;

function getStringField(
  data: FormData,
  fieldName: string
): string | null {
  const field = data.get(fieldName);
  return typeof field === "string" ? field.trim() : null;
}

async function createNewPost(data: FormData): Promise<CreatePostResult> {
    const session = await auth();
    if (!session || !session?.user || !session.user.username) {
        console.log("User not authenticated. Cannot create post.");
        return {type: "fail", message: "User not authenticated."};
    }
    const title = getStringField(data, 'post-title');
    const description = getStringField(data, 'post-description');
    const content = getStringField(data, 'post-content');
    const category = getStringField(data, 'post-category');
    if (!title || !description || !content || !category) {
        console.log("Missing required fields to create post.");
        return {type: "fail", message: "Missing required fields."};
    }
    const file = data.get('post-thumbnail') as File;
    const slug = await checkExistingSlug(title);
    try {
        const author = await client.fetch(GET_AUTHOR_ID_BY_USERNAME_QUERY, {username: session.user?.username})
        const authorRef = {
            _type: "reference",
            _ref: author._id,
        }
        if (file && file.size > 0) {
            const asset = await client.assets.upload("image", file, {
                filename: file.name,
            });
            const imageRef = {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: asset._id,
                },
            }
            await client.create(
                { 
                    _type: "post",
                    title,
                    description,
                    slug: {current: slug, _type: "slug"},
                    image: imageRef,
                    content: content,
                    category: category,
                    views: 0,
                    likes: 0,
                    author: authorRef,
                }
            )
        }
        else {
            await client.create(
                { 
                    _type: "post",
                    title: title,
                    description: description,
                    slug: {current: slug, _type: "slug"},
                    content: content,
                    category: category,
                    views: 0,
                    likes: 0,
                    author: authorRef,
                }
            )
        }
        return {type: "success", message: "Post created successfully.", username: session.user.username};
    } catch (error) {
        console.error("Error creating new post:", error);
        return {type: "fail", message: "Error creating post."};
    }
}
export { createNewPost };
