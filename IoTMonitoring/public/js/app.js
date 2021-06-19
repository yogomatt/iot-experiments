import React from 'react'
import {Route} from 'react-router-dom'
import Menu from './menu'
import Main from './main'
import History from './history'
import PageFooter from './pageFooter'

class App extends React.Component {
  render () {
    return (
      <div>
        <Menu />
        <Route exact path="/" component={Main} />
        <Route exact path="/history" component={History} />
        <PageFooter />
      </div>
    )
  }
}

module.exports = App
