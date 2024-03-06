'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import { useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import styles from '../styles/Editor.module.css';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import { CustomHighlight } from './Tiptap_custom_extensions/Highlight_extension';
// create function that defines if text has changed enough to be sent - NE PAS LE FAIRE CE SOIR

// ---------------------------------------------
// TO DO
// button to send tiptap object --DONE
// display tiptap object sent --DONE
// display llm answer --DONE
// overline llm response sentence --DONE
// ---------------------------------------------


const Tiptap = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(null);
  const [llmAnswer, setLlmAnswer] = useState(null);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      BulletList,
      CustomHighlight,
    ],
    content: '<p>Start writing here</p>',
  })

  // HANDLE WRITING
  useEffect(() => {
    if (editor) {
      const handler = () => {
        console.log(editor.getText())
        setContent(editor.getText())
        // setContent(editor.getJSON().content)
      }
      editor.on('update', handler)
      return () => {
        editor.off('update', handler) // Nettoie le gestionnaire d'événements lors du démontage du composant
      }
    }
  }, [editor, content])

  // HANDLE SEND BUTTON -- DEV
  const handleSendClick = async() => {
    console.log(content)
    const response = await fetch('http://localhost:3000/mistral', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ answer: content }),
      // user: 1,
    });

    const data = await response.json();
    console.log(data)
    setLlmAnswer(data);
  }
  

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
      <div className={styles.titleContainer}>
        <label for='title'>Title (not useful for now) : </label>
        <input onChange={(e) => setTitle(e.target.value)} value={title} name='title' />
      </div>

      <EditorContent editor={editor} className={styles.editor}/>

      <div className={styles.separator}>Lorem</div>
      <div className={styles.answerContainer}>
        <div className={styles.prompt}>
          {/* {content && <div>{content.map(item => <div>{JSON.stringify(item, null, 2)}</div>)}</div>} */}
          {content && <div>{JSON.stringify(content, null, 2)}</div>}
          <button onClick={handleSendClick}>SEND</button>
        </div>
        <div className={styles.verticalSeparator}>Lorem</div>
        <div className={styles.answer}>
        {llmAnswer && (
  <div>
    <h2>Devil</h2>
    {llmAnswer.devil.map((item, index) => (
      <div key={index}>
        <p><strong>Excerpt:</strong> {item.excerpt}</p>
        <p><strong>Proposition:</strong> {item.proposition}</p>
        <p><strong>Importance:</strong> <span style={{color: item.importance > 8 ? 'green' : 'red'}}>{item.importance}</span></p>
      </div>
    ))}

    <h2>Sum</h2>
    {llmAnswer.sum.map((item, index) => (
      <div key={index}>
        <p><strong>Excerpt:</strong> {item.excerpt}</p>
        <p><strong>Proposition:</strong> {item.proposition}</p>
        <p><strong>Importance:</strong> <span style={{color: item.importance > 8 ? 'green' : 'red'}}>{item.importance}</span></p>
      </div>
    ))}

  <h2>Elaborator</h2>
    {llmAnswer.elaborator.map((item, index) => (
      <div key={index}>
        <p><strong>Excerpt:</strong> {item.excerpt}</p>
        <p><strong>Proposition:</strong> {item.proposition}</p>
        <p><strong>Importance:</strong> <span style={{color: item.importance > 8 ? 'green' : 'red'}}>{item.importance}</span></p>
      </div>
    ))}
  </div>
)}

        </div>
      </div>
    </div>
  )
}

export default Tiptap