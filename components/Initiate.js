import TopLogo from "./TopLogo";
import Button from "./Button"
import Link from "next/link"
import FormItem from "./FormItem";
import Circle from "./Circle";
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import {initiateTemporaryUser} from "../reducers/users"

import { useState, useEffect } from "react"
function Initiate() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [formStep, setFormStep] = useState(0)
  // const [data, setData] = useState({})
  const [field, setField] = useState("")
  const [degree, setDegree] = useState("")
  const [substanceOrStyle, setSubstanceOrStyle] = useState("")
  // console.log(formStep)

  const handleClick = () =>{

    setFormStep(formStep+1)
    
    
  }

  const goBack = () => {
    setFormStep(formStep - 1)
  }
//updates state
  const updateField = (value) =>{
    
    setField(value);

  }
  
  const changedegree = (value) =>{
    setDegree(value);
    handleClick();
  }

  const changeSubstance = (value) =>{
    // handleClick();
    console.log(value)
    setSubstanceOrStyle(value)
    console.log(substanceOrStyle)
    dispatch(initiateTemporaryUser({
      fieldOfWork : field,
      degree : degree,
      substanceOrStyle : value
    }))
    router.push("/editor")
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
      component: <FormItem question="What is your field of work ?" placeholder="Software engineer" position={1} onClick={handleClick} onChange={updateField}/>
    },
    {
      component: <FormItem question="I want my  assistants to…" select={true} options={["Perform comprehensive editing","Make essentiel modifications only","Provide guided improvement tips"]} position={2} onClick={changedegree}/>
    },
    {
      component: <FormItem question="I want them to focus on…" select={true} options={["Both substance and style","Mainly substance","Mainly style"]} position={3} onClick={changeSubstance}/>
    }
  ]

  return (
    <div className="standardPage">
      <TopLogo />
      {formComponents.length > formStep && formComponents[formStep].component}
      <div style={{ display: "flex", flexDirection: "column", position: "absolute", top: "70vh", alignItems:"center"}}>
        <div style={{display:"flex"}}>

          {formComponents.map((elem, index) => {
            if(index >0){

              return (
                <Circle size={30} color={index > formStep ? "darkGrey" : `color${index + 1}`} />
              )
            }

          })}
        </div>
        {formStep > 1 && (
          <Button txt="Previous step" onClick={goBack} />


        )}
      </div>
    </div>
  )
}

export default Initiate;