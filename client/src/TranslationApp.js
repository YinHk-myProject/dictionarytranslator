import React from 'react'
import Header from "./components/Header"
import Content from "./components/Content"
import Footer from "./components/Footer"


function TranslateApp() {
    return (
     
      <div className="body_container">
        <div className="body_title">
         <Header heading="Translator"/>
        </div>
        <div className="body_content">
         <Content />
        </div>
        <div className="body_footer">
         <Footer />
        </div>
      </div>
    
  
    )
  }
  
  export default  TranslateApp
  

