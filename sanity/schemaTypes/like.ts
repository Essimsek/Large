import { HeartIcon } from "lucide-react";
import { defineType, defineField } from "sanity";

export const like = defineType({
    name: "like",
    title: "Like",
    type: "document",
    icon: HeartIcon,
    fields: [
        defineField({
            name: "author",
            type: "reference",
            to: { type: "author" },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "post",
            type: "reference",
            to: { type: "post" },
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            authorName: "author.name",
            postTitle: "post.title",
        },
        prepare({ authorName, postTitle }) {
            return {
                title: `${authorName || "Unknown"} liked ${postTitle || "Unknown"}`,
            };
        },
    },
});
