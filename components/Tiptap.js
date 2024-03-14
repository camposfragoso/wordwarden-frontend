import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import Placeholder from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document';
import { useState, useRef, useEffect } from 'react';
import AssistantsBar from './AssistantsBar';
import StarterKit from '@tiptap/starter-kit';
import styles from '../styles/Tiptap.module.css';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import AssistantMark from './Tiptap_custom_extensions/AssistantMark';
import CharacterCount from '@tiptap/extension-character-count';
import { HoverExtension } from './Tiptap_custom_extensions/AddHoverEvent';
import { HighlightCustom } from './Tiptap_custom_extensions/HighlightCustomExtension';
import { replaceText, setAllHightlights, unsetAllHighlights } from '../modules/tiptap';
import ThreadCard from './ThreadCard';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { loadFile } from '../reducers/files';


const CustomDocument = Document.extend({
  content: 'heading block*',
})
// TODO 
// When file saving, save assistants and minImportance (which is used to deactivate all assistants if set to 11)

const Tiptap = () => {

  const dispatch = useDispatch()

  const user = useSelector(state => state.users.value)
  const files = useSelector(state => state.files.value)

  // const [involvedAssistants, setInvolvedAssistants] = useState(['sum', 'dev', 'ela']);
  const [assistants, setAssistants] = useState(['dev', 'sum', 'ela', 'chi', 'sen']);
  const [activeAssistants,setActiveAssistants] = useState([]);
  const [minImportance, setMinImportance] = useState(1);
  const [llmAnswer, setLlmAnswer] = useState({});
  const [threadDiv, setThreadDiv] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousWordCountRef = useRef(null);

  useEffect(() => {
    if (editor) {
      if (files.content === undefined) {
        // Clear the editor
        editor.commands.setContent('');
      } else {
        // Set to the provided content
        editor.commands.setContent(files.content);
      }
    }
  }, [files, editor]);
  

  useEffect(() => {
    if (llmAnswer && editor) {
      // Set active assistants (intervening on text)
      Object.entries(llmAnswer).forEach(([assistant, content]) => {
        setActiveAssistants(currentActiveAssistants => {
          if (!currentActiveAssistants.includes(assistant) && content.length > 0 && assistants.includes(assistant)) {
            return [...currentActiveAssistants, assistant];
          } else {
            return [...currentActiveAssistants];
          }
        });
      });
  
      setAllHightlights(editor, assistants, llmAnswer, minImportance);
    }
  }, [llmAnswer, assistants, minImportance, editor]);

  // Get attributes from event.target
  const getAllAttributes = (element) => {
    const attributes = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      if (assistants.includes(attr.name)) attributes[attr.name] = attr.value;
    }
    return attributes;
  };

  const callAssistants = async (content) => {
    setLoading(true);

    let results = {}
    for (let assistant of assistants) {
      
      console.log('calling for : ' + assistant)
      const url = `http://localhost:3000/llm/openai/${assistant}`
      
      const config = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 
          input: content }),
      }

      const answer = await fetch(url, config).then(response => response.json());

      console.log(`SUCCESS !!! ✅✅✅✅ HERE IS ${assistant} : ${JSON.stringify(answer)}`)

      results[assistant] = answer[assistant]
    }

    console.log('SUCCESS !!! ✅✅✅✅ HERE is the final result : ' + JSON.stringify(results))

    
    if (llmAnswer) {
      let llmAnswerExcerpts = new Set();

      Object.values(llmAnswer).forEach(categories => {
         categories.forEach(entry => {
         llmAnswerExcerpts.add(entry.excerpt);
         });
      });
  
      let newLlmAnswer = Object.keys(llmAnswer).reduce((acc, key) => {
        acc[key] = [...llmAnswer[key]];
    
        results[key]?.forEach(entry => {
          if (!llmAnswerExcerpts.has(entry.excerpt)) {
            acc[key].push(entry);
          }
        });
    
        return acc;
      }, {});
    
      setLlmAnswer(newLlmAnswer);
      setLoading(false);
    } else {
      setLlmAnswer(results);
      setLoading(false);
    }
    
  };

  // Thread button Close
  const closeThread = (assistant, excerpt, proposition) => {
    setLlmAnswer(previous => {
      console.log(previous)
      const newLlmAnswer = previous
      const assistantData = previous[assistant].filter((item) => item.excerpt !== excerpt)
      newLlmAnswer[assistant] = assistantData;

      unsetAllHighlights(editor)
      setAllHightlights(editor, assistants, newLlmAnswer, minImportance)

      return newLlmAnswer
    })

    setThreadDiv(prevThreadDiv => prevThreadDiv.filter((thread) => thread.proposition !== proposition));
  };

  // Thread button Replace
  const replaceThread = (assistant, excerpt, proposition) => {
    setLlmAnswer(previous => {
      console.log(previous)
      const newLlmAnswer = previous
      const assistantData = previous[assistant].filter((item) => item.excerpt !== excerpt)
      newLlmAnswer[assistant] = assistantData;
      return newLlmAnswer
    })

    replaceText(editor, excerpt, proposition)

    setThreadDiv(prevThreadDiv => prevThreadDiv.filter((thread) => thread.proposition !== proposition));
  };

  // Handle assistants activation/deactivation from bar
  const setAssistantsFromBar = (assistantId) => {
    // Activate / deactivate
    setAssistants(currentAssistants => {
      if (currentAssistants.includes(assistantId)) {
        unsetAllHighlights(editor)
        const newAssistants = currentAssistants.filter((assistant) => assistant != assistantId)
        setAllHightlights(editor, newAssistants, llmAnswer, minImportance)
        return newAssistants
      } else {
        unsetAllHighlights(editor)
        setAllHightlights(editor, [...currentAssistants, assistantId], llmAnswer, minImportance)
        return [...currentAssistants, assistantId]
      } 
    })
  };

  const saveFile = async (id, input) => {

    console.log('getting' + id)


      const content = input
      const title = input.content[0].content[0].text && input.content[0].content[0].text

      const url = `http://localhost:3000/files/`

      const config = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          token: user.token,
          id,
          title,
          content }),
      }

      const answer = await fetch(url, config).then(response => response.json());
    
      console.log(answer)

      if (answer.update) { dispatch(loadFile({ id, content})) } else {  dispatch(loadFile({ id: answer.data._id, content}))}
      
     
    
  }

    // Editor with events
    const editor = useEditor({ onCreate({editor}) {


      if (llmAnswer) {

        console.log(editor.getJSON())
  
        // Set active assistants (intervening on text)
        Object.entries(llmAnswer).forEach(([assistant, content]) => setActiveAssistants(currentActiveAssistants => {
          if (!currentActiveAssistants.includes(assistant) && content.length > 0 && assistants.includes(assistant)) {
            return [...currentActiveAssistants, assistant]
          } else {
            return [...currentActiveAssistants]
          }
        }))
    
        setAllHightlights(editor, assistants, llmAnswer, minImportance);
      }
    },
      onUpdate({ editor }) {
 
      const newWordCount = editor.storage.characterCount.words();

      if (newWordCount === 0) {
        setLlmAnswer(null)
        setThreadDiv([])
        setActiveAssistants([])
      }

      if (user.token && newWordCount > 0) {
        saveFile(files.id, editor.getJSON())
      }
  
      if (previousWordCountRef.current === null) {
        previousWordCountRef.current = newWordCount;
      }
      
      const previousWordCount = previousWordCountRef.current;
      const wordCountChangeThreshold = 50;
  
      if ((newWordCount - previousWordCount) >= wordCountChangeThreshold) {
        callAssistants(editor.getText());  
      }
  
      // Update the previous word count for the next comparison
      previousWordCountRef.current = newWordCount;
  
     },
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
        Underline,
        BulletList,
        HighlightCustom,
        AssistantMark,
        CharacterCount,
        // event handle extension
        HoverExtension.configure({
  
          onMouseOver: (view, event) => {
            const attributes = getAllAttributes(event.target);
            const excerpt = event.target.textContent;
          
            Object.entries(attributes).forEach(([assistant, proposition]) => {
              setThreadDiv(prevThreadDiv => {
                const index = prevThreadDiv.findIndex(thread => thread.assistant === assistant && thread.proposition === proposition);
          
                if (index !== -1) {
                  return prevThreadDiv;
                } else {
                  return [ { assistant, proposition, excerpt, hover: true, clicked: false }, ...prevThreadDiv];
                }
              });
            });
          },
  
          onMouseOut: (view, event) => {
  
            const attributes = getAllAttributes(event.target);
  
            Object.entries(attributes).forEach(([assistant, proposition]) => {
              setThreadDiv(currentThreads =>
                currentThreads.map(thread =>
                  thread.assistant === assistant && thread.proposition === proposition
                    ? { ...thread, hover: false }
                    : thread
                ).filter(thread => thread.clicked || thread.hover)
              );
            });
          },
  
          onClick: (view, event) => {
            const attributes = getAllAttributes(event.target);
            const excerpt = event.target.textContent;
          
            Object.entries(attributes).forEach(([assistant, proposition]) => {
              setThreadDiv(currentThreads =>
                currentThreads.map(thread =>
                  thread.assistant === assistant && thread.proposition === proposition
                    ? { ...thread, clicked: true, excerpt }
                    : thread
                )
              );
            });
          }
          
        }),
      ],
      content: files.content,
    });

  return (
    <>
      <div className={styles.container}>
        {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
          <div className={styles.menu}>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`${styles.menuButton} ${styles.heading1} ${editor.isActive('heading2') ? 'is-active' : ''}`}
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`${styles.menuButton} ${styles.heading2} ${editor.isActive('heading2') ? 'is-active' : ''}`}
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().setParagraph().run()}
              className={`${styles.menuButton} ${styles.paragraph} ${editor.isActive('heading2') ? 'is-active' : ''}`}
            >
              p
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`${styles.menuButton} ${styles.bold} ${editor.isActive('heading2') ? 'is-active' : ''}`}
            >
              B
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`${styles.menuButton} ${styles.italic} ${editor.isActive('heading2') ? 'is-active' : ''}`}
            >
              I
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`${styles.menuButton} ${styles.underline} ${editor.isActive('heading2') ? 'is-active' : ''}`}
            >
              U
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`${styles.menuButton} ${styles.bullet} ${editor.isActive('heading2') ? 'is-active' : ''}`}
            >
              ●
            </button>
          </div>
        </BubbleMenu>}
        <Navbar 
          wordsCount={editor?.storage.characterCount.words()}
          charactersCount={editor?.storage.characterCount.characters()}
        />
        <EditorContent onClick={() => editor.commands.focus()} editor={editor} className={styles.editor}/>
        <div className={styles.threadDiv}>
          {threadDiv && threadDiv.map(thread => {return (
            <ThreadCard 
              key={thread.proposition}
              assistant={thread.assistant}
              excerpt={thread.excerpt}
              proposition={thread.proposition}
              hover={thread.hover}
              clicked={thread.clicked}
              replaceThread={replaceThread}
              closeThread={closeThread}
            />
          )})}
        </div>
        
        <AssistantsBar 
        assistants={assistants} 
        activeAssistants={activeAssistants} 
        setAssistantsInBar={setAssistantsFromBar}
        className={styles.assistantsBar}
        loading={loading}
      />
      </div>
      <div onClick={() => dispatch(loadFile({id: undefined, content: undefined}))} className={styles.addButton}>
        <h1>
          +
        </h1>
      </div>
    </>
  )
}

export default Tiptap