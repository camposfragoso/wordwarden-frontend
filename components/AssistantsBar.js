import React from 'react';
import styles from '../styles/AssistantsBar.module.css';
import { assistantsList } from '../modules/assistantsList';

function AssistantsBar({ assistants, setAssistantsInBar, activeAssistants, loading }) {

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
        {loading &&
        <div className={styles.loaderContainer}>
          <span className={styles.loader}></span>
        </div>
        }
      </div>
    </div>
  )
}

export default AssistantsBar