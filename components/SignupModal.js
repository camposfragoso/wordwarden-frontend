import TopLogo from "./TopLogo"
import Button from "./Button"
import FormItem from "./FormItem";
import Circle from "./Circle";
import { login } from "../reducers/users";
import styles from '../styles/Signup.module.css'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';

function SignupModal() {
  const [formStep, setFormStep] = useState(1);

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [firstnameError, setFirstnameError] = useState(false)
  const [lastnameError, setLastnameError] = useState(false)
  const [mailError, setMailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [userError, setUserError] = useState(false)

  //defining all functions
  const router = useRouter()
  const dispatch = useDispatch();

  const handleClick = () => {
    setFormStep(formStep + 1)
  }

  const handleKeyPress = (event) => {
    if (event.key !== 'Enter') {
      setMailError(false)
      setPasswordError(false)
      setFirstnameError(false)
      setLastnameError(false)
      return 
    }
    switch (formStep) {
      case 1:
        validateFirstname()
        return
      case 2:
        validateLastname()
        return 
      case 3:
        validateMail()
        return 
      case 4:
        createAccount()
        return
    }
  }

  const goBack = () => {
    setFormStep(formStep - 1)
  }
  //update and validate firstname
  const updateFirstname = (value) => {
    setFirstName(value)
  }
  const validateFirstname = () => {
    if (firstName.length === 0) {
      setFirstnameError(true);
    } else {
      handleClick()
    }
  }

  //update and validate lastname
  const updateLastname = (value) => {
    setLastName(value)
  }

  const validateLastname = () => {
    if (lastName.length === 0) {
      setLastnameError(true);
    } else {
      handleClick()
    }
  }
  //update and validate mail

  const updateMail = (value) => {
    setMail(value)
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
    }

  }
  //update password
  const updatePassword = (value) => {
    setPassword(value)
  }

  //create account

  const user = useSelector((state) => state.users.value);
  const createAccount = () => {
    //d’abord, check du password
    console.log(password)
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&^+])[A-Za-z\d@#$!%*?&^+]{8,15}$/.test(password)) {
      setPasswordError(false)
      console.log("c’est un bon mot de passe")
      //get elements from reducer to pass it to backend
      console.log(user)



      const userInfos = {
        email: mail,
        password: password,
        lastName: lastName,
        firstName: firstName,
        defaultActiveAssistants : user.defaultActiveAssistants
      }
      console.log(userInfos)
      fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfos)

      }).then(response => response.json())
        .then(data => {
          if (data.result === true) {
            console.log(data)
            dispatch(login({token : data.user.token, firstName : data.user.firstName, defaultActiveAssistants : data.user.defaultActiveAssistants}))
            // router.push("/editor")
          } else {
            setUserError(true)
            console.log("could not create user")
          }
        })
    } else {
      setPasswordError(true)
    }
  }

  const formComponents = [

    {
      component: <FormItem question="Let’s start with your firstname" placeholder="Jean" position={1} onClick={validateFirstname} errorMessage="Please enter your firstname" error={firstnameError} value={firstName} onChange={updateFirstname} />
    },
    {
      component: <FormItem question="Now with your last name" placeholder="Dupont" position={2} onClick={validateLastname} errorMessage="Please enter your lastname" error={lastnameError} value={lastName} onChange={updateLastname} />
    },
    {
      component: <FormItem question="What is your email ?" placeholder="jean.dupont@gmail.com" position={3} onClick={validateMail} errorMessage="Please enter a valid email address" error={mailError} value={mail} onChange={updateMail} type="email" />
    },
    {
      component: <FormItem question="Time to pick a strong password" placeholder="Password" position={4} onClick={createAccount} errorMessage={userError === true ? "User with this email address already exists. Please try with another address" : "Must include special characters, numbers, and be at least 8 characters long, and max 16 characters long"} error={userError === true ? userError : passwordError} value={password} onChange={updatePassword} type="password" />
    }
  ]

  return (
    <div className={styles.container} onKeyDown={(e) => handleKeyPress(e)}>
      {formComponents.length >= formStep && formComponents[formStep - 1].component}
        <div className={styles.circles}>

          {formComponents.map((elem, index) => {
            
            return (
              <Circle size={20} color={index >= formStep ? "darkGrey" : `color${index + 1}`} />
              )
              
            })}
        </div>
        {formStep > 1 && (
          <Button txt="Previous step" onClick={goBack} />
        )}
    </div>
  )
}

export default SignupModal;