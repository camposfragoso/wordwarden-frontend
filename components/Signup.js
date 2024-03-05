import styles from "../styles/Signup.module.css"
import TopLogo from "./TopLogo";
import Button from "./Button"
import Link from "next/link"
import Input from "./Input"
import FormItem from "./FormItem";

import { useState, useEffect } from "react"
function Signup() {
  const [formStep, setFormStep] = useState(0)
  console.log(formStep)

  const handleClick = (position) =>{
    setFormStep(position+1)
  }


  return (
    <div className="standardPage">
      <TopLogo />

      {formStep === 0 && (
        <div className="questionContainer">



          <h2>We need to ask you a few questions to assemble a team of tailored assistants</h2>

          <div>

            <Button txt="OK" onClick={handleClick} clickParameter={0}/>
            <Link href="/"><span className="link">I’d rather stick with a standard team</span></Link>
          </div>
        </div>
      )}
      {formStep === 1 && (
        <FormItem question="What is your field of work ?" placeholder="Software engineer" position={1} onClick={handleClick} />
      )}
      {formStep ===2 &&(

        <FormItem question="I want my  assistants to…" select={true} options={["Perform comprehensive editing","Make essentiel modifications only","Provide guided improvement tips"]} position={2} onClick={handleClick} />
      )
      }
      {formStep===3 &&(

        <FormItem question="I want them to focus on…" select={true} options={["Both substance and style","Mainly substance","Mainly style"]} position={3} onClick={handleClick}/>
      )
      }

    </div>
  )
}

export default Signup;