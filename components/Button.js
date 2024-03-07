import styles from "../styles/Button.module.css";
import Link from "next/link"
function Button(props) {
  if (props.link) {
    return (
      <Link href={props.link}>
        <button className={styles.button}>
          {props.txt}
        </button>
      </Link>
    )
  } else {
    return (
      <button className={styles.button} value={props.txt} onClick={(e)=>props.onClick(e.target.value)}>
        {props.txt}
      </button>
    )
  }
}

export default Button