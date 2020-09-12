import React from 'react'
import Header from "./components/Header"
import MainContent from "./components/MainContent"
import Footer from "./components/Footer"

function DictionaryApp() {
  return (
   
    <div className="body_container">
      <div className="body_title">
       <Header heading="Dictionary"/>
      </div>
      <div className="body_content">
       <MainContent />
      </div>
      <div className="body_footer">
       <Footer />
      </div> 
    </div>
  
  )
}

export default  DictionaryApp
