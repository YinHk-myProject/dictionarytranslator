import React from "react"
import "../styles.css"

const  Dictionary = function(props){
  
    let element
    //use conditional rendering method to display this funtion component
    if(Object.keys(props.heading).length != 0){
      
       let audio = new Audio(props.Audio)
       let Content = props.description
       let items = []
       var type = Object.keys(Content)
       var description = new Array()
       for(var i in Object.keys(Content)){
        type[i] = Object.keys(Content)[i]
        items.push(<div><br /><h3 id="partOfspeech">{type[i]}</h3></div>)
        for(var j in Content[type[i]]){
         description[j] = Content[type[i]][j]
         var explaint = Object.keys(description[j])
         for(var k in explaint){
          if(explaint[k]=='definition'){
            items.push(<React.Fragment><br /><h4><li id="dif">{description[j][explaint[k]]}</li></h4></React.Fragment>)
          }
          else if(explaint[k]=='example'){
            items.push(<React.Fragment><h4><ul id="exampleList"><li>{description[j][explaint[k]]}</li></ul></h4></React.Fragment>)
          }
          else if(explaint[k]=='synonyms'){
            items.push(<h4 id="syn">synonyms: </h4>)
            for(var ii in description[j][explaint[k]]){
              items.push(<React.Fragment><h5><ul id="synonymsList"><li>{description[j][explaint[k]][ii]}</li></ul></h5></React.Fragment>)
            } 
          }
          
         }
         
        }
       }

       element =
       <div>
        <h2>{props.Word}</h2>
        <h4>{props.Phonetics}</h4>
        <button type="button" id="audioButton" onClick={() => audio.play()}><i class="fa fa-volume-up"></i></button>
        <ol>{items}</ol>
       </div>
       
    } else{
        element = null
       
    }
    return element

}



export default Dictionary