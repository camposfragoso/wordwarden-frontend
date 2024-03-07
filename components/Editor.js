import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import styles from '../styles/Test.module.css';


const CustomDocument = Document.extend({
  content: 'heading block*',
})

export default () => {
  const editor = useEditor({
    extensions: [
      CustomDocument,
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?'
          }

          return 'Can you add some further context?'
        },
      }),
    ],
    content: `
      <h1>
        It’ll always have a heading …
      </h1>
      <p>
        … if you pass a custom document. That’s the beauty of having full control over the schema.
      </p>
    `,
  })

  return (
    <div className={styles.container}>
      <EditorContent editor={editor} className={styles.editor}/>
          <div className={styles.threadDiv}>
            <div className={styles.threadCard}></div>
            <div className={styles.threadCard}></div>
            <div className={styles.threadCard}></div>
            <div className={styles.threadCard}></div>

            <div className={styles.threadCard}></div>

            <div className={styles.threadCard}></div>

            <div className={styles.threadCard}></div>

            <div className={styles.threadCard}></div>

            <div className={styles.threadCard}></div>

          </div>
    </div>
  )
}