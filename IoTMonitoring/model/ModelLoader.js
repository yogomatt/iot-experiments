var ExpressCassandra = require('express-cassandra')

var client = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['192.168.0.100'],
    protocolOptions: { port: 9042 },
    keyspace: 'iotspace',
    queryOptions: {consistency: ExpressCassandra.consistencies.one},
    authProvider: new ExpressCassandra.driver.auth.PlainTextAuthProvider('dba', 'Secure12')
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'NetworkTopologyStrategy'
    },
    migration: 'safe',
    createKeyspace: false,
    createTable: false
  }

})

module.exports = client
