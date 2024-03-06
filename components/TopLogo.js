import Styles from "../styles/TopLogo.module.css"
import Image from "next/image"

function TopLogo(){
  return(
    <div className={Styles.logostyle}>
      <Image src="/logoWW.jpeg" layout="fill"/>
    </div>
  )
}

export default TopLogo