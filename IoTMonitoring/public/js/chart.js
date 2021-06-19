var lastTimeTemp = '00:00:00', lastTimeHum = '00:00:00'
var temperatureChatLoaded = false; humidityChartLoaded = false;

$(document).ready(function() {
  drawTemperatureChart()
  drawHumidityChart()
})

function drawTemperatureChart() {
  var series = {
    x: [], y: []
  }

  $.get('/temperature', {device: 'DHT22', date: new Date()}, function(result) {
    console.log('Temperature result size: ' + result.length)

    if (result.length > 0) {
      series = getChartSeries('centigrades', result)

      var lastDate = series.x[series.x.length - 1]
      lastTimeTemp = lastDate.getHours() + ':' + lastDate.getMinutes() + ':' + lastDate.getSeconds()
    }
  }).fail(function() {
    console.log('No temperature results received');
  }).always(function() {
    drawChart('temperature-graph', series.x, series.y, function() {
      temperatureChatLoaded = true
      startTimer()
    })
  })
}

function drawHumidityChart() {
  var series = {
    x: [], y: []
  }

  $.get('/humidity', {device: 'DHT22', date: new Date()}, function(result) {
    console.log('Humidity result size: ' + result.length)

    if (result.length > 0) {
      series =  getChartSeries('percentage', result)

      var lastDate = series.x[series.x.length - 1]
      lastTimeHum = lastDate.getHours() + ':' + lastDate.getMinutes() + ':' + lastDate.getSeconds()
    }
  }).fail(function() {
    console.log('No humidity results received');
  }).always(function() {
    drawChart('humidity-graph', series.x, series.y, function() {
      humidityChartLoaded = true
      startTimer()
    })
  })
}

function getChartSeries(measure, result) {
  var xSeries = []
  var ySeries = []

  result.forEach(function(item) {
    // build the date string as UTC, for example: '2011-04-11T10:20:30Z'
    xSeries.push(new Date(item.sample_date + 'T' + item.sample_time))
    ySeries.push(parseFloat(item.measure[measure]))
  })

  // For proper behavior of the chart it is necessary to return in asc order,
  // so reverse the array since it is received in desc order
  return {
    x: xSeries.reverse(),
    y: ySeries.reverse()
  }
}

function drawChart(graphDOMId, xSeries, ySeries, callback) {
  console.log(xSeries)
  console.log(ySeries)

  var data = [{
    x: xSeries,
    y: ySeries,
    mode: 'lines',
    line: {color: '#80CAF6'}
  }]

  var layout = {
    // autosize: false,
    // width: '100%',
    // height: '100%',
    // title: 'Sensor Chart'
    margin: {
      l: 50,
      r: 50,
      b: 50,
      t: 50,
      pad: 4
    },
    // paper_bgcolor: '#ffffff',
    // plot_bgcolor: '#000000'
  }

  Plotly.plot(graphDOMId, data, layout)

  callback()
}

function startTimer() {
  if (!temperatureChatLoaded || !humidityChartLoaded) return

  console.log('Starting timer for updates')
  // var cnt = 0
  var tempCompleted = true, humCompleted = true

  var interval = setInterval(function () {
    if (tempCompleted && humCompleted) {
      tempCompleted = false
      humCompleted = false

      updateTemperatureChart(function() {
        tempCompleted = true
      })

      updateHumidityChart(function() {
        humCompleted = true
      })
    }

    // cnt++
    // if (cnt === 50) clearInterval(interval)
  }, 15000);
}

function updateTemperatureChart(callback) {
  console.log('Temperature last time: ' + lastTimeTemp)

  $.get('/temperature', {device: 'DHT22', date: new Date(), time: lastTimeTemp}, function(result) {
    console.log('Temperature update size: ' + result.length)

    if (result.length > 0) {
      var series = getChartSeries('centigrades', result)

      var lastDate = series.x[series.x.length - 1]
      lastTimeTemp = lastDate.getHours() + ':' + lastDate.getMinutes() + ':' + lastDate.getSeconds()

      updateChart('temperature-graph', series.x, series.y)
    }
  })

  callback()
}

function updateHumidityChart(callback) {
  console.log('Humidity last time: ' + lastTimeHum)

  $.get('/humidity', {device: 'DHT22', date: new Date(), time: lastTimeHum}, function(result) {
    console.log('Humidity update size: ' + result.length)

    if (result.length > 0) {
      var series = getChartSeries('percentage', result)

      var lastDate = series.x[series.x.length - 1]
      lastTimeHum = lastDate.getHours() + ':' + lastDate.getMinutes() + ':' + lastDate.getSeconds()

      updateChart('humidity-graph', series.x, series.y)
    }
  })

  callback()
}

function updateChart(graphDOMId, xSeries, ySeries) {
  if (xSeries.length > 0) {
    console.log(xSeries);
    console.log(ySeries);

    var update = {
      x: [xSeries],
      y: [ySeries]
    }

    Plotly.extendTraces(graphDOMId, update, [0], 1440)
  }
}
