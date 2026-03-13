"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { publishPost, unpublishPost } from "@/sanity/lib/publish-post";
import { Globe, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function PublishPostButton({
    postId,
    isPublished,
}: {
    postId: string;
    isPublished: boolean;
}) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    function handleClick() {
        startTransition(async () => {
            const result = isPublished
                ? await unpublishPost(postId)
                : await publishPost(postId);
            if (result.success) {
                toast.success(result.message);
                router.refresh();
            } else {
                toast.error(result.message);
            }
        });
    }

    return (
        <Button
            onClick={handleClick}
            disabled={isPending}
            className="w-full justify-between !bg-transparent hover:!bg-blue-400"
        >
            {isPending
                ? "..."
                : isPublished
                  ? "Unpublish"
                  : "Publish"}
            {isPublished ? <EyeOff size={16} /> : <Globe size={16} />}
        </Button>
    );
}
