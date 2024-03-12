import React from 'react';
import styles from '../styles/EditorNavbar.module.css';
import Link from "next/link";

function EditorNavbar({ wordsCount, charactersCount, connected }) {
  return (
    <div className={styles.navbar}>
      <Link href="/files">
        <img src="/logo_nobg.png" className={styles.logo} />
      </Link>
      <div className={styles.infos}>
        {(wordsCount && charactersCount) && 
          <div className={styles.countContainer}>
            <div className={styles.counts}>
              <p className={styles.counter}><span className={styles.count}>{wordsCount}</span> words</p>
              <p className={styles.counter}><span className={styles.count}>{charactersCount}</span> characters</p>
            </div>
          </div>
        }
        <div className={styles.accountContainer}>
          <div className={styles.account}>
            {/* {connected ? 
              <div className={styles.status}>
                <span className={styles.online}></span>
                <p>Connected</p>
              </div>
            :
              <div className={styles.status}>
                <span className={styles.offline}></span>
                <p>Log In</p>
              </div>
            } */}
            <div className={styles.status}>
                <span className={styles.offline}></span>
                <p>Disconnected</p>
              </div>
            <div className={styles.name}>
              Log In
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditorNavbar