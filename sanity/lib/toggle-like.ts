"use server";

import { client } from "./client";
import { auth } from "@/auth";
import { GET_AUTHOR_ID_BY_USERNAME_QUERY } from "./queries";
import { rateLimit } from "@/lib/rate-limit";

export async function toggleLike(postId: string): Promise<{ liked: boolean; likeCount: number }> {
    const session = await auth();
    if (!session?.user?.username) {
        throw new Error("Not authenticated");
    }
    if (!rateLimit(`like:${session.user.username}`, 30, 60 * 1000)) {
        throw new Error("Too many likes. Slow down.");
    }

    const author = await client.fetch(GET_AUTHOR_ID_BY_USERNAME_QUERY, {
        username: session.user.username,
    });
    if (!author?._id) {
        throw new Error("Author not found");
    }

    const authorId = author._id;

    const existingLike = await client.fetch<{ _id: string } | null>(
        `*[_type == "like" && author._ref == $authorId && post._ref == $postId][0]{ _id }`,
        { authorId, postId }
    );

    if (existingLike) {
        await client
            .transaction()
            .delete(existingLike._id)
            .patch(postId, (p) => p.dec({ likes: 1 }))
            .commit();

        const likeCount = await client.fetch<number>(
            `*[_type == "post" && _id == $postId][0].likes`,
            { postId }
        );
        return { liked: false, likeCount: likeCount ?? 0 };
    }

    await client
        .transaction()
        .create({
            _type: "like",
            author: { _type: "reference", _ref: authorId },
            post: { _type: "reference", _ref: postId },
        })
        .patch(postId, (p) => p.inc({ likes: 1 }))
        .commit();

    const likeCount = await client.fetch<number>(
        `*[_type == "post" && _id == $postId][0].likes`,
        { postId }
    );
    return { liked: true, likeCount: likeCount ?? 0 };
}
