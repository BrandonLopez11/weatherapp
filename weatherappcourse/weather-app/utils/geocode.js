const request = require('request')

//This code exports a function geocode using the Node.js module.exports object, which takes two parameters: address and a callback function.
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmxvcGV6MTEiLCJhIjoiY2xkeGh5bm9mMGhuYzN3cGQ0MWhicmx5dSJ9.foVZV6z_OvECYFsXebJkRw&limit=1'
    //The request module is loaded using require to make an HTTP request to a location API at a given URL that includes the provided address value. The request is made with the url and json options set to true to indicate that the API response should be parsed as JSON.
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined) //*undefined is the default 
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    })
}
//Finally, the geocode function is exported using module.exports, making it available to other modules that require this file.
module.exports = geocode 