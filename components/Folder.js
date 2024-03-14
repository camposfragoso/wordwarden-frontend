import styles from "../styles/Folder.module.css"

function Folder(props){
  let content = "";
  if(props.txt.length > 20){
    content = props.txt.slice(0,20).trim() + "…"
  }else{
    content = props.txt
  }

  // console.log(props, props.files, "on",props.id)
  return(
    <div className={styles.folderContainer} onClick={()=>props.onClick(props.id, props.txt)}>
      <p>
      {content}
      </p>
      <div>
        {props.type!=="create"  && props.files.map((elem)=>{
          return(
            <div>
              {elem.title}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Folder;