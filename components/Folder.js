import styles from "../styles/Folder.module.css"
import File from "./File"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

function Folder(props) {

  const [areFilesVisible, setAreFilesVisible] = useState(false)
  let content = "";
  if (props.txt.length > 20) {
    content = props.txt.slice(0, 20).trim() + "…"
  } else {
    content = props.txt
  }

  // console.log(props, props.files, "on",props.id)
  let filesContent;
  if (props.type !== "create") {

    filesContent = props.files.map((elem) => {
      return (
        <File id={elem._id} title={elem.title} lastModified={elem.lastModified} activeAssistants={elem.activeAssistants} onDelete={props.fetchFiles} />
      )
    })
  }


  return (
    <div className={styles.folderContainer} onClick={() => setAreFilesVisible(!areFilesVisible)}>
      <div className={styles.txt}>
        {(props.type!=="create" && props.files.length > 0) &&(

        <FontAwesomeIcon icon={faChevronRight} className={styles.icon} style={areFilesVisible&&{transform:"rotate(90deg)"}} />
        )}
        <p>
          {content}
        </p>
      </div>
      {(props.type !== "create" && areFilesVisible) && (

        <div className={styles.filesContainer}>
          {filesContent}
        </div>
      )}
    </div>
  )
}

export default Folder;