import React from 'react';
import styles from '../styles/AssistantsBar.module.css';
import { assistantsList } from '../modules/assistantsList';

function AssistantsBar({ assistants, setAssistantsInBar, activeAssistants, loading }) {

  return (
    <div className={styles.container}>
      <div className={styles.assistantsBar}>
        <div className={styles.assistants}>
          {assistantsList.map(({ id, name }) => {
            return (
              <div key={id} className={styles.assistantContainer}>
                <div className={activeAssistants.includes(id) && assistants.includes(id) ? styles.activeAssistantWrapper : styles.inactiveAssistantWrapper}>
                  <img
                    src={assistants.includes(id) ? `./assistants_icons/${id}.png` : `./assistants_icons/${id}_inactive.png`}
                    onClick={() => setAssistantsInBar(id)} 
                    className={styles.assistantButton}
                  />
                    {/* {id} */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {loading &&
      <div className={styles.loaderContainer}>
        <span className={styles.loader}></span>
      </div>
      }
    </div>
  )
}

export default AssistantsBar