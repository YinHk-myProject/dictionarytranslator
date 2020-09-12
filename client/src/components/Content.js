import React,{useState} from "react"
import classnames from 'classnames'
import logo from  "./translate_logo.png"
import "../styles.css"
import LangDropdown from "./LangDropdown"

function Content(props) {
 const [textarea1, setTextarea1] = useState("textarea_field1")
 const [textarea2, setTextarea2] = useState("textarea_field2") 
 const [tempText1, setTempText1] = useState('')
 const [tempText2, setTempText2] = useState('')
 const [lang1, setLang1] =  useState(null)
 const [lang2, setLang2] =  useState(null)
 const [query, setQuery] = useState({})
 

 const handleClicked = (e) =>{
   if(textarea2=="textarea_field2"){
     setTextarea1("textarea_field2")
     setTextarea2("textarea_field1")
   }
 }
 const anotherClicked = (e) =>{
  if(textarea1=="textarea_field2"){
    setTextarea1("textarea_field1")
    setTextarea2("textarea_field2")
  }
 }

 const textChange = (e) =>{
   
   const idAttribute = e.target.getAttribute('id')
   if(idAttribute==='text1'){
      setQuery({lang: "language1", text: e.target.value})
      setTempText1(e.target.value)
   }
   else if(idAttribute==='text2'){
      setQuery({lang: "language2", text: e.target.value})
      setTempText2(e.target.value)
   }


 }


 const optionChange = (e) =>{

   const idAttribute = e.target.getAttribute('id')
   if(idAttribute==='select1'){
    setLang1(e.target.value)   
   }
   else if(idAttribute==='select2'){
    setLang2(e.target.value)
   }

   console.log(e.target.value)
 }


 const handleSubmit = (e) =>{
   //prevent refreshing the page after form submission
   e.preventDefault();
   console.log(query)

   //send data to the server
   var sourceLang,targetLang,message = null
   if(lang1!=null&&lang2!=null&&query!={}){
     if(query.lang=="language1"){
        sourceLang = lang1
        targetLang = lang2
        message = query.text
        setTempText2('')
     }
     else if(query.lang=="language2"){
        sourceLang = lang2
        targetLang = lang1
        message = query.text
        setTempText1('')
     }    
   }
   
   console.log(sourceLang+" "+targetLang+" "+message)

  if(sourceLang!=null&&targetLang!=null&&message!=null){
    fetch('http://localhost:5000/translate', {
      method: 'Post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Source": sourceLang,
        "Target": targetLang,
        "Enquiry": message
      })
    })
     .then(res => res.json())
      .then(data => {
        console.log(data.translation)
        if(query.lang=="language1"){
          setTempText2(data.translation)
        }
        else if(query.lang=="language2"){
          setTempText1(data.translation)
        }

       })
       .catch(err => console.error("Error:", err))
  }

 }


  return(
    <main>
    <div>
    <form onSubmit={handleSubmit} method='post'>
    <div className="container pt-5 pb-5">
    <div className="row translator">
     <button id="translate" type="submit">
      <img src={logo} alt="a logo" className="logo" />
     </button>
     <div className={classnames("col-md-6", "translator_field",textarea1)}>
      <select id="select1" className={textarea1} name="lang1" 
       onChange={optionChange} required>
       <LangDropdown />
      </select>
      <textarea className={textarea1} id="text1" onClick={handleClicked}
       onChange={textChange} name="textarea_field1" 
       placeholder="Type or paste text here to translate"
       value={tempText1} maxlength="150" 
       >
      </textarea>
     </div>
     <div className={classnames("col-md-6", "translator_field",textarea2)}>
      <select id="select2" className={textarea2} name="lang2"
       onChange={optionChange} required>
       <LangDropdown />
      </select>
      <textarea className={textarea2} id="text2" onClick={anotherClicked}
       onChange={textChange} name="textarea_field2"
       placeholder="Or here" value={tempText2}
       maxlength="150" 
       >
      </textarea>
     </div>
    </div>
    </div>
    </form>
    </div>
    </main> 
  
  )
}

export default Content
