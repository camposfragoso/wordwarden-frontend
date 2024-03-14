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
import { useSelector } from 'react-redux';


const CustomDocument = Document.extend({
  content: 'heading block*',
})
// TODO 
// When file saving, save assistants and minImportance (which is used to deactivate all assistants if set to 11)

const Tiptap = () => {

  const user = useSelector(state => state.users.value)

  // const [involvedAssistants, setInvolvedAssistants] = useState(['sum', 'dev', 'ela']);
  const [assistants, setAssistants] = useState(['dev', 'sum', 'ela', 'chi', 'sen']);
  const [activeAssistants,setActiveAssistants] = useState([]);
  const [minImportance, setMinImportance] = useState(1);
  const [content, setContent] = useState({
    "type": "doc",
    "content": [
        {
            "type": "heading",
            "attrs": {
                "level": 1
            },
            "content": [
                {
                    "type": "text",
                    "text": "Social media"
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "Social media has had a profound impact on modern society. It has transformed the way we communicate, share information, and consume media. While it has brought about many positive changes, such as the democratization of information and increased connectivity, it has also had negative effects, such as the spread of misinformation and the amplification of hate speech. In this article, we will explore the impact of social media on society and the various ways in which it has shaped our lives. One of the most significant impacts of social media has been the way it has revolutionized communication. In the past, communication was largely one-to-one or one-to-many, with information being disseminated through traditional media channels such as newspapers and television. With social media, communication has become more interactive and immediate. People can now share their thoughts and experiences with a global audience in real-time, and receive instant feedback. This has led to a more connected world, where people can engage with one another on a scale never before possible. Social media has also transformed the way we consume media. In the past, people relied on traditional media channels such as newspapers and television to stay informed. Today, social media has become a primary source of news and information for many people. This has led to a democratization of information, where anyone with an internet connection can become a citizen journalist and share news and information with the world. However, this also means that there is a greater potential for the spread of misinformation, as there are no gatekeepers to verify the accuracy of the information being shared. Another impact of social media on society has been the way it has transformed marketing and advertising. Social media platforms have become a critical tool for businesses to reach their target audiences. With the ability to target specific demographics, businesses can create highly personalized marketing campaigns that are more effective than traditional advertising. This has led to a shift in the way businesses approach marketing, with social media becoming an essential component of any marketing strategy. However, social media has also had negative impacts on society. One of the most significant negative impacts has been the spread of misinformation. Social media platforms have become a breeding ground for fake news and conspiracy theories, which can spread rapidly and have real-world consequences. For example, misinformation about the COVID-19 vaccine has led to low vaccination rates and increased deaths from the virus. Social media has also been criticized for its impact on mental health. Studies have shown that social media use can lead to feelings of anxiety, depression, and loneliness. This is because social media often presents a distorted view of reality, with people presenting only their best selves and creating unrealistic expectations for others. This can lead to feelings of inadequacy and low self-esteem, particularly among young people. Finally, social media has had a significant impact on politics and social issues. Social media has become a platform for political activism, with movements such as Black Lives Matter and #MeToo gaining momentum through social media campaigns. However, social media has also been criticized for its role in the spread of hate speech and the radicalization of extremist groups. In conclusion, social media has had a profound impact on society, transforming the way we communicate, share information, and consume media. While it has brought about many positive changes, such as increased connectivity and democratization of information, it has also had negative effects, such as the spread of misinformation and the amplification of hate speech. As social media continues to evolve, it is essential to recognize both the positive and negative impacts it has on society and take steps to mitigate its negative effects."
                }
            ]
        }
    ]
});
  const [llmAnswer, setLlmAnswer] = useState({"dev":[{"excerpt":"Social media has had a profound impact on modern society. It has transformed the way we communicate, share information, and consume media.","proposition":"While social media has revolutionized communication and democratized information, it has also led to the spread of misinformation and amplification of hate speech, which can have real-world consequences.","importance":"8"},{"excerpt":"With social media, communication has become more interactive and immediate. People can now share their thoughts and experiences with a global audience in real-time, and receive instant feedback.","proposition":"While social media has made communication more interactive and immediate, it has also contributed to the spread of misinformation and the amplification of hate speech, which can have negative consequences on society.","importance":"7"},{"excerpt":"Social media has transformed the way we consume media. In the past, people relied on traditional media channels such as newspapers and television to stay informed. Today, social media has become a primary source of news and information for many people.","proposition":"While social media has democratized information by allowing anyone with an internet connection to share news and information, it has also led to the spread of misinformation without gatekeepers to verify accuracy.","importance":"9"},{"excerpt":"Social media platforms have become a critical tool for businesses to reach their target audiences. With the ability to target specific demographics, businesses can create highly personalized marketing campaigns that are more effective than traditional advertising.","proposition":"While social media has transformed marketing and advertising by allowing businesses to create highly personalized campaigns, it has also led to increased competition and the need for constant content creation, which can be challenging for small businesses.","importance":"6"},{"excerpt":"Social media has had a significant impact on politics and social issues. Social media has become a platform for political activism, with movements such as Black Lives Matter and #MeToo gaining momentum through social media campaigns.","proposition":"While social media has facilitated the growth of social movements and increased awareness of social issues, it has also been criticized for its role in the spread of hate speech and radicalization of extremist groups.","importance":"7"},{"excerpt":"Social media has also been criticized for its impact on mental health. Studies have shown that social media use can lead to feelings of anxiety, depression, and loneliness.","proposition":"While social media can contribute to feelings of anxiety, depression, and loneliness due to its distorted view of reality, it can also be a source of support and connection for individuals who may feel isolated in real life.","importance":"5"}],"sum":[{"excerpt":"Social media has had a profound impact on modern society.","proposition":"Social media greatly affects society","importance":"10"},{"excerpt":"It has transformed the way we communicate, share information, and consume media.","proposition":"Social media changed communication, info sharing, and media consumption","importance":"9"},{"excerpt":"While it has brought about many positive changes, such as the democratization of information and increased connectivity, it has also had negative effects, such as the spread of misinformation and the amplification of hate speech.","proposition":"Positive impacts: info democritization, connectivity; Negative impacts: misinfo spread, hate amplification","importance":"9"},{"excerpt":"In the past, communication was largely one-to-one or one-to-many, with information being disseminated through traditional media channels such as newspapers and television.","proposition":"Past: limited comms, one-to-one/one-to-many, traditional media","importance":"8"},{"excerpt":"With social media, communication has become more interactive and immediate. People can now share their thoughts and experiences with a global audience in real-time, and receive instant feedback.","proposition":"Social media: interactive, immediate comms, global audience, instant feedback","importance":"8"},{"excerpt":"Social media has also transformed the way we consume media.","proposition":"Social media changed media consumption","importance":"8"},{"excerpt":"Today, social media has become a primary source of news and information for many people.","proposition":"Social media: primary news source for many","importance":"7"},{"excerpt":"This has led to a democratization of information, where anyone with an internet connection can become a citizen journalist and share news and information with the world.","proposition":"Democratized info: anyone, int net, citizen journalism","importance":"7"},{"excerpt":"However, this also means that there is a greater potential for the spread of misinformation, as there are no gatekeepers to verify the accuracy of the information being shared.","proposition":"Potential misinfo spread: no gatekeepers, info verification needed","importance":"8"},{"excerpt":"Social media has also transformed marketing and advertising.","proposition":"Social media changed marketing/advertising","importance":"7"},{"excerpt":"With the ability to target specific demographics, businesses can create highly personalized marketing campaigns that are more effective than traditional advertising.","proposition":"Targeted demographics: personalized, more effective marketing","importance":"7"},{"excerpt":"Social media has had negative impacts on society.","proposition":"Negative social impacts of social media","importance":"10"},{"excerpt":"One of the most significant negative impacts has been the spread of misinformation.","proposition":"Significant neg impact: misinfo spread","importance":"9"},{"excerpt":"Social media platforms have become a breeding ground for fake news and conspiracy theories, which can spread rapidly and have real-world consequences.","proposition":"Fake news, conspiracy theories: rapid spread, real-world impact","importance":"9"},{"excerpt":"Social media has also been criticized for its impact on mental health.","proposition":"Mental health impact of social media","importance":"8"},{"excerpt":"Studies have shown that social media use can lead to feelings of anxiety, depression, and loneliness.","proposition":"Studies: social media use linked to anxiety, depression, loneliness","importance":"8"},{"excerpt":"Social media has had a significant impact on politics and social issues.","proposition":"Significant impact of social media on politics, social issues","importance":"9"},{"excerpt":"Social media has become a platform for political activism, with movements such as Black Lives Matter and #MeToo gaining momentum through social media campaigns.","proposition":"Positive impact: social media as platform for political activism (e.g., BLM, #MeToo)","importance":"8"},{"excerpt":"However, social media has also been criticized for its role in the spread of hate speech and the radicalization of extremist groups.","proposition":"Negative impact: social media's role in hate speech spread, extremist group radicalization","importance":"8"},{"excerpt":"In conclusion, social media has had a profound impact on society, transforming the way we communicate, share information, and consume media.","proposition":"Conclusion: profound impact of social media on comms, info sharing, media consumption","importance":"10"}],"ela":[{"excerpt":"Social media has had a profound impact on modern society.","proposition":"10","importance":"10"},{"excerpt":"It has transformed the way we communicate, share information, and consume media.","proposition":"Social media has revolutionized communication by making it more interactive and immediate, allowing people to share their thoughts and experiences with a global audience in real-time. It has also transformed the way we consume media, with social media becoming a primary source of news and information for many people.","importance":"9"},{"excerpt":"While it has brought about many positive changes, such as the democratization of information and increased connectivity, it has also had negative effects, such as the spread of misinformation and the amplification of hate speech.","proposition":"Social media has led to a democratization of information, where anyone with an internet connection can become a citizen journalist and share news and information with the world. However, this also means that there is a greater potential for the spread of misinformation, as there are no gatekeepers to verify the accuracy of the information being shared. Social media has also been criticized for its impact on mental health and its role in the spread of hate speech and radicalization of extremist groups.","importance":"9"},{"excerpt":"Another impact of social media on society has been the way it has transformed marketing and advertising.","proposition":"Social media platforms have become a critical tool for businesses to reach their target audiences, with the ability to target specific demographics and create highly personalized marketing campaigns that are more effective than traditional advertising.","importance":"8"}]});
  const [htmlContent, setHtmlContent] = useState('');
  const [fileID, setFileID] = useState(undefined);
  const [threadDiv, setThreadDiv] = useState([]);
  const [loading, setLoading] = useState(false);
  const previousWordCountRef = useRef(null);

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

  const saveFile = async (fileid, input) => {


      const content = input
      const title = input.content[0].content[0].text && input.content[0].content[0].text

      const url = `http://localhost:3000/files/`

      const config = {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          token: user.token,
          fileid,
          title,
          content }),
      }

      const answer = await fetch(url, config).then(response => response.json());

      setFileID(answer.id)
      console.log(answer.id)

    
  }

  const loadFile = async (content, fileid) => {
    setContent(content)
    setFileID(fileid)
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
        saveFile(fileID, editor.getJSON())
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
      content,
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
          loadFile={loadFile}
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
    </>
  )
}

export default Tiptap