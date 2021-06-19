var express = require('express')
var controller = require('./controller/MeasureController')
// This is required for POST and UPLOAD
var bodyParser = require('body-parser')
// var io = require('socket.io')

// This is necessary for the POST method with form data
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false})

var app = express()

app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(express.static('node_modules/jquery/dist'))
app.use(express.static('node_modules/plotly.js/dist'))

// This responds a GET request for /temperature.
app.get('/temperature', controller.findTemperature)

// This responds a GET request for /humidity.
app.get('/humidity', controller.findHumidity)

// for application/json use bodyParser.json()
app.post('/temperature', bodyParser.urlencoded({ extended: false}), controller.recordTemperature)

app.post('/humidity', bodyParser.urlencoded({ extended: false}), controller.recordHumidity)

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
})

//io.set('origins', 'http://' + server.address().address + server.address().port);
