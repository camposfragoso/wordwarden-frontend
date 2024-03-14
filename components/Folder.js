import styles from "../styles/Folder.module.css"
import File from "./File"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faEllipsis } from '@fortawesome/free-solid-svg-icons'

function Folder(props) {

  const [areFilesVisible, setAreFilesVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [newName, setNewName] = useState("")
  const [name, setName] = useState(props.txt)
  const [askingToDelete, setAskingToDelete] = useState(false)

  // useEffect(()=>{

  //   setName(props.txt)
  // },[])

  // console.log(props, props.files, "on",props.id)
  let filesContent;
  if (props.type !== "create") {

    filesContent = props.files.map((elem) => {
      return (
        <File id={elem._id} title={elem.title} lastModified={elem.lastModified} activeAssistants={elem.activeAssistants} onDelete={props.fetchFiles} />
      )
    })
  }


  //fonction pour appeler un changement de nom au formulaire

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && newName.length > 0) {
      // Appeler la fonction souhaitée ici
      console.log(newName);
      fetch("http://localhost:3000/folders/name", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newName: newName, folderId: props.id })
      })
        .then(response => response.json())
        .then(data => {

          console.log(data)
          setIsRenaming(false)
          setName(newName)
          props.fetchFiles()
        }
        )
    }
  };
  //input pour le changement de nom de folder
  const input = (
    <input className={styles.smallInput} type="text" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={handleKeyDown} onBlur={() => setIsRenaming(false)} autoFocus>
    </input>
  )
  //input pour delete
  const handleDelete = () => {
    fetch("http://localhost:3000/folders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folderId: props.id })
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.result === true) {
          props.fetchFiles()
        }
      })
  }

  //delete modal

  const deleteModal = (
    <div className={styles.menu} onMouseLeave={() => setIsModalVisible(false)}>
      <div className={styles.delete} onClick={() => handleDelete()} onMouseLeave={()=>setAskingToDelete(false)}><p>Click to delete (irreversible)</p></div>
    </div>
  )
  return (
    <div className={styles.folderContainer} >
      <div className={styles.txt} onMouseLeave={() => setIsModalVisible(false)} >
        <div className={styles.txtContent} onClick={() => setAreFilesVisible(!areFilesVisible)}>

          <div className={styles.iconSpace}>

            {props.files.length > 0 && (

              <FontAwesomeIcon icon={faChevronRight} className={styles.icon} style={areFilesVisible && { transform: "rotate(90deg)" }} />
            )}
          </div>

          {isRenaming === false ? <p>{name.length > 20 ? name.slice(0, 20).trim() + "…" : name}</p> : input}

        </div>
        <FontAwesomeIcon icon={faEllipsis} className={styles.iconMore} onClick={() => setIsModalVisible(!isModalVisible)} />
        {isModalVisible && (askingToDelete ? (
          deleteModal
        ) : (
          <div className={styles.menu} onMouseLeave={() => setIsModalVisible(false)}>

            <div className={styles.choice} onClick={() => setIsRenaming(true)}><p>Rename</p></div>
            <div className={styles.separator}></div>
            {askingToDelete ? (
              <div className={styles.choice} onClick={() => handleDelete()}><p>Click to delete (irreversible)</p></div>
            ) : (
              <div className={styles.choice} onClick={() => setAskingToDelete(true)}><p>Delete</p></div>
            )}
          </div>))}
      </div>
      {areFilesVisible && (

        <div className={styles.filesContainer}>
          {filesContent}
        </div>
      )}
    </div>
  )
}

export default Folder;