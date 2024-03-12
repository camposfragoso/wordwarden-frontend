import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import Link from "next/link";
import { useSelector } from 'react-redux';

function Navbar({ wordsCount, charactersCount, page }) {
  const user = useSelector(state => state.users.value)
  console.log(user)

  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <div className={styles.navbar}>
      <Link href="/files">
        <img src="/logo_nobg.png" className={styles.logo} />
      </Link>
      <div className={styles.infos}>
          <div className={styles.countContainer}>
            {page === 'editor' ?
              <div className={styles.counts}>
                <p className={styles.counter}><span className={styles.count}>{wordsCount}</span>{wordsCount < 2 ? " word" : " words"}</p>
                <p className={styles.counter}><span className={styles.count}>{charactersCount}</span>{charactersCount < 2 ? " character" : " characters"}</p>
              </div>
            :
              <div className={styles.counts}>
                <p>FILES</p>
              </div>
            }
          </div>
        <div className={styles.accountContainer}>
          <div className={styles.account}>
              {user.token ? <>
                  <div className={styles.status}>
                    <span className={styles.online}></span>
                    <p>Connected</p>
                  </div>
                  <div className={styles.name}>
                    {user.firstName}
                    <span>  ▾</span>
                  </div>
                </>
              :
                <>
                  <div className={styles.status}>
                      <span className={styles.offline}></span>
                      <p>Disconnected</p>
                    </div>
                  <div className={styles.name}>
                    Log In
                  </div>
                </>
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar