'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import { useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import styles from '../styles/Editor.module.css';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';

const Tiptap = () => {
  const [contentLength, setContentLength] = useState(0);
  const [title, setTitle] = useState('');
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList
    ],
    content: '<p>Start writing here</p>',
  })

  useEffect(() => {
    if (editor) {
      const handler = async() => {
        const length = editor.getJSON().content.length
        if (contentLength < length && editor.getJSON().content[length - 2].type === 'paragraph') {
          setContentLength(length)
          console.log(editor.getJSON())
          // const response = await fetch('http://localhost:3000/files', {
          //   method: 'POST',
          //   headers: { 'Content-type': 'application/json' },
          //   body: { title, content: editor.getJSON() },
          //   user: 1,
          // });

          // const data = await response.json();

          fetch('https://wordwarden-dev-db.vercel.app/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: { content: editor.getJSON() },
          })
          console.log(title)
        }
      }
      editor.on('update', handler)
      return () => {
        editor.off('update', handler) // Nettoie le gestionnaire d'événements lors du démontage du composant
      }
    }
  }, [editor, contentLength])

  return (
    <div className={styles.container}>
      {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          p
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          Bullet-List
        </button>
      </BubbleMenu>}
      <input onChange={(e) => setTitle(e.target.value)} value={title} />
      <EditorContent editor={editor} className={styles.editor}/>
    </div>
  )
}

export default Tiptap