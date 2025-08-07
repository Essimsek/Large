import { ImageIcon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
    name: "post",
    title: "Post",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 100,
            }
        }),
        defineField({
            name: "author",
            type: "reference",
            to: { type: "author" },
        }),
        defineField({
            name: "description",
            type: "text",
        }),
        defineField({
            name: "category",
            type: "string",
            validation: (Rule) => Rule.required().min(1).max(20).error("please enter a category"),
        }),
        defineField({
            name: "image",
            type: "url",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "views",
            type: "number",
        }),
        defineField({
            name: "likes",
            type: "number",
        }),
        defineField({
        name: "pitch",
        type: "array",
        of: [
            // Text blocks (paragraphs, headings, etc.)
            defineArrayMember({
                type: "block",
                of: [],
                styles: [
                    { title: "Normal", value: "normal" },
                    { title: "H1", value: "h1" },
                    { title: "H2", value: "h2" },
                    { title: "H3", value: "h3" },
                    { title: "H4", value: "h4" },
                ],
                lists: [{ title: "Bullet", value: "bullet" }],
                marks: {
                    decorators: [
                    { title: "Strong", value: "strong" },
                    { title: "Emphasis", value: "em" },
                    ],
                    annotations: [
                    {
                        title: "URL",
                        name: "link",
                        type: "object",
                        fields: [
                        {
                            title: "URL",
                            name: "href",
                            type: "url",
                        },
                        ],
                    },
                    ],
                },
                }),
                // Images as standalone blocks (not nested in text)
                defineArrayMember({
                type: "image",
                options: { hotspot: true },
                icon: ImageIcon,
                fields: [
                    {
                    name: "alt",
                    type: "string",
                    title: "Alternative Text",
                    },
                ],
                }),
            ],
        })
    ]
})
