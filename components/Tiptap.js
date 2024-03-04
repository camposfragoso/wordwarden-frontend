'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import { useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';
import styles from '../styles/Editor.module.css';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList
    ],
    content: '<h1>This is a title</h1><p>Hello World! 🌎️</p>',
  })

  useEffect(() => {
    if (editor) {
      const handler = () => {
        console.log(editor.getJSON()) // Récupère le contenu sous forme de HTML à chaque changement
      }
      editor.on('update', handler)
      return () => {
        editor.off('update', handler) // Nettoie le gestionnaire d'événements lors du démontage du composant
      }
    }
  }, [editor])

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
      <EditorContent editor={editor} className={styles.editor}/>
    </div>
  )
}

export default Tiptap