import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/users';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import Files from "./Files"

function Navbar({ wordsCount, charactersCount, loadFile }) {
  const user = useSelector(state => state.users.value)
  const dispatch = useDispatch()

  const [isModalShown, setIsModalShown] = useState(false);
  const [isLogModalShown, setIsLogModalShown] = useState(false);
  const [isFilesModalShown, setIsFilesModalShown] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleLogModalClick = (e) => {
    if (e.target.className.includes("logModal")) {
      setIsLogModalShown(false);
      setIsLoggingIn(false);
      setIsSigningUp(false);
      return
    }
  }

  return (
    <div className={styles.navbar} onMouseLeave={() => setIsModalShown(false)}>

      <Link href={"/"}>
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
              {user.token ? 
                <>
                  <div className={styles.status} onMouseEnter={() => setIsModalShown(true)}>
                    <span className={styles.online}></span>
                    {user.firstName}
                    <span className={styles.icon}> ▾</span>
                  </div>
                </>
              :
                <>
                  <div className={styles.status} onClick={() => setIsLogModalShown(true)}>
                    <span className={styles.offline}></span>
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
          {!isLoggingIn && !isSigningUp && <>
            <button className={styles.logButton} onClick={() => setIsLoggingIn(true)}>Log in</button>
            <button className={styles.logButton} onClick={() => setIsSigningUp(true)}>Sign up</button>
          </>
            }
          {isLoggingIn && 
            <LoginModal />
          }
          {isSigningUp &&
            <SignupModal />
          }
          </div>
        </div>
        }
      {user.token &&
        <div className={`${styles.filesModal} ${!isFilesModalShown && styles.filesModalHidden}`}>
          <div className={styles.files}><Files/></div>
          <div className={styles.opener} onMouseEnter={() => setIsFilesModalShown(true)}>{!isFilesModalShown ? "►" : "◀︎"}</div>
        </div>
      }
    </div>
  )
}

export default Navbar

// onMouseLeave={() => setIsFilesModalShown(false)}