import styles from "../styles/File.module.css"
import Circle from "./Circle"
const moment = require('moment')
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { useDispatch } from 'react-redux';
import { loadFile } from "../reducers/files";


function File(props) {

  const dispatch = useDispatch()

  // console.log(props)
  //setting state for showing the delete modal 

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  //setting content of Delete Modal

  const deleteModal = (
    <div className={styles.deleteModal}>
      <p className={styles.deleteMessage}>
        Delete {props.title} ?
        <span style={{ fontFamily: "Italic" }}>(irreversible)</span>
      </p>
      <div className={styles.modalButtons}>
        <div className={styles.choiceButton} style={{ color: "green" }} onClick={() => setShowDeleteModal(false)}><p>No
          </p></div>
        <div className={styles.choiceButton} style={{ color: "var(--red)" }} onClick={() => deleteFile()}><p>Yes
          </p></div>
      </div>
    </div>
  )
  //setting stateg for modal showing or not
  const [showDetails, setShowDetails] = useState(false)

  //setting content of details
  const details = (
    <div className={styles.details}>
      <div className={styles.detailsTxt}>

        <span style={{ fontFamily: "Italic" }}>

          Last modification : {moment(props.lastModified).fromNow()}
        </span>

      </div>
      <FontAwesomeIcon icon={faCircleXmark} className={styles.closeIcon} onClick={() => setShowDeleteModal(true)} />
    </div>
  )

  const assistants = props.activeAssistants.map(el => {
    return (
      <Circle className={styles.circle} size={15} color={el} />
    )
  })


  //setting mouseLeave const 

  const mouseLeave = () => {
    setShowDetails(false)
    setShowDeleteModal(false)
  }


  //calling for Backend to deleteFile

  const deleteFile = () => {
    console.log("let’s delete file", props.id)
    fetch(`http://localhost:3000/files/${props.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
      .then((data) => {
        console.log(data)
        props.onDelete()
        dispatch(loadFile({id: undefined, content: undefined}))
      })
  }
  // console.log(props.isDragging)
  return (
    <div onClick={() => { dispatch(loadFile({id: props.id, content: props.content}))}} className={styles.fileContainer} style={{ opacity: props.isDragging ? "0.5" : "1" }} onMouseEnter={() => setShowDetails(true)} onMouseLeave={() => mouseLeave()}>

      <div className={styles.documentTextTitle}>

        <h3 className={styles.title}>
          {props.title}
        </h3>
        <div className={styles.activeAssistants}>
          {assistants}
        </div>
      </div>
      {/* { showDetails && details} */}
      {showDeleteModal ? deleteModal : (showDetails ? details : null)}
      {/* <span className={styles.date}>
          {moment(props.lastModified).fromNow()}
        </span> */}
      {/* {showDeleteModal && deleteModal} */}
    </div>
  )
}

export default File;