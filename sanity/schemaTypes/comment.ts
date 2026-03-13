import { MessageCircleIcon } from "lucide-react";
import { defineType, defineField } from "sanity";

export const comment = defineType({
    name: "comment",
    title: "Comment",
    type: "document",
    icon: MessageCircleIcon,
    fields: [
        defineField({
            name: "text",
            type: "text",
            validation: (Rule) => Rule.required().max(500),
        }),
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
            text: "text",
        },
        prepare({ authorName, text }) {
            return {
                title: authorName || "Unknown",
                subtitle: text?.substring(0, 80) || "",
            };
        },
    },
});
