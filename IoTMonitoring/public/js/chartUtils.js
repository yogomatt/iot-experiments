import RestHandler from './restHandler'
import Config from './config'

(function() {
  'use strict';

  function getLayout(unit, showLegend) {
    // trick to clone the layout object
    let layout = JSON.parse(JSON.stringify(Config.layout))

    if (unit) {
      layout.yaxis = {
        title: unit,
        titlefont: {
          family: 'Courier New, monospace',
          size: 16,
          color: '#7f7f7f'
        }
      }
    }

    if (showLegend) {
      layout.showLegend = showLegend
    }

    return layout
  }

  function getChartData(type, device, unit, date, time, callback) {
    RestHandler.getSampleData(type, {
      // device: 'DHT22',
      device: device,
      // date: new Date(2018, 3, 8, 0, 0, 0, 0)
      date: date,
      time: time
    })
    .then(result => {
      console.log('ChartUtils: Result size from rest service: ' + result.length)
      var series = undefined

      if (result.length > 0) {
        series = getChartSeries(unit, result)
      }

      callback(series)
    })
  }

  function getChartSeries(sampleUnit, result) {
    var xSeries = []
    var ySeries = []

    result.forEach(function(item) {
      // build the date string as UTC, for example: '2011-04-11T10:20:30Z'
      xSeries.push(new Date(item.sample_date + 'T' + item.sample_time))
      ySeries.push(parseFloat(item.measure[sampleUnit]))
    })

    // For proper behavior of the chart it is necessary to return in asc order,
    // so reverse the array since it is received in desc order
    return {
      x: xSeries.reverse(),
      y: ySeries.reverse()
    }
  }

  function getTimeFromSeries(series) {
    let lastTime = undefined

    if (series.x.length > 0) {
      let lastDate = series.x[series.x.length - 1]
      lastTime = lastDate.getHours() + ':'
      + lastDate.getMinutes() + ':'
      + lastDate.getSeconds()
    }

    return lastTime
  }

  // Credits: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  // Validates that the input string is a valid date formatted as "yyyy-MM-dd"
  function isValidDate(dateString) {
    // First check for the pattern
    if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString))
    return false;

    // Parse the date parts to integers
    var parts = dateString.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
    return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  }

  module.exports = {
    getLayout: getLayout,
    getChartData: getChartData,
    getChartSeries: getChartSeries,
    getTimeFromSeries: getTimeFromSeries,
    isValidDate: isValidDate
  }
}())
