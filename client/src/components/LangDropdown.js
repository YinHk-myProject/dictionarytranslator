import React from "react"
import Menu from "./Menu"
import LangData from "./LangData.js"


function LangDropdown (){

    const LangMenu = LangData.map(item => <Menu key={item.id} menu={item} />)
  
      return(
       
          LangMenu
      ) 
  
  }

export default LangDropdown