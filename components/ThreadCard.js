import React from 'react';
import styles from '../styles/ThreadCard.module.css';
import { assistantsList } from '../modules/assistantsList';

function ThreadCard({ assistant, excerpt, proposition, clicked, replaceThread, closeThread }) {

  return (
    <div className={styles.threadCard}>
      <div className={styles.header}>
        <h3 className={styles.assistant}>{assistantsList.find((item) => item.id === assistant).name}</h3>
        {clicked && <button className={styles.close} onClick={() => closeThread(assistant, excerpt, proposition)}>✖️</button>}
      </div>
      <p className={styles.proposition}>{proposition}</p>
      {assistant !== 'dev' && clicked && <button className={styles.replace} onClick={() => replaceThread(assistant, excerpt, proposition)}>Replace</button>}
    </div>
  )
}

export default ThreadCard