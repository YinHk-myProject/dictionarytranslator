import React from "react";


function Menu (props){
     

    return(
        <React.Fragment>
        <option selected hidden>Select a language</option>
        <option id={props.menu.id} value={props.menu.Code}>{props.menu.Name}</option>
        </React.Fragment>
        )
}


export default Menu