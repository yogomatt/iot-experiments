import React from 'react'
import {
  Route,
  NavLink
} from 'react-router-dom'

class Menu extends React.Component {
  render () {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src="images/monkey.png" width="30" height="30" alt=""></img>
          Dashboard
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <div className="nav-item nav-link">
              <NavLink to="/" activeClassName="active">Home</NavLink>
            </div>
            <div className="nav-item nav-link">
              <NavLink to="/history" activeClassName="active">History</NavLink>
            </div>
          </ul>
        </div>
      </nav>)
  }
}

module.exports = Menu
