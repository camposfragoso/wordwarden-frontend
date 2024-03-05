import styles from "../styles/Button2.module.css";
import Link from "next/link"
function Button2(props) {
  if (props.link) {
    return (
      <Link href={props.link} style={props.full && {width:"100%"}}>
        <button className={styles.button} >
          {props.txt}
        </button>
      </Link>
    )
  } else {
    return (
      <button style={props.full && {width:"100%"}} className={styles.button} onClick={()=>props.onClick(props.clickParameter)}>
        {props.txt}
      </button>
    )
  }
}

export default Button2