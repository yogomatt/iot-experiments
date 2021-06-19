import React from 'react'
import ChartStatic from './chartStatic'
import Config from './config'
import ChartUtils from './chartUtils'

class ChartStaticWithFilter extends React.Component {

  constructor(props) {
    super(props)

    // bind once here, better than multiple times in render
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleDeviceChange = this.handleDeviceChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);

    let currentDate = new Date()

    this.state = {
      sampleType: Config.sampleTypes[0],
      sampleDevice: Config.sampleTypes[0].devices[0].name,
      sampleDate: currentDate.getFullYear()
        + '-' + (currentDate.getMonth() + 1)
        + '-' + currentDate.getDate()
    }
  }

  render () {
    console.log('ChartStaticWithFilter: Rendering component')

    let chart = undefined
    let message = undefined

    if (ChartUtils.isValidDate(this.state.sampleDate)) {
      chart = <ChartStatic type={this.state.sampleType.name}
          unit={this.state.sampleType.unit}
          device={this.state.sampleDevice}
          date={this.state.sampleDate} />
    } else {
      if (!this.state.sampleDate.length <= 0) {
        message = <p>Invalid Date</p>
      }
    }

    return (
      <div>
        <div>
          <select value={this.state.sampleType.name}
            onChange={this.handleTypeChange}>
            {
              Config.sampleTypes.map((typeOption, i) => {
                return <option key={typeOption.name}>{typeOption.name}</option>
              })
            }
          </select>
          <select value={this.state.sampleDevice}
            onChange={this.handleDeviceChange}>
            {
              this.state.sampleType.devices.map((device, i) => {
                return <option key={device.name}>{device.name}</option>
              })
            }
          </select>
          <input type="text" onChange={this.handleDateChange}
            value={this.state.sampleDate} />
          {message}
        </div>

        {chart}
      </div>
    )
  }

  handleTypeChange(event) {
    let selectedSampleType = this.getSampleType(event.target.value)
    // set the type object based on the selection
    this.setState({
      sampleType: selectedSampleType
    })
    // set the first device as selected by default
    this.setState({
      sampleDevice: selectedSampleType.devices[0].name
    })
  }

  handleDeviceChange(event) {
    this.setState({
      sampleDevice: event.target.value
    })
  }

  handleDateChange(event) {
    this.setState({
      sampleDate: event.target.value
    })
  }

  getSampleType(name) {
    let selectedType = Config.sampleTypes.filter(typeOption => {
      return typeOption.name === name
    })

    return selectedType[0]
  }
}

module.exports = ChartStaticWithFilter
