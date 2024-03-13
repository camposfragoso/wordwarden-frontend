import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { logout, login } from '../reducers/users';

// On files page, instead of counts, display messages from llm ?

function Navbar({ wordsCount, charactersCount, page }) {
  const user = useSelector(state => state.users.value)
  const dispatch = useDispatch()

  const [isModalShown, setIsModalShown] = useState(false);
  const [isLogModalShown, setIsLogModalShown] = useState(false);

  const handleLogModalClick = (e) => {
    e.target.className.includes("logModal") && setIsLogModalShown(false);
  }

  return (
    <div className={styles.navbar} onMouseLeave={() => setIsModalShown(false)}>
      <Link href={page === 'editor' && user.token ? "/files" : "/"}>
        <img src="/logo_nobg.png" className={styles.logo} />
      </Link>
      <div className={styles.infos}>
          <div className={styles.countContainer}>
            {page === 'editor' &&
              <div className={styles.counts}>
                <p className={styles.counter}><span className={styles.count}>{wordsCount}</span>{wordsCount < 2 ? " word" : " words"}</p>
                <p className={styles.counter}><span className={styles.count}>{charactersCount}</span>{charactersCount < 2 ? " character" : " characters"}</p>
              </div>}
          </div>
        <div className={styles.accountContainer}>
          <div className={styles.account}>
              {user.token ? 
                <>
                  <div className={styles.status}>
                    <span className={styles.online}></span>
                    <p>Connected</p>
                  </div>
                  <div className={styles.name} onMouseEnter={() => setIsModalShown(true)}>
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
                  <div className={styles.name} onClick={() => setIsLogModalShown(true)}>
                    Log in / Sign up
                  </div>
                </>
              }
          </div>
        </div>
      </div>
        {user.token ?
        <div className={`${!isModalShown && styles.hidden} ${styles.modal}`} onMouseLeave={() => setIsModalShown(false)}>
          <div>
            <button className={styles.modalButton}>Account</button>
            <button className={styles.modalButton}>Settings</button>
            <button className={styles.modalButton} onClick={() => dispatch(logout())}>Disconnect</button>
          </div>
        </div>
        :
        <div className={`${!isLogModalShown && styles.hidden} ${styles.logModal}`} onClick={(e) => handleLogModalClick(e)}>
          <div className={styles.log}>
            <button className={styles.logButton}>Log in</button>
            <button className={styles.logButton}>Sign up</button>
          </div>
        </div>
        }

    </div>
  )
}

export default Navbar