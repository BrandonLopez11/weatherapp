const request = require('request') //load in 'request' module


//use destructuring syntax
//This code exports a function forecast using the Node.js module.exports object, which takes three parameters: latitude, longitude, and a callback function.
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=173f9a4906b205c90440b3abf5669c44&query=' + latitude + ',' + longitude + '&units=f'
    //The request module is loaded using require to make an HTTP request to a weather API at a given URL that includes the provided latitude and longitude values. The request is made with the url and json options set to true to indicate that the API response should be parsed as JSON.
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}
//Finally, the forecast function is exported using module.exports, making it available to other modules that require this file.
module.exports = forecast

