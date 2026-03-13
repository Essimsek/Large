"use server";

import { client } from "./client";
import { auth } from "@/auth";
import { GET_AUTHOR_ID_BY_USERNAME_QUERY } from "./queries";

export async function createComment(
    postId: string,
    text: string
): Promise<{ success: boolean; message: string }> {
    const session = await auth();
    if (!session?.user?.username) {
        return { success: false, message: "Not authenticated" };
    }

    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 500) {
        return { success: false, message: "Comment must be 1-500 characters" };
    }

    try {
        const author = await client.fetch(GET_AUTHOR_ID_BY_USERNAME_QUERY, {
            username: session.user.username,
        });
        if (!author?._id) {
            return { success: false, message: "Author not found" };
        }

        await client.create({
            _type: "comment",
            text: trimmed,
            author: { _type: "reference", _ref: author._id },
            post: { _type: "reference", _ref: postId },
        });

        return { success: true, message: "Comment added" };
    } catch (error) {
        console.error("Error creating comment:", error);
        return { success: false, message: "Failed to add comment" };
    }
}

export async function deleteComment(
    commentId: string
): Promise<{ success: boolean; message: string }> {
    const session = await auth();
    if (!session?.user?.username) {
        return { success: false, message: "Not authenticated" };
    }

    try {
        const comment = await client.fetch<{ authorUsername: string } | null>(
            `*[_type == "comment" && _id == $commentId][0]{ "authorUsername": author->username }`,
            { commentId }
        );

        if (!comment) {
            return { success: false, message: "Comment not found" };
        }

        if (comment.authorUsername !== session.user.username) {
            return { success: false, message: "Not authorized" };
        }

        await client.delete(commentId);
        return { success: true, message: "Comment deleted" };
    } catch (error) {
        console.error("Error deleting comment:", error);
        return { success: false, message: "Failed to delete comment" };
    }
}
