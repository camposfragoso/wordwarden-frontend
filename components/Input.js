
import styles from "../styles/Input.module.css"

function Input(props){
  return(
    <input type="text" placeholder={props.placeholder} value={props.value} className={styles.input} onChange={props.onChange}/>
  )
}

export default Input;