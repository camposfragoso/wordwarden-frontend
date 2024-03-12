import React, { useState } from 'react';
import styles from '../styles/AssistantsBar.module.css';
import { assistantsList } from '../modules/assistantsList';

// assistants = ['dev', 'sum', 'ela'] -- assistants present
// setAssistantList(id) : adds or removes assistant from assistants 
// activeAssistants= ['dev', 'sum', 'ela'] -- assistants making comments/suggestions on the text

function AssistantsBar({ assistants, setAssistantsInBar, activeAssistants }) {
  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <div className={styles.assistantsBar}>
      <div className={styles.assistants}>
        {assistantsList.map(({ id, name }) => {
          return (
            <div key={id} className={styles.assistantContainer}>
              <div className={activeAssistants.includes(id) && assistants.includes(id) ? styles.activeAssistantWrapper : styles.inactiveAssistantWrapper}>
                <button 
                  onClick={() => setAssistantsInBar(id)} 
                  className={styles.assistantButton}
                  style={{backgroundColor: assistants.includes(id) ? `var(--${id})` : 'var(--black)'}}
                >
                  {id}
                </button>
              </div>
            </div>
          )
        })}
{/*         <button className={styles.options} onClick={() => setIsModalShown(!isModalShown)}>...</button>
 */}      </div>
      {/* <div className={styles.assistantsModal}>THIS IS THE MODAL</div> */}
    </div>
  )
}

export default AssistantsBar