import React from 'react'
import ReactDOM from 'react-dom'
import "./styles.css"
import DictionaryApp from './DictionaryApp'
import TranslateApp from './TranslationApp'
import {Route,Link, Switch, BrowserRouter as Router } from 'react-router-dom'

const routing = (
    <Router>
      <div className="main_container">
       <div id="navagation">
        <nav className="navbar navbar-dark bg-dark">
         <a className="navbar-brand text-white">My App</a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
         </button>
        </nav>
       
        <div className="collapse navbar-dark navbar-expand" id="navbarToggleExternalContent">
         <div className="bg-dark p-4">
          <ul className="navbar-nav bd-navbar-nav flex-row mr-auto">
           <li className="nav-item">
            <Link to="/" className="nav-link">Dictionary</Link>
           </li>
           <li className="nav-item">
            <Link to="/translate" className="nav-link">Translator</Link>
           </li>
          </ul>
         </div>
        </div>
       </div>
       
        <Switch>
         <Route exact path="/" component={DictionaryApp} />
         <Route path="/translate" component={TranslateApp} />
        </Switch>
       
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'))


