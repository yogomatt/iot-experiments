import React from 'react'
import Chart from './chartStatic'
import ChartStaticWithFilter from './chartStaticWithFilter'

class History extends React.Component {

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <h3>Sample History</h3>
            <ChartStaticWithFilter />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = History
