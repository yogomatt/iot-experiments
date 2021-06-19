import React from 'react'
import RestHandler from './restHandler'
// import Plot from 'react-plotly.js'
import createPlotlyComponent from 'react-plotly.js/factory'
const Plot = createPlotlyComponent(Plotly);
import ChartUtils from './chartUtils'

class ChartStatic extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      type: this.props.type,
      device: this.props.device,
      unit: this.props.unit,
      date: this.props.date,
      data: [],
      layout: ChartUtils.getLayout()
    }
  }

  componentDidMount() {
    console.log('ChartStatic: Component did mount')

    ChartUtils.getChartData(
      this.props.type,
      this.props.device,
      this.props.unit,
      new Date(this.props.date + 'T00:00:00'),
      null,
      (series) => {
        // if trace is not undefined
        if (series) {
          this.setState({
            data: [{
              x: series.x,
              y: series.y,
              mode: 'scatter',
              line: {color: '#80CAF6'}
            }],
            layout: ChartUtils.getLayout(this.props.unit)
          })
        }
      }
    )
  }

  componentWillUnmount() {
    console.log('ChartStatic: Component will unmount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('ChartStatic: Component will receive props')

    ChartUtils.getChartData(
      nextProps.type,
      nextProps.device,
      nextProps.unit,
      new Date(nextProps.date + 'T00:00:00'),
      null,
      (series) => {
        // if trace is not undefined
        if (series) {
          this.setState({
            data: [{
              x: series.x,
              y: series.y,
              mode: 'scatter',
              line: {color: '#80CAF6'}
            }],
            layout: ChartUtils.getLayout(nextProps.unit)
          })
        }
      }
    )
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('ChartStatic: Component will update')
  }

  render() {
    console.log('ChartStatic: Rendering component')

    return React.createElement(Plot, {
      data: this.state.data,
      layout: this.state.layout,
      divId: 'chart-history',
      onUpdate: figure => {
        // console.log('updating chart');
        // this.setState(figure)
      }
    })
  }
}

module.exports = ChartStatic
