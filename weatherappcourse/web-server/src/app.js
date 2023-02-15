//module provides utilities for working with file and directory paths
const path = require('path')
//module is a popular framework for building web applications and APIs.
const express = require('express')
//module is a view engine for Express that allows for dynamic rendering of templates using Handlebars.
const hbs = require('hbs') //working with partials
//module is a custom module defined in the application that provides a function for geocoding an address.
const geocode = require('./utils/geocode')
//module is another custom module defined in the application that provides a function for retrieving weather forecast data given a latitude and longitude.
const forecast = require('./utils/forecast')


const app = express()

//define paths for Express config
//is a method in Node.js used to join multiple path segments into one path.
//This sets the path to the public folder, which contains static files like CSS, JavaScript, and images.
const publicDirectoryPath = path.join(__dirname, '../public')
//This sets the path to the views folder, which contains the handlebars templates used for rendering the dynamic web pages.
const viewPath = path.join(__dirname, '../templates/views') //to customize the views dir
//This sets the path to the partials folder, which contains reusable components of the handlebars templates.
const partialsPath = path.join(__dirname, '../templates/partials')

//dynamic webpage:
//setup handlebars engine and views locations
app.set('view engine', 'hbs')


app.set('views', viewPath)
hbs.registerPartials(partialsPath)
//registerPartials(): takes a path to the directory where your partials live

//static webpage:
//setup  static directory to serve
app.use(express.static(publicDirectoryPath))



//route to serve up the template
//render index page
//sets up a route for the root URL of the website (i.e., the home page) and uses the res.render() method to render a template called "index" with some variables passed in as an object. 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Brandon Lopez'
    })
})

//render about page
//sets up a route for the "/about" URL and again uses the res.render() method to render a template called "about". In this case, the template includes variables for the page title and author name as well.
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Brandon lopez'
    })
})


//render help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Brandon lopez'
    })
})



app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    // The callback function takes two parameters: error, and an object containing latitude, longitude, and location.
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })

    })


})


//. When a user makes a GET request to this endpoint, the code first logs the value of the search parameter in the query string using console.log(). 
app.get('/products', (req, res) => {
    console.log(req.query.search) //prints object to the console: query string with the request was parsed by express
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term' // runs if there is no search
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

//The second route is for the /help/* endpoint, where * acts as a wildcard character. This route handles requests for any path that begins with /help/ but doesn't match any other defined routes. 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brandon lopez',
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Brandon lopez',
        errorMessage: 'Page not found.'
    })
})


//he listen method takes two arguments: the port number on which to listen for incoming requests, and a callback function that gets executed once the server is up and running.

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
//In this case, the callback function simply logs a message to the console indicating that the server is up and running
