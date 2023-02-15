// These functions are used to fetch the latitude, longitude, and current weather forecast for a given location.
// const request = require('request') // load in 'request' module
const geocode = require('./utils/geocode')//load in geocode.js from utils directory
const forecast = require('./utils/forecast') //load in forecast.js from utils directory

//The process.argv array is used to get the command line arguments passed to the script. process.argv[0] gives the path of the Node.js executable and process.argv[1] gives the path of the script being run. Any additional arguments passed to the script will be accessible from process.argv[2] and onwards.
const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log(error)
        }
        //The callback function is called with an error message and the forecast data. If there is an error, the error message is printed to the console. Otherwise, the location and forecast data are printed to the console.
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            console.log(location)
            console.log(forecastData)
        })
    })
}
//Overall, this code fetches and prints the weather forecast for a location provided as a command line argument.