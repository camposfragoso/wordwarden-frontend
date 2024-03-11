import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import Highlight from '@tiptap/extension-highlight';
import AssistantMark from './Tiptap_custom_extensions/AssistantMark';
import { HoverExtension } from './Tiptap_custom_extensions/AddHoverEvent';
import { HighlightCustom } from './Tiptap_custom_extensions/HighlightCustomExtension';
import React from 'react'
import styles from '../styles/Test.module.css';
import { useState, useEffect, useRef } from 'react'

const CustomDocument = Document.extend({
  content: 'heading block*',
})

const MIN_IMPORTANCE = 8;
const ASSISTANTS = ['sum', 'dev', 'ela']

export default () => {
 
  const [content, setContent] = useState(`<h1>Social media</h1><p>Social media has had a profound impact on modern society. It has transformed the way we communicate, share information, and consume media. While it has brought about many positive changes, such as the democratization of information and increased connectivity, it has also had negative effects, such as the spread of misinformation and the amplification of hate speech. In this article, we will explore the impact of social media on society and the various ways in which it has shaped our lives. One of the most significant impacts of social media has been the way it has revolutionized communication. In the past, communication was largely one-to-one or one-to-many, with information being disseminated through traditional media channels such as newspapers and television. With social media, communication has become more interactive and immediate. People can now share their thoughts and experiences with a global audience in real-time, and receive instant feedback. This has led to a more connected world, where people can engage with one another on a scale never before possible. Social media has also transformed the way we consume media. In the past, people relied on traditional media channels such as newspapers and television to stay informed. Today, social media has become a primary source of news and information for many people. This has led to a democratization of information, where anyone with an internet connection can become a citizen journalist and share news and information with the world. However, this also means that there is a greater potential for the spread of misinformation, as there are no gatekeepers to verify the accuracy of the information being shared. Another impact of social media on society has been the way it has transformed marketing and advertising. Social media platforms have become a critical tool for businesses to reach their target audiences. With the ability to target specific demographics, businesses can create highly personalized marketing campaigns that are more effective than traditional advertising. This has led to a shift in the way businesses approach marketing, with social media becoming an essential component of any marketing strategy. However, social media has also had negative impacts on society. One of the most significant negative impacts has been the spread of misinformation. Social media platforms have become a breeding ground for fake news and conspiracy theories, which can spread rapidly and have real-world consequences. For example, misinformation about the COVID-19 vaccine has led to low vaccination rates and increased deaths from the virus. Social media has also been criticized for its impact on mental health. Studies have shown that social media use can lead to feelings of anxiety, depression, and loneliness. This is because social media often presents a distorted view of reality, with people presenting only their best selves and creating unrealistic expectations for others. This can lead to feelings of inadequacy and low self-esteem, particularly among young people. Finally, social media has had a significant impact on politics and social issues. Social media has become a platform for political activism, with movements such as Black Lives Matter and #MeToo gaining momentum through social media campaigns. However, social media has also been criticized for its role in the spread of hate speech and the radicalization of extremist groups. In conclusion, social media has had a profound impact on society, transforming the way we communicate, share information, and consume media. While it has brought about many positive changes, such as increased connectivity and democratization of information, it has also had negative effects, such as the spread of misinformation and the amplification of hate speech. As social media continues to evolve, it is essential to recognize both the positive and negative impacts it has on society and take steps to mitigate its negative effects.</p>`);
  const [llmAnswer, setLlmAnswer] = useState({"dev":[{"excerpt":"Social media has had a profound impact on modern society. It has transformed the way we communicate, share information, and consume media.","proposition":"While social media has revolutionized communication and democratized information, it has also led to the spread of misinformation and amplification of hate speech, which can have real-world consequences.","importance":"8"},{"excerpt":"With social media, communication has become more interactive and immediate. People can now share their thoughts and experiences with a global audience in real-time, and receive instant feedback.","proposition":"While social media has made communication more interactive and immediate, it has also contributed to the spread of misinformation and the amplification of hate speech, which can have negative consequences on society.","importance":"7"},{"excerpt":"Social media has transformed the way we consume media. In the past, people relied on traditional media channels such as newspapers and television to stay informed. Today, social media has become a primary source of news and information for many people.","proposition":"While social media has democratized information by allowing anyone with an internet connection to share news and information, it has also led to the spread of misinformation without gatekeepers to verify accuracy.","importance":"9"},{"excerpt":"Social media platforms have become a critical tool for businesses to reach their target audiences. With the ability to target specific demographics, businesses can create highly personalized marketing campaigns that are more effective than traditional advertising.","proposition":"While social media has transformed marketing and advertising by allowing businesses to create highly personalized campaigns, it has also led to increased competition and the need for constant content creation, which can be challenging for small businesses.","importance":"6"},{"excerpt":"Social media has had a significant impact on politics and social issues. Social media has become a platform for political activism, with movements such as Black Lives Matter and #MeToo gaining momentum through social media campaigns.","proposition":"While social media has facilitated the growth of social movements and increased awareness of social issues, it has also been criticized for its role in the spread of hate speech and radicalization of extremist groups.","importance":"7"},{"excerpt":"Social media has also been criticized for its impact on mental health. Studies have shown that social media use can lead to feelings of anxiety, depression, and loneliness.","proposition":"While social media can contribute to feelings of anxiety, depression, and loneliness due to its distorted view of reality, it can also be a source of support and connection for individuals who may feel isolated in real life.","importance":"5"}],"sum":[{"excerpt":"Social media has had a profound impact on modern society.","proposition":"Social media greatly affects society","importance":"10"},{"excerpt":"It has transformed the way we communicate, share information, and consume media.","proposition":"Social media changed communication, info sharing, and media consumption","importance":"9"},{"excerpt":"While it has brought about many positive changes, such as the democratization of information and increased connectivity, it has also had negative effects, such as the spread of misinformation and the amplification of hate speech.","proposition":"Positive impacts: info democritization, connectivity; Negative impacts: misinfo spread, hate amplification","importance":"9"},{"excerpt":"In the past, communication was largely one-to-one or one-to-many, with information being disseminated through traditional media channels such as newspapers and television.","proposition":"Past: limited comms, one-to-one/one-to-many, traditional media","importance":"8"},{"excerpt":"With social media, communication has become more interactive and immediate. People can now share their thoughts and experiences with a global audience in real-time, and receive instant feedback.","proposition":"Social media: interactive, immediate comms, global audience, instant feedback","importance":"8"},{"excerpt":"Social media has also transformed the way we consume media.","proposition":"Social media changed media consumption","importance":"8"},{"excerpt":"Today, social media has become a primary source of news and information for many people.","proposition":"Social media: primary news source for many","importance":"7"},{"excerpt":"This has led to a democratization of information, where anyone with an internet connection can become a citizen journalist and share news and information with the world.","proposition":"Democratized info: anyone, int net, citizen journalism","importance":"7"},{"excerpt":"However, this also means that there is a greater potential for the spread of misinformation, as there are no gatekeepers to verify the accuracy of the information being shared.","proposition":"Potential misinfo spread: no gatekeepers, info verification needed","importance":"8"},{"excerpt":"Social media has also transformed marketing and advertising.","proposition":"Social media changed marketing/advertising","importance":"7"},{"excerpt":"With the ability to target specific demographics, businesses can create highly personalized marketing campaigns that are more effective than traditional advertising.","proposition":"Targeted demographics: personalized, more effective marketing","importance":"7"},{"excerpt":"Social media has had negative impacts on society.","proposition":"Negative social impacts of social media","importance":"10"},{"excerpt":"One of the most significant negative impacts has been the spread of misinformation.","proposition":"Significant neg impact: misinfo spread","importance":"9"},{"excerpt":"Social media platforms have become a breeding ground for fake news and conspiracy theories, which can spread rapidly and have real-world consequences.","proposition":"Fake news, conspiracy theories: rapid spread, real-world impact","importance":"9"},{"excerpt":"Social media has also been criticized for its impact on mental health.","proposition":"Mental health impact of social media","importance":"8"},{"excerpt":"Studies have shown that social media use can lead to feelings of anxiety, depression, and loneliness.","proposition":"Studies: social media use linked to anxiety, depression, loneliness","importance":"8"},{"excerpt":"Social media has had a significant impact on politics and social issues.","proposition":"Significant impact of social media on politics, social issues","importance":"9"},{"excerpt":"Social media has become a platform for political activism, with movements such as Black Lives Matter and #MeToo gaining momentum through social media campaigns.","proposition":"Positive impact: social media as platform for political activism (e.g., BLM, #MeToo)","importance":"8"},{"excerpt":"However, social media has also been criticized for its role in the spread of hate speech and the radicalization of extremist groups.","proposition":"Negative impact: social media's role in hate speech spread, extremist group radicalization","importance":"8"},{"excerpt":"In conclusion, social media has had a profound impact on society, transforming the way we communicate, share information, and consume media.","proposition":"Conclusion: profound impact of social media on comms, info sharing, media consumption","importance":"10"}],"ela":[{"excerpt":"Social media has had a profound impact on modern society.","proposition":"10","importance":"10"},{"excerpt":"It has transformed the way we communicate, share information, and consume media.","proposition":"Social media has revolutionized communication by making it more interactive and immediate, allowing people to share their thoughts and experiences with a global audience in real-time. It has also transformed the way we consume media, with social media becoming a primary source of news and information for many people.","importance":"9"},{"excerpt":"While it has brought about many positive changes, such as the democratization of information and increased connectivity, it has also had negative effects, such as the spread of misinformation and the amplification of hate speech.","proposition":"Social media has led to a democratization of information, where anyone with an internet connection can become a citizen journalist and share news and information with the world. However, this also means that there is a greater potential for the spread of misinformation, as there are no gatekeepers to verify the accuracy of the information being shared. Social media has also been criticized for its impact on mental health and its role in the spread of hate speech and radicalization of extremist groups.","importance":"9"},{"excerpt":"Another impact of social media on society has been the way it has transformed marketing and advertising.","proposition":"Social media platforms have become a critical tool for businesses to reach their target audiences, with the ability to target specific demographics and create highly personalized marketing campaigns that are more effective than traditional advertising.","importance":"8"}]});
  const [threadDiv, setThreadDiv] = useState([])

  const getAllAttributes = (element) => {
    const attributes = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      if (ASSISTANTS.includes(attr.name)) attributes[attr.name] = attr.value;
    }
    return attributes;
  };
  
  const handleFocus = () => {
    editor.commands.focus()
  }

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
      Underline,
      BulletList,
      Highlight.configure({
        multicolor: true,
      }),
      HighlightCustom.configure({
        multicolor: true
      }),
      AssistantMark,
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
  })
  
   useEffect(() => {

    const highlightText = (excerpt, content) => {
      console.log('highlightText function launched. content :')
      console.log(JSON.stringify(content))
      const searchText = excerpt;
      editor.state.doc.descendants((node, pos) => {
        if (node.isText && node.text.includes(searchText)) {
          const startIndex = node.text.indexOf(searchText) + pos;
          const endIndex = startIndex + searchText.length;
  
          const keys = Object.keys(content)
          let color 
          keys.length > 1 ? color = `var(--multipleAssistants)` : color = `var(--${keys[0]})`
          editor.chain().focus().setTextSelection({ from: startIndex, to: endIndex })
            .setMark('assistantMark', {
              propositions: (JSON.stringify(content)),
            })
            .setHighlightCustom({ color })
            .run();
        }
      });
    };
    

    // Sort llmAnswer by piece of text
    if (llmAnswer && editor) {

      let llmAnswerTmp = {};
      Object.entries(llmAnswer).forEach(([assistant, content]) => {
        content.forEach(({excerpt, proposition, importance}) => {
          if (importance >= MIN_IMPORTANCE) {
            if (!llmAnswerTmp[excerpt]) {
              llmAnswerTmp[excerpt] = {};
            }
            llmAnswerTmp[excerpt][assistant] = proposition;
          }
        })
      })

      // Set highlights
      Object.entries(llmAnswerTmp).forEach(([excerpt, content]) => {
        console.log(content)
        highlightText(excerpt, content)
      })
      
    }
  }, [llmAnswer, editor]);

  useEffect(() => {
    if (editor) {
      const handler = () => {
        setContent(editor.getHTML())
      }
      editor.on('update', handler)

      return () => {
        editor.off('update', handler)
      }
    }
  }, [editor, content])
  

  return (
    <div className={styles.container}>
      <EditorContent onClick={() => editor.commands.focus()} editor={editor} className={styles.editor}/>
          <div className={styles.threadDiv}>
          {threadDiv && threadDiv.map(thread => {return (
            <div className={styles.threadCard}>
            <h2> {thread.assistant} </h2>
            <p>{thread.proposition}</p>
              <button onClick={() => handleThreadClick(thread.assistant, thread.excerpt, thread.proposition, 'replace')}>Replace</button>
              <button onClick={() => handleThreadClick(thread.assistant, thread.excerpt, thread.proposition, 'close')}>Close</button>
            </div>
          )})}
          </div>
    </div>
  )
}