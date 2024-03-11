import React from 'react';
import styles from '../styles/EditorNavbar.module.css';

function EditorNavbar({ wordsCount, charactersCount }) {
  return (
    <div className={styles.navbar}>
      <img src="/logo_nobg.png" className={styles.logo} />
      <div className={styles.infos}>
        {(wordsCount && charactersCount) && 
          <div className={styles.countContainer}>
            <div className={styles.counts}>
              <p className={styles.counter}>{wordsCount} words</p>
              <p className={styles.counter}>{charactersCount} characters</p>
            </div>
            <div className={styles.verticalSeparator}>Lorem</div>
          </div>
        }
      </div>
    </div>
  )
}

export default EditorNavbar