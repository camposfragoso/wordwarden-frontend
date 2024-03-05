import Input from "./Input"
import Button from "./Button"
import Button2 from "./Button2"

function FormItem(props){
  if(!props.select){
    return( <div className="questionContainer">
    <h2>{props.question}</h2>
    <Input placeholder={props.placeholder} />
    <Button txt="OK" onClick={props.onClick} clickParameter={props.position} />

  </div>)
  }else{
    const options = props.options.map(option=>{
      return(
        <Button2 full={true} txt={option} onClick={props.onClick}/>
      )
    })
    return(
      <div className="questionContainer">
      <h2>{props.question}</h2>
      {/* <Input placeholder={props.placeholder} /> */}
      {/* <Button txt="OK" onClick={props.onClick} clickParameter={props.position} /> */}
      {options}
  
    </div>
    )
  }
}

export default FormItem