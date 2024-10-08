import styles from "../styles/Button2.module.css";
import Link from "next/link"
function Button2(props) {
  if (props.link) {
    return (
      <Link href={props.link} style={props.full && {width:"90%"}}>
        <button className={styles.button} >
          {props.txt}
        </button>
      </Link>
    )
  } else {
    return (
      <button style={props.full && {width:"90%"}} value={props.txt} className={styles.button} onClick={(e)=>props.onClick(e.target.value)}>
        {props.txt}
      </button>
    )
  }
}

export default Button2