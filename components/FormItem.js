import Button from "./Button"
import Button2 from "./Button2"
import { useRef, useEffect } from 'react';

import styles from "../styles/FormItem.module.css"

import Link from "next/link"
function FormItem(props) {
  const romanNumerals = ["I", "II", "III", "IV", "V"]

  const inputRef = useRef(null);

  useEffect(() => {
    // Vérifier si l'élément ref existe avant de tenter de mettre le focus
    if(inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  //formitem with textinput
  if (!props.select) {
    return (<div className={styles.questionContainer} >
      <div style={{ backgroundColor: "var(--black)", width: "80px", height: "80px", borderRadius: "50%", display: "flex", color: "var(--white)", alignItems: "center", justifyContent: "center", padding: "10px", marginRight: "15px" }}>
        <p style={{ fontSize: "3rem" }}>
          {romanNumerals[props.position - 1]}
        </p>
      </div>
      <div className="questionContainer">
       

        <h2>{props.question}</h2>
        
   
        <input ref={inputRef} placeholder={props.placeholder} value={props.value} onChange={(e) => props.onChange(e.target.value)} type={props.type ? props.type : "text"} className={props.error ? "errorInput":{}}/>
        <div style={{ display: "flex", alignItems: "center", fontSize: "1.5rem", color: "var(--red)" }}>

          <Button txt="OK" onClick={props.onClick} />
          {props.error && (

            <p>{props.errorMessage}</p>
          )}
        </div>
        {props.alternate&&(
          <Link href="/newPassword"><span className="link">{props.alternate}</span></Link>
        )}
      </div>

    </div>)
  } else {
    //multiple choice options
    const options = props.options.map(option => {
      return (
        <Button2 full={true} txt={option} onClick={props.onClick} />
      )
    })
    return (
      <div className={styles.questionContainer} >
        <div style={{ backgroundColor: "var(--black)", width: "80px", height: "80px", borderRadius: "50%", display: "flex", color: "var(--white)", alignItems: "center", justifyContent: "center", padding: "10px", marginRight: "15px" }}>
          <p style={{ fontSize: "3rem" }}>
            {romanNumerals[props.position-1]}
          </p>
        </div>
        <div className="questionContainer">
          <h2>{props.question}</h2>
          {/* <Input placeholder={props.placeholder} /> */}
          {/* <Button txt="OK" onClick={props.onClick} clickParameter={props.position} /> */}
          {options}

        </div>
      </div>
    )
  }
}

export default FormItem