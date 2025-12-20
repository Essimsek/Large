"use client";
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import React from 'react'

import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Selection } from "@tiptap/extensions"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"

// Import the same CSS files as SimpleEditor
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/heading-node/heading-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"
import "@/components/tiptap-templates/simple/simple-editor.scss"

const PortableEditor = ({content}: {content: string | Object }) => {
    const parsedContent = typeof content === "string" ? JSON.parse(content) : content;
    const editor = useEditor({
        extensions: [
            StarterKit,
            Highlight,
            Paragraph,
            Text,
            Document,
            Image,
            Subscript,
            Superscript,
            Typography,
            Selection,
            TaskItem,
            TaskList,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: parsedContent,
        editable: false,
        immediatelyRender: false
    });
    if (!editor) return <p>Loading editor...</p>;
    return (
        <EditorContent editor={editor} />
    );
}

export default PortableEditor;
