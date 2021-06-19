import React from 'react'
import ChartLive from './chartLive'

class Main extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <h3>Temperature</h3>
            <ChartLive type="temperature" unit="centigrades" />
          </div>
          <div className="col-sm-12 col-md-12">
            <h3>Humidity</h3>
            <ChartLive type="humidity" unit="percentage" />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Main
