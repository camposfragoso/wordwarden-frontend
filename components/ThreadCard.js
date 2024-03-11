import React from 'react';
import styles from '../styles/ThreadCard.module.css';
import { assistantsList } from '../modules/assistantsList';

function ThreadCard({ assistant, excerpt, proposition, replaceThread, closeThread }) {
  const assistants = {
    dev: "Devil's advocate",
    sum: "Summarizer",
    ela: "Elaborator",
  }

  return (
    <div className={styles.threadCard}>
      <h2>{assistants[assistant]}</h2>
      <p>{proposition}</p>
      <button onClick={() => replaceThread(assistant, excerpt, proposition)}>Replace</button>
      <button onClick={() => closeThread(assistant, excerpt, proposition)}>Close</button>
    </div>
  )
}

export default ThreadCard