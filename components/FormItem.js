import Input from "./Input"
import Button from "./Button"
import Button2 from "./Button2"

import {useState} from "react"

function FormItem(props) {
  const romanNumerals = ["I", "II", "III", "IV", "V"]
  const [valueToPass, setValueToPass] = useState("")
  const handleChange = (value) =>{
    setValueToPass(value)
    console.log(value)
  }

  if (!props.select) {
    return (<div style={{ display: "flex" }} >
      <div style={{ backgroundColor: "var(--black)", width: "80px", height: "80px", borderRadius: "50%", display: "flex", color: "var(--white)", alignItems: "center", justifyContent: "center", padding: "10px", marginRight: "15px" }}>
        <p style={{ fontSize: "3rem" }}>
          {romanNumerals[props.position - 1]}
        </p>
      </div>
      <div className="questionContainer">
        <h2>{props.question}</h2>
        <Input placeholder={props.placeholder} value={valueToPass} onChange={(e)=>handleChange(e.target.value)}/>
        <Button txt="OK" onClick={props.onClick} valueToPass={valueToPass}/>
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
      <div style={{ display: "flex" }} >
      <div style={{ backgroundColor: "var(--black)", width: "80px", height: "80px", borderRadius: "50%", display: "flex", color: "var(--white)", alignItems: "center", justifyContent: "center", padding: "10px", marginRight: "15px" }}>
        <p style={{ fontSize: "3rem" }}>
          {romanNumerals[props.position - 1]}
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