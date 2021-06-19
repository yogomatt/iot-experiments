import Config from './config'

(function() {
  'use strict';

  const TEMPERATURE_URL = Config.service.app_url + '/temperature'
  const HUMIDITY_URL = Config.service.app_url + '/humidity'

  function getSampleData(type, params) {
    if (type === 'temperature') {
      return getTemperatureData(params)
    }

    if (type === 'humidity') {
      return getHumidityData(params)
    }
  }

  function getTemperatureData(params) {
    const url = new URL(TEMPERATURE_URL)
    return getDataFromRestService(url, params, 'centigrades')
  }

  function getHumidityData(params) {
    const url = new URL(HUMIDITY_URL)
    return getDataFromRestService(url, params, 'percentage')
  }

  function getDataFromRestService(url, params, measureUnit) {
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return fetch(url, {
      method: 'GET'
    })
    .then(result => result.json())
    .catch(error => console.error(error))
  }

  module.exports = {
    getSampleData: getSampleData
  }
}())
