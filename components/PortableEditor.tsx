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
//import { Selection } from "@tiptap/extensions"
//import { TaskItem, TaskList } from "@tiptap/extension-list"
//import { TextAlign } from "@tiptap/extension-text-align"
//import { Typography } from "@tiptap/extension-typography"


const PortableEditor = ({content}: {content: any}) => {
    const parsedContent = typeof content === "string" ? JSON.parse(content) : content;
    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text,
            StarterKit,
            Highlight,
            Subscript,
            Superscript,
            Image,
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
