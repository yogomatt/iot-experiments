module.exports = {
  service: {
    app_host: '192.168.0.102',
    app_port: '8081',
    app_url: 'http://192.168.0.102:8081',
    db_host: '192.168.0.100',
    db_port: '9042'
  },
  sampleTypes: [
    {
      name: 'temperature',
      unit: 'centigrades',
      devices: [
        {
          name: 'DHT22',
          mode: 'scatter',
          color: '#80CAF6',
          traceNumber: 0,
          lastTime: '00:00:00',
        },
        {
          name: 'ds18b20',
          mode: 'scatter',
          color: '#80CA33',
          traceNumber: 1,
          lastTime: '00:00:00',
        }
      ]
    },
    {
      name: 'humidity',
      unit: 'percentage',
      devices: [
        {
          name: 'DHT22',
          mode: 'scatter',
          color: '#80CAF6',
          traceNumber: 0,
          lastTime: '00:00:00'
        }
      ]
    }
  ],
  layout: {
    // autosize: false,
    width: 1200,
    height: 600,
    // title: 'Sensor Chart'
    margin: {l: 50, r: 50, b: 50, t: 50, pad: 4},
    // paper_bgcolor: '#ffffff',
    // plot_bgcolor: '#000000',
    // showlegend: true,
    // legend: {"orientation": "h"}
  }
}
