
import styles from "../styles/Input.module.css"

function Input(props){
  return(
    <input type="text" placeholder={props.placeholder} className={styles.input}/>
  )
}

export default Input;