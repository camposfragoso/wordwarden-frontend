import styles from "../styles/File.module.css"
import Circle from "./Circle"
const moment = require('moment')
function File(props) {
  // console.log(props)
  const assistants = props.activeAssistants.map(el => {
    return (
      <Circle className={styles.circle} size={15} color={el} />
    )
  })
  console.log(props.isDragging)
  return (
    <div className={styles.fileContainer} style={{ opacity: props.isDragging ? "0.5" : "1" }}>

        <div className={styles.documentTextTitle}>

          <h3 className={styles.title}>
            {props.title}
          </h3>
          <div className={styles.activeAssistants}>
            {assistants}
          </div>
        </div>
        <span className={styles.date}>
          {moment(props.lastModified).fromNow()}
        </span>
    </div>
  )
}

export default File;