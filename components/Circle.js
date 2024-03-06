function Circle(props){
  const style={
    height:`${props.size}px`,
    width:`${props.size}px`,
    borderRadius:"50%",
    backgroundColor:`var(--${props.color})`,
    margin:"5px"
  }
  return(
    <div style={style}>
      
    </div>
  )
}

export default Circle;