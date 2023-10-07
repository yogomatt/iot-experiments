var SensorSample = require('../model/SensorSample')
var ExpressCassandra = require('express-cassandra')

exports.findTemperature = function(req, res) {
  findSensorSamples(req, res, 'Temperature')
}

exports.findHumidity = function(req, res) {
  findSensorSamples(req, res, 'Humidity')
}

function findSensorSamples(req, res, type) {
  console.log(req.query);
  var date = new Date()
  var deviceId = ''
  var time = '00:00:00'

  if (req.query.date) date = new Date(req.query.date)
  if (req.query.device) deviceId = req.query.device
  if (req.query.time) time = req.query.time

  var sampleDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

  SensorSample.find({
    sample_date: ExpressCassandra.datatypes.LocalDate.fromString(sampleDate),
    sample_type: type,
    device_id: deviceId,
    sample_time: {'$gt': ExpressCassandra.datatypes.LocalTime.fromString(time)}
  }, function(err, result) {
    if (err) {
      console.log(err)
      res.send(err)
      return
    }

    res.setHeader("Content-Type", "application/json")

    if (result) {
      res.json(result)
      // console.log('Found sample: ' + JSON.stringify(result))
      console.log('Found samples: ' + result.length)
    } else {
      res.status(404).send({ error: 'Samples not found!' })
      console.log('No result found');
    }

  })
}

exports.recordTemperature = function(req, res) {
  console.log('Request body:' + JSON.stringify(req.body));
  var sample = new SensorSample({
    sample_date: ExpressCassandra.datatypes.LocalDate.fromString(req.body.sampleDate),
    sample_type: 'Temperature',
    device_id: req.body.device,
    sample_time: ExpressCassandra.datatypes.LocalTime.fromString(req.body.sampleTime),
    measure: {
      centigrades: req.body.valueCentigrades
    }
  })

  sample.save(function(err) {
    if (err) {
      console.log(err)
      return
    }

    res.send('Sample Saved')
    console.log('Sample ' + JSON.stringify(sample.measure) + ' saved');
  })
}

exports.recordHumidity = function(req, res) {
  // console.log('Request body:' + JSON.stringify(req.body));
  var sample = new SensorSample({
    sample_date: ExpressCassandra.datatypes.LocalDate.fromString(req.body.sampleDate),
    sample_type: 'Humidity',
    device_id: req.body.device,
    sample_time: ExpressCassandra.datatypes.LocalTime.fromString(req.body.sampleTime),
    measure: {
      percentage: req.body.value
    }
  })

  sample.save(function(err) {
    if (err) {
      console.log(err)
      return
    }

    res.send('Sample Saved')
    console.log('Sample ' + JSON.stringify(sample.measure) + ' saved');
  })
}
