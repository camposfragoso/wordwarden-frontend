import styles from '../styles/Home.module.css';
import Circle from "../components/Circle";
import Link from "next/link";
import Button from "../components/Button"

function Home() {
  return (
    <div className="standardPage">
      <div className="centerContainer">

        <h1>
          WordWarden
        </h1>
        <div className={styles.container}>

          <h2>YOUR PERSONAL TEAM OF WRITING ASSISTANTS</h2>
          <div className={styles.colorContainer}>

            <Circle size="40" color="1" />
            <Circle size="40" color="2" />
            <Circle size="40" color="3" />
            <Circle size="40" color="4" />
            <Circle size="40" color="5" />
          </div>
        </div>
          <Link href="/"><span class="link">Learn More</span></Link>
        <div className={styles.container}>

          <Button txt="START WRITING" link="/signup"/>
          <Link href="/"><span className="link">I already have an account</span></Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
