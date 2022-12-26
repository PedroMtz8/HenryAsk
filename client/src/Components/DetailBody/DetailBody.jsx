import './styles.scss'

import { EditorContent, useEditor } from '@tiptap/react'
import TextAlign from '@tiptap/extension-text-align'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'

export default ({ body }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Underline,
            Image,
        ],
        content: body,
        editable: false,
    })

    return (
        <div>
            <EditorContent editor={editor} />
        </div>
    )
}