import React,{useState, useEffect} from "react"
import { Dropdown } from 'semantic-ui-react'
//import 'semantic-ui-css/semantic.min.css'
import "../styles.css"

const languageOption = [
    {
     key: 'en',   
     text: 'English',
     value: 'en'
    },
    {
      key: 'es',   
      text: 'Spanish',
      value: 'es'
     },
     {
      key: 'fr',   
      text: 'French',
      value: 'fr'
     },
     {
      key: 'de',   
      text: 'German',
      value: 'de'
     },
     {
      key: 'it',   
      text: 'Italian',
      value: 'it'
     },
     {
      key: 'ko',   
      text: 'Korean',
      value: 'ko'
     },
     {
      key: 'ru',   
      text: 'Russian',
      value: 'ru'
     }
  ]
function Dropdownlist(props) {
  const [lang,setLang] = useState(null)
 
  const handleSelect = (event,data) => {
   setLang({[data.name]: data.value})
   //console.log(lang)
   //passLangdata(lang)
  } 

  useEffect(() => {
    //console.log(lang)
    props.callbackFromParent(lang)
    //passLangdata()
  }, [props,lang])


return(

  <Dropdown
  name="languageSelect"
  onChange = {handleSelect}
  placeholder='Language'
  fluid
  selection
  options={languageOption}
  
  />
)
}

export default Dropdownlist
