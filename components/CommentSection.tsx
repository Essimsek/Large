import { client } from "@/sanity/lib/client";
import { GET_COMMENTS_BY_POST } from "@/sanity/lib/queries";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

type CommentSectionProps = {
    postId: string;
    currentUsername?: string | null;
};

export default async function CommentSection({ postId, currentUsername }: CommentSectionProps) {
    const comments = await client.fetch(GET_COMMENTS_BY_POST, { postId });

    return (
        <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">
                Comments ({comments?.length ?? 0})
            </h3>

            {currentUsername ? (
                <CommentForm postId={postId} />
            ) : (
                <p className="text-sm text-gray-500 mb-4">Sign in to leave a comment.</p>
            )}

            <div className="mt-6 space-y-3">
                {comments && comments.length > 0 ? (
                    comments.map((comment) => (
                        <CommentItem
                            key={comment._id}
                            comment={comment}
                            isOwner={currentUsername === comment.author?.username}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 italic text-sm">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
}
