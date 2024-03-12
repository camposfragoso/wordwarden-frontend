import styles from "../styles/File.module.css"
import Circle from "./Circle"

function File(props) {
  // console.log(props)
  const assistants=props.activeAssistants.map(el=>{
    return(
      <Circle className={styles.circle} size={20} color={el}/>
    )
  })
  return (
    <div className={styles.fileContainer}>
      <div className={styles.preview}>
        <p className={styles.content}>
          {props.content}
        </p>
      </div>
      <div className={styles.documentText}>

        <h3 className={styles.title}>
          {props.title}
        </h3>
        <div className={styles.activeAssistants}>
          {assistants}
        </div>
        <span style={{marginLeft:"5px"}} className="italic">
          {props.lastModified}
        </span>
      </div>
    </div>
  )
}

export default File;