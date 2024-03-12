import Styles from "../styles/TopLogo.module.css"
import Image from "next/image"
import Link from "next/link"

function TopLogo() {
  return (
    <div className={Styles.logostyle}>
      <Link href="/">
        <Image src="/logoWW.jpeg" layout="fill" />
      </Link>
    </div>
  )
}

export default TopLogo