import React,{useState,useEffect} from "react"
import Dropdownlist from "./Dropdownlist"
import { Container, Item } from "semantic-ui-react"
import classnames from 'classnames'
import "../styles.css"
import 'semantic-ui-css/semantic.min.css'
import Dictionary from "./Dictionary"
import ErrorDisplay from "./ErrorDisplay"


function MainContent() {

const [language, setLanguage] = useState(null)
const [word, setWord] = useState(null)
const [title, setTitle] = useState({})
const [content, setContent] = useState({})
const [errorrespond, setErrorrespond] = useState({})
const [class_name, setClass_name] = useState(null)

//handle onChange function, 'e' for event
const DetectInputValue = e =>{
  if(e.target.value!=null){
    setWord(e.target.value)
  }
  else if(e.target.value==''){
    setWord('') 
  } 
}

const callbackGetData = (lang) => {
  setLanguage(lang)
}

const handleSubmit = e =>{
   //prevent refreshing the page after form submission
   e.preventDefault();

   var sendData 

    if (word==null||word=='') {
      alert('Please input any word')
    }
    else if (/[^a-zA-Z]/.test(word)){
      if(language=="en"){
        alert('Please input letters only')
      }
    }
    else if(language==null){
      alert('Please choose a language')
    }
    else sendData = true



    if(sendData==true){
      fetch('http://localhost:5000/api', {
        method: 'Post',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "wordRequest": word,
          "languageOfword": language
        })
      })
       .then(res => res.json())
        .then(data =>{
          console.log(Object.keys(data))
          var i
          var phoneticsText = new Array()
          var soundtrack = new Array()
          const responseArray1 = ["vocabulary", "phon", "detail"]
          const responseArray2 = ["resTitle","resMessage","solution"]
         if(JSON.stringify(Object.keys(data))==JSON.stringify(responseArray1)){
           for(i in data.phon){
             phoneticsText[i] = data.phon[i].text
             soundtrack[i] = data.phon[i].audio
           } 
           setErrorrespond({})
           setTitle({
            vocab: data.vocabulary,
            phonetics: phoneticsText,
            audio: soundtrack
           })
           setContent(data.detail)
           //console.log(data.detail)
           setClass_name("display container pt-5 pb-5")
         }
         else if(JSON.stringify(Object.keys(data))==JSON.stringify(responseArray2)){
          setTitle({})
          setContent({})
          setErrorrespond({
            titleMessage : data.resTitle,
            contentMessage: data.resMessage,
            resolution: data.solution
          })
          setClass_name("display container pt-5 pb-5")
         }   
        })
         .catch(err => console.error("Error:", err))
        sendData=false
    }
      
}

return(
  <main> 
  <fieldset>
   <form  action="/" method="post" onSubmit={handleSubmit}>
   <div className="container pt-5 pb-5">
    <div className="row ">
      <div className="col-md-2" id="langField">
       <Dropdownlist callbackFromParent = {callbackGetData} />
      </div>
      <div className="col-md-9" id="searchField1">
        <input id="wordSerrch" name="world" placeholder="Search for a word" onChange={DetectInputValue} /> 
      </div>
      <div className="col-md-1" id="searchField2">
        <button type="submit" id="searchButton"><i class="fa fa-search"></i></button>
      </div>
    </div>
    </div>
   </form>
  </fieldset> 
  <div className={class_name}>
   <ErrorDisplay
    ErrorMessage={errorrespond}
    heading={errorrespond.titleMessage}
    responseMessage={errorrespond.contentMessage}
    Solution={errorrespond.resolution}
   />
   <Dictionary
    heading={title}
    Word={title.vocab}
    Phonetics={title.phonetics}
    Audio={title.audio}
    description={content}
   />
  </div> 
  </main>


)

}

  export default MainContent