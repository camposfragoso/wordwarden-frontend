
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
  // const [password, setPassword] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [mailError, setMailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const dispatch = useDispatch()
  const handleClick = (valueOfButton) => {

    setFormStep(formStep + 1)


  }
  const changeMail = (value) => {
    if (value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      setMailError(false)
      setMail(value);
      handleClick();
    } else {
      setMailError(true)
    }

  }

  const connect = (password) => {
    const userInfos = {
      email: mail,
      password: password
    }

    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfos)

    }).then(response=>response.json())
      .then(data=>{
        if(data.result === false){
          setPasswordError(true)
          router.push("/files")
        }else{
          setPasswordError(false)
          dispatch(login({token : data.token, username : data.username}))
          //go to collections
          router.push("/files")

        }
      })
  }

  const formComponents = [

    {
      component: <FormItem question="Your Email" placeholder="jean.dupont@wordwarden.com" position={1} onClick={changeMail} type="email" errorMessage="Please enter valid mail address" error={mailError} />
    },
    {
      component: <FormItem question="Your Password" placeholder="Password" position={2} onClick={connect} type="password" errorMessage="Account not found with email address and password" error={passwordError} />
    },
  ]



  return (
    <div className="standardPage">
      <TopLogo />

      {formComponents.length >= formStep && formComponents[formStep - 1].component}
      <div style={{ display: "flex", position: "absolute", bottom: "30vh" }}>

        {formComponents.map((elem, index) => {

          return (
            <Circle size={30} color={index >= formStep ? "darkGrey" : `color${index + 1}`} />
          )

        })}
      </div>
    </div>
  )
}

export default Login;