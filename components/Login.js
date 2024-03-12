
import TopLogo from "./TopLogo"
import Button from "./Button"
import FormItem from "./FormItem";
import Circle from "./Circle";
import { login } from "../reducers/users";

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { useRouter } from 'next/router';

function Login() {
  const router = useRouter()

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [mailError, setMailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const dispatch = useDispatch()
  const handleClick = (valueOfButton) => {

    setFormStep(formStep + 1)


  }

  const goBack = () => {
    setFormStep(formStep - 1)
  }

  const updateMail = (value) =>{
    setMail(value)
  }

  const updatePassword = (value) =>{
    setPassword(value)
  }
  const validateMail = () => {
    if (mail.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      setMailError(false)
      // setMail(value);
      handleClick();
    } else {
      setMailError(true)
      setMail("")
    }

  }

  const connect = () => {
    const userInfos = {
      email: mail,
      password: password
    }
    console.log(userInfos   )
    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfos)

    }).then(response=>response.json())
      .then(data=>{
        if(data.result === false){
          setPasswordError(true)
          // router.push("/files")
        }else{
          console.log(data)
          setPasswordError(false)
          dispatch(login({token : data.token, firstName : data.firstName, defaultActiveAssistants : data.defaultActiveAssistants}))
          //go to collections
          router.push("/files")

        }
      })
  }

  const formComponents = [

    {
      component: <FormItem question="Your Email" placeholder="jean.dupont@wordwarden.com" position={1} onClick={validateMail} type="email" errorMessage="Please enter valid mail address" error={mailError} value={mail} onChange={updateMail}/>
    },
    {
      component: <FormItem question="Your Password" placeholder="Password" position={2} onClick={connect} errorMessage="Account not found with email address and password" error={passwordError} value={password} onChange={updatePassword} type="password" alternate="I forgot my password"/>
    },
  ]



  return (
    <div className="standardPage">
      <TopLogo />

      {formComponents.length >= formStep && formComponents[formStep - 1].component}
      <div style={{ display: "flex", flexDirection: "column", position: "absolute", top: "70vh", alignItems:"center"}}>
        <div style={{display:"flex"}}>

          {formComponents.map((elem, index) => {

            return (
              <Circle size={30} color={index >= formStep ? "darkGrey" : `color${index + 1}`} />
            )

          })}
        </div>
        {formStep > 1 && (
          <Button txt="Previous step" onClick={goBack} />


        )}
      </div>
    </div>
  )
}

export default Login;