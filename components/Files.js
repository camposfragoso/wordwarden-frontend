import TopLogo from "./TopLogo";
import Navbar from "./Navbar";
import styles from "../styles/Files.module.css";
//import indiidual File component
import File from "./File"
import Folder from "./Folder"
import { useSelector } from "react-redux";
import {useEffect, useState} from "react"

function Files() {
  const user = useSelector((state)=>state.users.value);
  const [filesData, setFilesData] = useState([])
  const [foldersData, setFoldersData] = useState([])

  //--define path of folderPositioning
  const [path, setPath] = useState([])

  

  //--define state of folder positioning

  const [folderLocation, setFolderLocation] = useState(user.mainFolderId)
  const [currentFolderData, setCurrentFolderData] = useState(null)

  //read user values from reducer


//this routes get the folder location, 
  const fetchFiles = async () =>{
    console.log(user.token)
    const response = await fetch(`http://localhost:3000/folders/${folderLocation}/${user.token}`)
    const data = await response.json()
    console.log(data)
    // setFolderLocation(data.parentFolder)
    setFoldersData(data.childrenFolders)
    setFilesData(data.files)
    setCurrentFolderData(data)
    setPath([...path, data])
  }

  useEffect(()=>{
    fetchFiles()
  },[folderLocation])


  //declare functions

  //go to folder
  const openFolder = (folderId, folderName) => {
    console.log("voilà l’id du current folder:",folderLocation)
    console.log(folderId, folderName)
    setFolderLocation(folderId)
    // setPath([...path,folderId])
  }

  //create newofolder
  
  const createFolder = ()=>{
    console.log("create new folder")
    fetch('http://localhost:3000/folders',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({token : user.token, parentFolder : folderLocation})
    }).then(response=>response.json())
      .then(()=>{
        fetchFiles()
        console.log(foldersData)
      })

  }
  //go to file
  const openFile = (fileName) => {
    console.log("changer folder")
  }
  
  //dummy data for dev purposes

  const folders = ["Articles", "Love letters", "Novel", "C’est un trou de verdure ou chante"];
  const files = [
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },
    {
      title: "Ceci est un titre d’article",
      lastModified: "Hier, à 14:31",
      activeAssistants: ["devil", "sum", "elaborator"],
      content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"


    },

  ]

  //how folders display
  const foldersDisplay = foldersData.map((el, index) => {
    return (
      <Folder txt={el.name} id={el._id} onClick={openFolder} />
    )
  })


  //how files display
  
  const filesDisplay = filesData.map((el, index) => {

    // console.log(el.activeAssistants)
    return (
      <File key={index} title={el.title} lastModified={el.lastModified} activeAssistants={el.activeAssistants} content={el.content} onClick={openFile} />
    )

  })


  //how path displays

  const pathDisplay = path.map((el)=>{
    console.log(el)
    return(
      <span id={el.id}>
        > {el.name}
      </span>
    )
  })
  //Create New File on click on button

  const createFile = () =>{
    console.log("création d’un file")
    //calling backend for new file creation

    console.log(folderLocation)
    fetch('http://localhost:3000/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({token : user.token,title:"New file",parentFolderId:folderLocation,})
    }).then(response=>response.json()
      .then(()=>
        fetchFiles())  
    )

  }
  return (
    <>
      <Navbar />
      <div className={styles.centralBox}>

        <div className={styles.filesContainer}>
          <div className={styles.path}>

            <h1>My files</h1>
            {/* <p>{currentFolderData&&currentFolderData.name}</p> */}
            <p>{pathDisplay&&pathDisplay}</p>
          </div>
          <div className={styles.filesAndFolders}>

            <div className={styles.folders}>
              <Folder txt="Create new folder" onClick={createFolder}/>
              {foldersDisplay.length > 0 && foldersDisplay}
            </div>
            <div className={styles.files}>

              {filesDisplay.length > 0 && filesDisplay}
            </div>
            
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <div>{user.firstName}</div>
          <div onClick={()=>createFile()} className={styles.addButton}>
            <h1>
              +
            </h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Files;