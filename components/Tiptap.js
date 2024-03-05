'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import { useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import styles from '../styles/Editor.module.css';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import CustomHighlightExtension from './Tiptap_custom_extensions/Highlight_extension';

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
      Underline,
      BulletList,
      CustomHighlightExtension,
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

  // HANDLE LLM STATES
  useEffect(() => {
    const highlightText = (excerpt, color, hoverTitle, hoverContent) => {
      const searchText = excerpt;
      editor.state.doc.descendants((node, pos) => {
        if (node.isText && node.text.includes(searchText)) {
          const startIndex = node.text.indexOf(searchText) + pos;
          const endIndex = startIndex + searchText.length;

          editor.chain().focus().setTextSelection({ from: startIndex, to: endIndex })
            .setMark('customHighlight', { highlightColor: color, hoverTitle, hoverContent })
            .run();
        }
      });
    };

    if (llmAnswer) {
      for (let assistant in llmAnswer) {
        assistant.forEach(item => {
          highlightText(item.excerpt, 'yellow', `Devil's advocate`, item.proposition);
      })
    }
  }

    // llmAnswer && llmAnswer.forEach(item => {
    //   highlightText(item.excerpt, 'yellow', `Devil's advocate`, item.proposition);
    // });
  }, [llmAnswer]);

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
          {llmAnswer && <div>{JSON.stringify(llmAnswer, null, 2)}</div>}
        </div>
      </div>
    </div>
  )
}

export default Tiptap