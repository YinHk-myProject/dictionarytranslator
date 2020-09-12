import React from "react"
import "../styles.css"


function Header(props) {

    return (
      <header>
       <div className="head">
        <div className="title">
         <h1 id="head">{props.heading}</h1>
        </div>
       </div>
      </header>

    )
}

export default Header