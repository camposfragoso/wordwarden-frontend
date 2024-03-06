import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import { useEffect, useState } from 'react';
import StarterKit from '@tiptap/starter-kit';
import styles from '../styles/Editor.module.css';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import Highlight from '@tiptap/extension-highlight';
import AssistantMark from './Tiptap_custom_extensions/AssistantMark';
import PropositionMark from './Tiptap_custom_extensions/PropositionMark';

const Tiptap = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('Our planet is getting hotter. Since the Industrial Revolution—an event that spurred the use of fossil fuels in everything from power plants to transportation—Earth has warmed by 1 degree Celsius, about 2 degrees Fahrenheit.  That may sound insignificant, but 2023 was the hottest year on record, and all 10 of the hottest years on record have occurred in the past decade.  Global warming and climate change are often used interchangeably as synonyms, but scientists prefer to use “climate change” when describing the complex shifts now affecting our planet’s weather and climate systems.  Climate change encompasses not only rising average temperatures but also natural disasters, shifting wildlife habitats, rising seas, and a range of other impacts. All of these changes are emerging as humans continue to add heat-trapping greenhouse gases, like carbon dioxide and methane, to the atmosphere.');

  const [llmAnswer, setLlmAnswer] = useState({ "devil": [ { "excerpt": "Since the Industrial Revolution—an event that spurred the use of fossil fuels in everything from power plants to transportation—Earth has warmed by 1 degree Celsius, about 2 degrees Fahrenheit.", "proposition": "The Industrial Revolution's reliance on fossil fuels may not be the sole cause of Earth's temperature increase, as natural climate fluctuations could also play a significant role.", "importance": "8" }, { "excerpt": "2023 was the hottest year on record, and all 10 of the hottest years on record have occurred in the past decade.", "proposition": "The recent spike in global temperatures could be a temporary fluctuation rather than a long-term trend, and other factors such as solar activity might contribute to this increase.", "importance": "7" }, { "excerpt": "Climate change encompasses not only rising average temperatures but also natural disasters, shifting wildlife habitats, rising seas, and a range of other impacts.", "proposition": "The term 'climate change' is overly broad and misleading, as it implies that all these impacts are directly caused by human-induced global warming. Some may be naturally occurring phenomena unrelated to greenhouse gas emissions.", "importance": "6" } ], "sum": [ { "excerpt": "Our planet is getting hotter.", "proposition": "The Earth's temperature is rising.", "importance": "8" }, { "excerpt": "2023 was the hottest year on record, and all 10 of the hottest years on record have occurred in the past decade.", "proposition": "The last decade had the 10 hottest years on record.", "importance": "9" }, { "excerpt": "Global warming and climate change are often used interchangeably as synonyms, but scientists prefer to use “climate change” when describing the complex shifts now affecting our planet’s weather and climate systems.", "proposition": "Scientists differentiate between global warming and climate change.", "importance": "7" }, { "excerpt": "Climate change encompasses not only rising average temperatures but also natural disasters, shifting wildlife habitats, rising seas, and a range of other impacts.", "proposition": "Climate change includes various effects like temperature rise, natural disasters, habitat shifts, and sea level rise.", "importance": "9" }, { "excerpt": "All of these changes are emerging as humans continue to add heat-trapping greenhouse gases, like carbon dioxide and methane, to the atmosphere.", "proposition": "Climate change results from human addition of greenhouse gases.", "importance": "8" } ] });
  
  const [showHighLightMenu, setShowHighlightMenu] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList,
      Highlight.configure({
        multicolor: true,
      }),
      AssistantMark,
      PropositionMark,
    ],
    content,
  })

  

  // HANDLE MENU SHOWN
  useEffect(() => {
    if (!editor) return;
    const updateMenuVisibility = () => {
      setShowHighlightMenu(editor.isActive('highlight'));
    };

    editor.on('selectionUpdate', updateMenuVisibility);

    return () => {
      editor.off('selectionUpdate', updateMenuVisibility);
    };
  }, [editor]);


  // HANDLE WRITING
  useEffect(() => {
    if (editor) {
      const handler = () => {
        // console.log(editor.getText())
        setContent(editor.getText())
        console.log(editor.getJSON())
        // setContent(editor.getJSON())
      }
      editor.on('update', handler)
      return () => {
        editor.off('update', handler)
      }
    }
  }, [editor, content])

  // HANDLE SEND BUTTON -- DEV
  const handleSendClick = async() => {
    // console.log(content)
    const response = await fetch('http://localhost:3000/mistral', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ answer: content }),
      // user: 1,
    });

    const data = await response.json();
    console.log(data)
    Object.entries(data).forEach((item) => {
      console.log(item)
    })
    setLlmAnswer(data);
  }

  // HANDLE LLM STATES
  useEffect(() => {
    const highlightText = (excerpt, color, proposition, assistant) => {
      const searchText = excerpt;
      editor.state.doc.descendants((node, pos) => {
        if (node.isText && node.text.includes(searchText)) {
          const startIndex = node.text.indexOf(searchText) + pos;
          const endIndex = startIndex + searchText.length;
  
          editor.chain().focus().setTextSelection({ from: startIndex, to: endIndex })
            .setMark('assistantMark', { assistant })
            .setMark('propositionMark', { proposition })
            .setHighlight({ color })
            .run();
        }
      });
    };
  
    if (llmAnswer && editor) {
      Object.entries(llmAnswer).forEach(([assistant, content]) => {
        let colors = { 'devil': '#E6379F', "sum": '#40E637' }
        // console.log('content:', content);
        content.forEach(item => {
          item.importance >= 8 && highlightText(item.excerpt, colors[assistant], item.proposition, assistant);
        });
      });
    }
  }, [llmAnswer, editor]);

  return (
    <div className={styles.container}>
      {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        {!showHighLightMenu ? 
        <><button
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
        </button></>
        :
        <div style={{backgroundColor: "pink"}}>
          <h2>{editor.getAttributes('assistantMark').assistant}</h2>
          <p>{editor.getAttributes('propositionMark').proposition}</p>
        </div>}
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