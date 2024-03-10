import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import { useEffect, useState, useRef } from 'react';
import Button from './Button';
import TopLogo from './TopLogo';
import AssistantsBar from './AssistantsBar';
import StarterKit from '@tiptap/starter-kit';
import styles from '../styles/Editor.module.css';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import AssistantMark from './Tiptap_custom_extensions/AssistantMark';
import { HoverExtension } from './Tiptap_custom_extensions/AddHoverEvent';
import { HighlightCustom } from './Tiptap_custom_extensions/HighlightCustomExtension';
import { replaceText, setAllHightlights, unsetAllHighlights } from '../modules/tiptap';

// TODO 
// Export functions to other file ==> editor need to be an argument
// Handle way to fetch llm -- see after
// Handle llm interventions already read => Yes to highlight again after activation/deactivation
// Handle excerpt inside another excerpt


const Tiptap = () => {
  const [assistants, setAssistants] = useState(['sum', 'dev', 'ela']);
  const [activeAssistants,setActiveAssistants] = useState([]);
  const [minImportance, setMinImportance] = useState(1);
  const [content, setContent] = useState('Social media has had a profound impact on modern society. It has transformed the way we communicate, share information, and consume media. While it has brought about many positive changes, such as the democratization of information and increased connectivity, it has also had negative effects, such as the spread of misinformation and the amplification of hate speech. In this article, we will explore the impact of social media on society and the various ways in which it has shaped our lives.\n\nOne of the most significant impacts of social media has been the way it has revolutionized communication. In the past, communication was largely one-to-one or one-to-many, with information being disseminated through traditional media channels such as newspapers and television. With social media, communication has become more interactive and immediate. People can now share their thoughts and experiences with a global audience in real-time, and receive instant feedback. This has led to a more connected world, where people can engage with one another on a scale never before possible.\n\nSocial media has also transformed the way we consume media. In the past, people relied on traditional media channels such as newspapers and television to stay informed. Today, social media has become a primary source of news and information for many people. This has led to a democratization of information, where anyone with an internet connection can become a citizen journalist and share news and information with the world. However, this also means that there is a greater potential for the spread of misinformation, as there are no gatekeepers to verify the accuracy of the information being shared.\n\nAnother impact of social media on society has been the way it has transformed marketing and advertising. Social media platforms have become a critical tool for businesses to reach their target audiences. With the ability to target specific demographics, businesses can create highly personalized marketing campaigns that are more effective than traditional advertising. This has led to a shift in the way businesses approach marketing, with social media becoming an essential component of any marketing strategy.\n\nHowever, social media has also had negative impacts on society. One of the most significant negative impacts has been the spread of misinformation. Social media platforms have become a breeding ground for fake news and conspiracy theories, which can spread rapidly and have real-world consequences. For example, misinformation about the COVID-19 vaccine has led to low vaccination rates and increased deaths from the virus.\n\nSocial media has also been criticized for its impact on mental health. Studies have shown that social media use can lead to feelings of anxiety, depression, and loneliness. This is because social media often presents a distorted view of reality, with people presenting only their best selves and creating unrealistic expectations for others. This can lead to feelings of inadequacy and low self-esteem, particularly among young people.\n\nFinally, social media has had a significant impact on politics and social issues. Social media has become a platform for political activism, with movements such as Black Lives Matter and #MeToo gaining momentum through social media campaigns. However, social media has also been criticized for its role in the spread of hate speech and the radicalization of extremist groups.\n\nIn conclusion, social media has had a profound impact on society, transforming the way we communicate, share information, and consume media. While it has brought about many positive changes, such as increased connectivity and democratization of information, it has also had negative effects, such as the spread of misinformation and the amplification of hate speech. As social media continues to evolve, it is essential to recognize both the positive and negative impacts it has on society and take steps to mitigate its negative effects.');

  const [htmlContent, setHtmlContent] = useState('');

  const [llmAnswer, setLlmAnswer] = useState({"dev":[{"excerpt":"It has transformed the way we communicate, share information, and consume media.","proposition":"While social media has revolutionized communication and democratized information, it has also led to the spread of misinformation and amplification of hate speech, which can have real-world consequences.","importance":"8"},{"excerpt":"With social media, communication has become more interactive and immediate. People can now share their thoughts and experiences with a global audience in real-time, and receive instant feedback.","proposition":"While social media has made communication more interactive and immediate, it has also contributed to the spread of misinformation and the amplification of hate speech, which can have negative consequences on society.","importance":"7"},{"excerpt":"Social media has transformed the way we consume media. In the past, people relied on traditional media channels such as newspapers and television to stay informed. Today, social media has become a primary source of news and information for many people.","proposition":"While social media has democratized information by allowing anyone with an internet connection to share news and information, it has also led to the spread of misinformation without gatekeepers to verify accuracy.","importance":"9"},{"excerpt":"Social media platforms have become a critical tool for businesses to reach their target audiences. With the ability to target specific demographics, businesses can create highly personalized marketing campaigns that are more effective than traditional advertising.","proposition":"While social media has transformed marketing and advertising by allowing businesses to create highly personalized campaigns, it has also led to increased competition and the need for constant content creation, which can be challenging for small businesses.","importance":"6"},{"excerpt":"Social media has had a significant impact on politics and social issues. Social media has become a platform for political activism, with movements such as Black Lives Matter and #MeToo gaining momentum through social media campaigns.","proposition":"While social media has facilitated the growth of social movements and increased awareness of social issues, it has also been criticized for its role in the spread of hate speech and radicalization of extremist groups.","importance":"7"},{"excerpt":"Social media has also been criticized for its impact on mental health. Studies have shown that social media use can lead to feelings of anxiety, depression, and loneliness.","proposition":"While social media can contribute to feelings of anxiety, depression, and loneliness due to its distorted view of reality, it can also be a source of support and connection for individuals who may feel isolated in real life.","importance":"5"}],"sum":[{"excerpt":"Social media has had a profound impact on modern society.","proposition":"Social media greatly affects society","importance":"10"},{"excerpt":"It has transformed the way we communicate, share information, and consume media.","proposition":"Social media changed communication, info sharing, and media consumption","importance":"9"},{"excerpt":"While it has brought about many positive changes, such as the democratization of information and increased connectivity, it has also had negative effects, such as the spread of misinformation and the amplification of hate speech.","proposition":"Positive impacts: info democritization, connectivity; Negative impacts: misinfo spread, hate amplification","importance":"9"},{"excerpt":"In the past, communication was largely one-to-one or one-to-many, with information being disseminated through traditional media channels such as newspapers and television.","proposition":"Past: limited comms, one-to-one/one-to-many, traditional media","importance":"8"},{"excerpt":"With social media, communication has become more interactive and immediate. People can now share their thoughts and experiences with a global audience in real-time, and receive instant feedback.","proposition":"Social media: interactive, immediate comms, global audience, instant feedback","importance":"8"},{"excerpt":"Social media has also transformed the way we consume media.","proposition":"Social media changed media consumption","importance":"8"},{"excerpt":"Today, social media has become a primary source of news and information for many people.","proposition":"Social media: primary news source for many","importance":"7"},{"excerpt":"This has led to a democratization of information, where anyone with an internet connection can become a citizen journalist and share news and information with the world.","proposition":"Democratized info: anyone, int net, citizen journalism","importance":"7"},{"excerpt":"However, this also means that there is a greater potential for the spread of misinformation, as there are no gatekeepers to verify the accuracy of the information being shared.","proposition":"Potential misinfo spread: no gatekeepers, info verification needed","importance":"8"},{"excerpt":"Social media has also transformed marketing and advertising.","proposition":"Social media changed marketing/advertising","importance":"7"},{"excerpt":"With the ability to target specific demographics, businesses can create highly personalized marketing campaigns that are more effective than traditional advertising.","proposition":"Targeted demographics: personalized, more effective marketing","importance":"7"},{"excerpt":"Social media has had negative impacts on society.","proposition":"Negative social impacts of social media","importance":"10"},{"excerpt":"One of the most significant negative impacts has been the spread of misinformation.","proposition":"Significant neg impact: misinfo spread","importance":"9"},{"excerpt":"Social media platforms have become a breeding ground for fake news and conspiracy theories, which can spread rapidly and have real-world consequences.","proposition":"Fake news, conspiracy theories: rapid spread, real-world impact","importance":"9"},{"excerpt":"Social media has also been criticized for its impact on mental health.","proposition":"Mental health impact of social media","importance":"8"},{"excerpt":"Studies have shown that social media use can lead to feelings of anxiety, depression, and loneliness.","proposition":"Studies: social media use linked to anxiety, depression, loneliness","importance":"8"},{"excerpt":"Social media has had a significant impact on politics and social issues.","proposition":"Significant impact of social media on politics, social issues","importance":"9"},{"excerpt":"Social media has become a platform for political activism, with movements such as Black Lives Matter and #MeToo gaining momentum through social media campaigns.","proposition":"Positive impact: social media as platform for political activism (e.g., BLM, #MeToo)","importance":"8"},{"excerpt":"However, social media has also been criticized for its role in the spread of hate speech and the radicalization of extremist groups.","proposition":"Negative impact: social media's role in hate speech spread, extremist group radicalization","importance":"8"},{"excerpt":"In conclusion, social media has had a profound impact on society, transforming the way we communicate, share information, and consume media.","proposition":"Conclusion: profound impact of social media on comms, info sharing, media consumption","importance":"10"}],"ela":[{"excerpt":"Social media has had a profound impact on modern society.","proposition":"10","importance":"10"},{"excerpt":"It has transformed the way we communicate, share information, and consume media.","proposition":"Social media has revolutionized communication by making it more interactive and immediate, allowing people to share their thoughts and experiences with a global audience in real-time. It has also transformed the way we consume media, with social media becoming a primary source of news and information for many people.","importance":"9"},{"excerpt":"While it has brought about many positive changes, such as the democratization of information and increased connectivity, it has also had negative effects, such as the spread of misinformation and the amplification of hate speech.","proposition":"Social media has led to a democratization of information, where anyone with an internet connection can become a citizen journalist and share news and information with the world. However, this also means that there is a greater potential for the spread of misinformation, as there are no gatekeepers to verify the accuracy of the information being shared. Social media has also been criticized for its impact on mental health and its role in the spread of hate speech and radicalization of extremist groups.","importance":"9"},{"excerpt":"Another impact of social media on society has been the way it has transformed marketing and advertising.","proposition":"Social media platforms have become a critical tool for businesses to reach their target audiences, with the ability to target specific demographics and create highly personalized marketing campaigns that are more effective than traditional advertising.","importance":"8"}]});
  
  const [threadDiv, setThreadDiv] = useState([]);

  // Get attributes from event.target
  const getAllAttributes = (element) => {
    const attributes = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      if (assistants.includes(attr.name)) attributes[attr.name] = attr.value;
    }
    return attributes;
  };

  // Editor with events
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList,
      HighlightCustom,
      AssistantMark,

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
                return [...prevThreadDiv, { assistant, proposition, excerpt, hover: true, clicked: false }];
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
          console.log(event.target)
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

  // HANDLE SEND BUTTON -- DEV
  const handleSendClick = async() => {

    const response = await fetch('http://localhost:3000/llm/mistral', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ 
        assistants: ['dev', 'sum', 'ela'],
        input: content }),
    });
    
    const data = await response.json();
    Object.entries(data.results).forEach((item) => {
      console.log(item)
    })
    setLlmAnswer(data.results);
  };

  // Handle writing to states
  useEffect(() => {
    if (editor) {
      const handler = () => {
        setContent(editor.getText())
        setHtmlContent(editor.getHTML())
      }
      editor.on('update', handler)

      return () => {
        editor.off('update', handler)
      }
    }
  }, [editor, content]);

  // Handle llm answer
  useEffect(() => {

    // Sort llmAnswer by piece of text
    if (llmAnswer && editor) {

      // Set active assistants (intervening on text)
      Object.entries(llmAnswer).forEach(([assistant, content]) => setActiveAssistants(currentActiveAssistants => {
        if (!currentActiveAssistants.includes(assistant) && content.length > 0 && assistants.includes(assistant)) {
          return [...currentActiveAssistants, assistant]
        }
      }))
      
      setAllHightlights(editor, assistants, llmAnswer, minImportance);
    }
  }, [llmAnswer, editor, minImportance]);

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

    replaceText(excerpt, proposition)

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

  return (
    <div className={styles.container}>
      <div className={styles.navBar}>
        <TopLogo />
      </div>
      <div className={styles.editorContainer}>
        <AssistantsBar assistants={assistants} activeAssistants={activeAssistants} setAssistants={setAssistantsFromBar}/>
        {/* BubbleMenu content */}
        {editor && <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100, position: top }} editor={editor}>
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

        <div className={styles.threadsContainer}>
          {threadDiv && threadDiv.map(thread => {return (
            <div>
              <h2> {thread.assistant} </h2>
              <p><strong>Proposition:</strong> {thread.proposition}</p>
              <button onClick={() => replaceThread(thread.assistant, thread.excerpt, thread.proposition)}>Replace</button>
              <button onClick={() => closeThread(thread.assistant, thread.excerpt, thread.proposition)}>Close</button>
            </div>
          )})}
        </div>
      </div>

      <div className={styles.separator}>Lorem</div>

      <div className={styles.answerContainer}>
        <div className={styles.prompt}>

          <div className={styles.separator}>Lorem</div>

          <button onClick={handleSendClick}>SEND</button>
          <Button full={true} txt='SEND' onClick={handleSendClick} />
          {content && <div>{JSON.stringify(content, null, 2)}</div>}
          {htmlContent && <div>{htmlContent}</div>}

        </div>

        <div className={styles.verticalSeparator}>Lorem</div>

        <div className={styles.answer}>
          {llmAnswer && (
          <div>

            <p>{llmAnswer && JSON.stringify(llmAnswer)}</p>

            <h2>Devil</h2>
            {llmAnswer.dev &&llmAnswer.dev.map((item, index) => (
              <div key={index}>
                <p><strong>Excerpt:</strong> {item.excerpt}</p>
                <p><strong>Proposition:</strong> {item.proposition}</p>
                <p><strong>Importance:</strong> <span style={{color: item.importance > minImportance ? 'green' : 'red'}}>{item.importance}</span></p>
              </div>
            ))}

            <h2>Sum</h2>
            {llmAnswer.sum && llmAnswer.sum.map((item, index) => (
              <div key={index}>
                <p><strong>Excerpt:</strong> {item.excerpt}</p>
                <p><strong>Proposition:</strong> {item.proposition}</p>
                <p><strong>Importance:</strong> <span style={{color: item.importance > minImportance ? 'green' : 'red'}}>{item.importance}</span></p>
              </div>
            ))}

          <h2>Elaborator</h2>
            {llmAnswer.ela && llmAnswer.ela.map((item, index) => (
              <div key={index}>
                <p><strong>Excerpt:</strong> {item.excerpt}</p>
                <p><strong>Proposition:</strong> {item.proposition}</p>
                <p><strong>Importance:</strong> <span style={{color: item.importance > minImportance ? 'green' : 'red'}}>{item.importance}</span></p>
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