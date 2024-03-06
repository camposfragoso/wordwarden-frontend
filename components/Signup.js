import styles from "../styles/Signup.module.css"
import TopLogo from "./TopLogo";
import Button from "./Button"
import Link from "next/link"
import Input from "./Input"
import FormItem from "./FormItem";
import Circle from "./Circle";

import { useState, useEffect } from "react"
function Signup() {
  const [formStep, setFormStep] = useState(0)
  // const [data, setData] = useState({})
  const [field, setField] = useState("")
  const [degree, setDegree] = useState("")
  const [substanceOrStyle, setSubstanceOrStyle] = useState("")
  // console.log(formStep)

  const handleClick = (valueOfButton) =>{

    setFormStep(formStep+1)
    
    
  }

  const changeField = (value) =>{
    
    handleClick();
    setField(value);

  }
  
  const changedegree = (value) =>{
    handleClick()
    setDegree(value);
  }

  const changeSubstance = (value) =>{
    handleClick();
    setSubstanceOrStyle(value)
    console.log(field, degree, substanceOrStyle)
    window.location("./editor")
  }

  const formComponents = [
    {
      component: (
        <div className="questionContainer">
          <h2>We need to ask you a few questions to assemble a team of tailored assistants</h2>
          <div>
            <Button txt="OK" onClick={handleClick} clickParameter={0}/>
            <Link href="/"><span className="link">I’d rather stick with a standard team</span></Link>
          </div>
        </div>
      )
    },
    {
      component: <FormItem question="What is your field of work ?" placeholder="Software engineer" position={1} onClick={changeField} />
    },
    {
      component: <FormItem question="I want my  assistants to…" select={true} options={["Perform comprehensive editing","Make essentiel modifications only","Provide guided improvement tips"]} position={2} onClick={changedegree} />
    },
    {
      component: <FormItem question="I want them to focus on…" select={true} options={["Both substance and style","Mainly substance","Mainly style"]} position={3} onClick={changeSubstance}/>
    }
  ]

  return (
    <div className="standardPage">
      <TopLogo />
      {formComponents[formStep].component}
      <div style={{display:"flex", position:"absolute", bottom:"30vh"}}>
        
      {formComponents.map((elem, index)=>{
        if(index !== 0){

          return(
            <Circle size={30} color={index > formStep ? "darkGrey" : `color${index+1}`}/>
          )
        }
      })}
      </div>
    </div>
  )
}

export default Signup;