import styles from"../styles/Button.module.css";

function Button(props){
  return(
    <button className={styles.button}>
      {props.txt}
    </button>
  )
}

export default Button