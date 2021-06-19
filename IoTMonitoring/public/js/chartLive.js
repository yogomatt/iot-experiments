import React from 'react'
// import Plot from 'react-plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'
const Plot = createPlotlyComponent(Plotly)
import ChartUtils from './chartUtils'
import Config from './config'

class ChartLive extends React.Component {

  constructor(props) {
    super(props)

    this.devices = []

    this.state = {
      data: this.initializeTraces(),
      layout: ChartUtils.getLayout()
    }
  }

  initializeTraces() {
    // Get the devices configured for the sample type
    Config.sampleTypes.forEach((type) => {
      if (type.name === this.props.type) {
        this.devices = type.devices
      }
    })

    let traces = []
    this.devices.forEach((device) => {
      let trace = {
        x: [],
        y: [],
        name: device.name,
        mode: device.mode,
        line: {color: device.color}
      }

      traces[device.traceNumber] = trace
    })

    return traces
  }

  componentDidMount() {
    console.log('ChartLive: Component did mount')

    this.devices.forEach((device) => {
      ChartUtils.getChartData(
        this.props.type,
        device.name,
        this.props.unit,
        new Date(),
        null,
        (series) => {
          // if trace is not undefined
          if (series) {
            // make a copy of the data array
            let traces = this.state.data.slice()
            // update x and y axis of the device trace
            traces[device.traceNumber].x = series.x
            traces[device.traceNumber].y = series.y
            // update the last time from the sample
            let lastTime = ChartUtils.getTimeFromSeries(series)
            if (lastTime) {
              device.lastTime = lastTime
            }

            this.setState({
              data: traces,
              layout: ChartUtils.getLayout(this.props.unit, true)
            })
          }
        }
      )
    })

    // assume that at least one sample type is allowed for any device
    this.timerId = setInterval(
      () => this.pullData(),
      15000
    )
  }

  componentWillUnmount() {
    console.log('ChartLive: Component will unmount')
    clearInterval(this.timerId);
  }

  pullData() {
    let update = {
      x: [],
      y: []
    }

    this.devices.forEach((device) => {
      ChartUtils.getChartData(
        this.props.type,
        device.name,
        this.props.unit,
        new Date(),
        device.lastTime,
        (series) => {
          if (series) {
            update.x[device.traceNumber] = series.x
            update.y[device.traceNumber] = series.y

            let lastTime = ChartUtils.getTimeFromSeries(series)
            if (lastTime) {
              device.lastTime = lastTime
            }
          } else {
            update.x[device.traceNumber] = []
            update.y[device.traceNumber] = []
          }

          let toUpdate = []
          for (var i = 0; i < this.devices.length; i++) {
            if (update.x[this.devices[i].traceNumber]) {
              toUpdate.push(i)
            }
          }

          if (toUpdate.length === this.devices.length) {
            Plotly.extendTraces('livechart-' + this.props.type, update, toUpdate, 120)
          }
        }
      )
    })
  }

  render() {
    console.log('ChartLive: Rendering component');

    return React.createElement(Plot, {
      data: this.state.data,
      layout: this.state.layout,
      divId: 'livechart-' + this.props.type,
      //onInitialized: function(figure) {this.setState(figure)},
      onUpdate: figure => {
        // console.log('updating chart');
        // this.setState(figure)
      }
    })
  }
}

module.exports = ChartLive
