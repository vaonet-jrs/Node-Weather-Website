const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=5c9161c5e6cb459c7b7fbeb8969f6e6f&query=37.8267&query=' +
    latitude +
    ',' +
    longitude +
    '&units=f'

  request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {
      if (error) {
        callback('Unable to connect to weather service!', undefined)
      } else if (body.error) {
        callback('Unable to find location', undefined)
      } else {
        callback(
          undefined,
          response.body.current.weather_descriptions[0] +
            '. It is currently ' +
            response.body.current.temperature +
            ' degress out.'
        )
      }
    })
  })
}

module.exports = forecast