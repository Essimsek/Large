import { client } from "@/sanity/lib/client";
import { GET_COMMENTS_BY_POST } from "@/sanity/lib/queries";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { MessageCircle } from "lucide-react";

type CommentSectionProps = {
    postId: string;
    currentUsername?: string | null;
};

export default async function CommentSection({ postId, currentUsername }: CommentSectionProps) {
    const comments = await client.fetch(GET_COMMENTS_BY_POST, { postId });

    return (
        <div className="mt-10 pt-8 border-t border-border/50">
            <h3 className="flex items-center gap-2 text-lg font-bold mb-6">
                <MessageCircle size={20} />
                Comments
                <span className="text-sm font-normal text-muted-foreground">({comments?.length ?? 0})</span>
            </h3>

            {currentUsername ? (
                <CommentForm postId={postId} />
            ) : (
                <p className="text-sm text-muted-foreground mb-4 p-4 bg-muted/30 rounded-xl text-center">Sign in to leave a comment.</p>
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
                    <p className="text-muted-foreground italic text-sm text-center py-8">No comments yet. Be the first to share your thoughts!</p>
                )}
            </div>
        </div>
    );
}
