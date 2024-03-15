import TopLogo from "./TopLogo";
import Navbar from "./Navbar";
import styles from "../styles/Files.module.css";
//import indiidual File component
import File from "./File"
import Folder from "./Folder"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { loadFile } from "../reducers/files";
import { useEditor } from "@tiptap/react";
import { unsetAllHighlights } from "../modules/tiptap";
import HighlightCustom from "./Tiptap_custom_extensions/HighlightCustomExtension";


function Files(props) {

  const dispatch = useDispatch()

  const user = useSelector((state) => state.users.value);
  const [filesData, setFilesData] = useState([])
  const [foldersData, setFoldersData] = useState([])
  const files = useSelector((state)=>state.files.value)
  
 

 

  //this routes get the folder location, 
  // const fetchFiles = async () => {
  //   console.log(user.token)
  //   const response = await fetch(`http://localhost:3000/folders/${user.token}`)
  //   const data = await response.json()
  //   console.log(data)
  //   const noHighlightFiles = data.filesData.map((file) => {
  //     tmpEditor.setContent(file.content)
  //     unsetAllHighlights(tmpEditor)
  //     file.content = tmpEditor.getJSON()
  //     return file
  //   })
  //   // setFolderLocation(data.parentFolder)
  //   setFoldersData(data.folderData)
  //   setFilesData(noHighlightFiles)
  //   setCurrentFolderData(data)
  // }

  const fetchFiles = async () => {
    console.log(user.token)
    const response = await fetch(`http://localhost:3000/folders/${user.token}`)
    const data = await response.json()
    console.log(data)
    // setFolderLocation(data.parentFolder)
    setFoldersData(data.folderData)
    setFilesData(data.filesData)
  }

  useEffect(() => {
    fetchFiles()
  }, [files])


  //declare functions

  //go to folder
  // const openFolder = (folderId, folderName) => {
  //   console.log("voilà l’id du current folder:", folderLocation)
  //   console.log(folderId, folderName)
  //   setFolderLocation(folderId)
  //   // setPath([...path,folderId])
  // }

  //create newofolder

  const createFolder = () => {
    console.log("create new folder")
    fetch('http://localhost:3000/folders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token})
    }).then(response => response.json())
      .then(data => {
        fetchFiles()
        console.log(foldersData)
        console.log(data)
      })

  }
  //go to file
  const openFile = (fileName) => {
    console.log("changer folder")
  }

  //dummy data for dev purposes


  //how folders display
  // const foldersDisplay = foldersData.map((el, index) => {
  //   return (
  //     <Folder txt={el.name} id={el._id} onClick={openFolder} />
  //   )
  // })


  //how files display

  // const filesDisplay = filesData.map((el, index) => {

  //   // console.log(el.activeAssistants)
  //   return (
  //     <File {...provided.droppableProps} ref={provided.innerRef} className="files" key={index} title={el.title} lastModified={el.lastModified} activeAssistants={el.activeAssistants} content={el.content} onClick={openFile} />
  //   )

  // })


 
  //Create New File on click on button

  const createFile = () => {
    console.log("création d’un file")
    //calling backend for new file creation

   
    fetch('http://localhost:3000/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, title: "New file" })
    }).then(response => response.json()
      .then((data) =>{

        console.log(data)
        fetchFiles();
      }
      )
    )

  }


  //fonction qui détermine ce qui se passe au drap and drop

  const handleDragEnd = (result) => {
    console.log(result.draggableId)
    const draggableId = result.draggableId
    if (!result.destination) {
      return;
    }

    const droppedOnFolder = foldersData.find(
      (folder) => folder._id === result.destination.droppableId
    );

    if (droppedOnFolder) {
      // Un élément a été déposé sur un dossier
      // Vous pouvez effectuer une action ici, par exemple, déplacer l'élément dans le dossier
      console.log(`${draggableId} dropped on folder ${droppedOnFolder._id}`);
      fetch("http://localhost:3000/folders",{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({folderId:droppedOnFolder._id, fileId:draggableId})
      }).then(response=>response.json())
        .then(data=>{
         console.log(data)
         fetchFiles() 
        })
    } else {
      // Un élément a été déposé ailleurs
      // Vous pouvez effectuer une autre action ici, par exemple, réorganiser les éléments
      console.log("Element dropped elsewhere");
    }
  };


  return (






    <div className={styles.filesAndFolders}>

      <DragDropContext onDragEnd={handleDragEnd}>

        <div className={styles.folders}>
          <div className={styles.createFolder} onClick={()=>createFolder()}>
            <p>+ Create new folder</p>
          </div>
          
          {/* test d’insertion de la fonction de display des folders en drap and drop */}
          {foldersData.length > 0 && foldersData.map((folder) => (
            <Droppable droppableId={folder._id} key={folder._id} style={{width:"100%"}}>
              {(provided) => (
                <div style={{width:"100%"}}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Folder isVisible={props.isVisible} txt={folder.name} id={folder._id} files={folder.files} fetchFiles={fetchFiles}/>
                </div>
              )}
            </Droppable>
          ))}
        </div>
        <Droppable droppableId="files">
          {(provided) => (

            <ul className="files" {...provided.droppableProps} ref={provided.innerRef} >
              {filesData.sort((a,b)=>new Date(b.lastModified) - new Date(a.lastModified)).map((el, index) => {

                return (
                  <Draggable key={el._id} draggableId={el._id} index={index}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >

                        <File id={el._id} title={el.title} lastModified={el.lastModified} activeAssistants={el.activeAssistants} content={el.content} isDragging={snapshot.isDragging} onDelete={fetchFiles}/>
                      </div>
                    )}

                  </Draggable>
                )

              })}
            </ul>
          )}
        </Droppable>

      </DragDropContext>
    </div>





  )
}

export default Files;