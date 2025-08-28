"use server"

import { client } from "./client";
import { checkExistingSlug } from "@/sanity/lib/generate-slug";
import { auth } from "@/auth";
import { GET_AUTHOR_ID_BY_USERNAME_QUERY } from "./queries";

async function createNewPost({data}: {data: FormData}) {
    const session = await auth();
    if (!session || !session?.user) {
        console.log("User not authenticated. Cannot create post.");
        return;
    }
    const title = data.get('post-title') as string
    const description = data.get('post-description') as string
    const file = data.get('post-thumbnail') as File
    const slug = await checkExistingSlug(title)
    const content = data.get('post-content')
    const category = data.get('post-category') as string
    try {
        const author = await client.fetch(GET_AUTHOR_ID_BY_USERNAME_QUERY, {username: session.user?.username})
        let post = undefined;
        const authorRef = {
            _type: "reference",
            _ref: author._id,
        }
        if (file) {
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
            post = await client.create(
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
            post = await client.create(
                { 
                    _type: "post",
                    title: title,
                    description: description,
                    slug: {current: slug, _type: "slug"},
                    content: content,
                    category: content,
                    views: 0,
                    likes: 0,
                    author: authorRef,
                }
            )
        }
        console.log("Post created successfully:", post);
    } catch (error) {
        console.error("Error creating new post:", error); 
    }
}
export { createNewPost };
