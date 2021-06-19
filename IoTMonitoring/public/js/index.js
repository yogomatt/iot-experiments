import App from './app'
import PageFooter from './pageFooter'
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'


ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('app'))
