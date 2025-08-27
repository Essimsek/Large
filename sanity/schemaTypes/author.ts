import { UserIcon } from "lucide-react";
import { defineType, defineField } from "sanity";

export const author = defineType({
    name: "author",
    title: "Author",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "name",
            type: "string",
        }),
        defineField({
            name: "username",
            type: "string",
        }),
        defineField({
            name: "image",
            type: "image",
        }),
        defineField({
            name: "email",
            type: "string",
        }),
        defineField({
            name: "bio",
            type: "text",
        }),
        defineField({
            name: "id",
            type: "number",
            validation: Rule => Rule.required(),
        })
        
    ],
    preview: {
        select: {
            title: "name",
        }
    }
});
