"use server";

import { client } from "./client";
import { auth } from "@/auth";

async function verifyOwnership(postId: string, username: string): Promise<boolean> {
    const post = await client.fetch<{ authorUsername: string } | null>(
        `*[_type == "post" && _id == $postId][0]{ "authorUsername": author->username }`,
        { postId }
    );
    return post?.authorUsername === username;
}

export async function publishPost(postId: string) {
    const session = await auth();
    if (!session?.user?.username) {
        return { success: false, message: "Not authenticated" };
    }
    if (!(await verifyOwnership(postId, session.user.username))) {
        return { success: false, message: "Not authorized" };
    }
    await client.patch(postId).set({ status: "published" }).commit();
    return { success: true, message: "Post published" };
}

export async function unpublishPost(postId: string) {
    const session = await auth();
    if (!session?.user?.username) {
        return { success: false, message: "Not authenticated" };
    }
    if (!(await verifyOwnership(postId, session.user.username))) {
        return { success: false, message: "Not authorized" };
    }
    await client.patch(postId).set({ status: "draft" }).commit();
    return { success: true, message: "Post moved to drafts" };
}
