import React from 'react';
import styles from '../styles/Navbar.module.css';
import Link from "next/link";

function Navbar({ wordsCount, charactersCount, connected }) {
  console.log(wordsCount)
  console.log(charactersCount)
  return (
    <div className={styles.navbar}>
      <Link href="/files">
        <img src="/logo_nobg.png" className={styles.logo} />
      </Link>
      <div className={styles.infos}>
          <div className={styles.countContainer}>
            <div className={styles.counts}>
              <p className={styles.counter}><span className={styles.count}>{wordsCount}</span>{wordsCount < 2 ? " word" : " words"}</p>
              <p className={styles.counter}><span className={styles.count}>{charactersCount}</span>{charactersCount < 2 ? " character" : " characters"}</p>
            </div>
          </div>
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

export default Navbar