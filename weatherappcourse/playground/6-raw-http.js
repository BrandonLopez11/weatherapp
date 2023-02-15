const http = require('http')
const url = 'http://api.weatherstack.com/current?access_key=access_key=173f9a4906b205c90440b3abf5669c44&query&units=f'

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
        console.log(chunk)
    })
    response.on('end', () => {

        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('An error', error)
})
request.end()
