import React from 'react';
import styles from '../styles/ThreadCard.module.css';
import { assistantsList } from '../modules/assistantsList';

function ThreadCard({ assistant, excerpt, proposition, clicked, replaceThread, closeThread }) {
  const assistants = {
    dev: "Devil's advocate",
    sum: "Summarizer",
    ela: "Elaborator",
  }

  return (
    <div className={styles.threadCard}>
      <div className={styles.header}>
        <h3 className={styles.assistant}>{assistants[assistant]}</h3>
        {clicked && <button className={styles.close} onClick={() => closeThread(assistant, excerpt, proposition)}>✖️</button>}
      </div>
      <p className={styles.proposition}>{proposition}</p>
      {assistant !== 'dev' && clicked && <button className={styles.replace} onClick={() => replaceThread(assistant, excerpt, proposition)}>Replace</button>}
    </div>
  )
}

export default ThreadCard