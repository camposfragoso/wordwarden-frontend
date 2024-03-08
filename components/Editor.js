import Document from '@tiptap/extension-document'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import styles from '../styles/Test.module.css';
import { useState } from 'react'

const CustomDocument = Document.extend({
  content: 'heading block*',
})

export default () => {
 
  const [content, setContent] = useState('Our planet is getting hotter. Since the Industrial Revolution—an event that spurred the use of fossil fuels in everything from power plants to transportation—Earth has warmed by 1 degree Celsius, about 2 degrees Fahrenheit.  That may sound insignificant, but 2023 was the hottest year on record, and all 10 of the hottest years on record have occurred in the past decade.  Global warming and climate change are often used interchangeably as synonyms, but scientists prefer to use “climate change” when describing the complex shifts now affecting our planet’s weather and climate systems.  Climate change encompasses not only rising average temperatures but also natural disasters, shifting wildlife habitats, rising seas, and a range of other impacts. All of these changes are emerging as humans continue to add heat-trapping greenhouse gases, like carbon dioxide and methane, to the atmosphere.');
  const [llmAnswer, setLlmAnswer] = useState({ "devil": [ { "excerpt": "Our planet is getting hotter.", "proposition": "The Earth's temperature is rising.", "importance": "8" }, { "excerpt": "Since the Industrial Revolution—an event that spurred the use of fossil fuels in everything from power plants to transportation—Earth has warmed by 1 degree Celsius, about 2 degrees Fahrenheit.", "proposition": "The Industrial Revolution's reliance on fossil fuels may not be the sole cause of Earth's temperature increase, as natural climate fluctuations could also play a significant role.", "importance": "8" }, { "excerpt": "2023 was the hottest year on record, and all 10 of the hottest years on record have occurred in the past decade.", "proposition": "The recent spike in global temperatures could be a temporary fluctuation rather than a long-term trend, and other factors such as solar activity might contribute to this increase.", "importance": "7" }, { "excerpt": "Climate change encompasses not only rising average temperatures but also natural disasters, shifting wildlife habitats, rising seas, and a range of other impacts.", "proposition": "The term 'climate change' is overly broad and misleading, as it implies that all these impacts are directly caused by human-induced global warming. Some may be naturally occurring phenomena unrelated to greenhouse gas emissions.", "importance": "6" } ], "sum": [ { "excerpt": "Our planet is getting hotter.", "proposition": "The Earth's temperature is rising.", "importance": "8" }, { "excerpt": "2023 was the hottest year on record, and all 10 of the hottest years on record have occurred in the past decade.", "proposition": "The last decade had the 10 hottest years on record.", "importance": "9" }, { "excerpt": "Global warming and climate change are often used interchangeably as synonyms, but scientists prefer to use “climate change” when describing the complex shifts now affecting our planet’s weather and climate systems.", "proposition": "Scientists differentiate between global warming and climate change.", "importance": "7" }, { "excerpt": "Climate change encompasses not only rising average temperatures but also natural disasters, shifting wildlife habitats, rising seas, and a range of other impacts.", "proposition": "Climate change includes various effects like temperature rise, natural disasters, habitat shifts, and sea level rise.", "importance": "9" }, { "excerpt": "All of these changes are emerging as humans continue to add heat-trapping greenhouse gases, like carbon dioxide and methane, to the atmosphere.", "proposition": "Climate change results from human addition of greenhouse gases.", "importance": "8" } ] });
  const [threadDiv, setThreadDiv] = useState([])

  
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
    content
  })

  return (
    <div className={styles.container}>
      <EditorContent editor={editor} className={styles.editor}/>
          <div className={styles.threadDiv}>
          {threadDiv && threadDiv.map(thread => {return (
            <div>
            <h2> {thread.assistant} </h2>
            <p><strong>Proposition:</strong> {thread.proposition}</p>
            <button onClick={() => handleThreadClick(thread.assistant, thread.excerpt, thread.proposition, 'replace')}>Replace</button>
            <button onClick={() => handleThreadClick(thread.assistant, thread.excerpt, thread.proposition, 'close')}>Close</button>
          </div>
          )})}

          </div>
    </div>
  )
}