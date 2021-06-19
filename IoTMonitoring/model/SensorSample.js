var models = require('./ModelLoader')

var SensorSampleEntity = {
  fields: {
    sample_date: 'date',
    sample_type: 'text',
    device_id: 'text',
    sample_time: 'time',
    measure: {
      type: 'map',
      typeDef: '<text, decimal>'
    },
  },
  key: [['sample_date', 'sample_type', 'device_id'], 'sample_time'],
  clustering_order: {'sample_time': 'desc'},
  table_name: 'sensorsample',
  indexes: ['sample_time']
}

console.log('Initializing SensorSample entity');

var SensorSampleModel = models.loadSchema('SensorSample', SensorSampleEntity)

// console.log(models.instance.SensorSample === SensorSampleModel)

SensorSampleModel.syncDB(function(err, result) {
  if (err) throw err
  if (result == true) console.log('Database schema updated');
  if (result == false) console.log('No schema change detected');
})

module.exports = SensorSampleModel
