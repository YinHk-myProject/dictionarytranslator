import React from "react"
import "../styles.css"


const  ErrorDisplay = function(props){
   let element
   //use conditional rendering method to display this funtion component
   if(Object.keys(props.ErrorMessage).length != 0){

    element =
       <div>
        <h1>{props.heading}</h1><br />
        <h3>{props.responseMessage}</h3><br />
        <h3>{props.Solution}</h3>
       </div>
   } else{
    
      element = null
   
    }
   
   return element
  


}


export default ErrorDisplay