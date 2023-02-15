console.log('Client side javascript file is loaded');


const weatherForm = document.querySelector('form')

const search = document.querySelector('input')
//gives us access to 'search'
//When the response is received from the web server, the code checks if the response contains an error. If there is an error, it updates the text content of an HTML element with an ID of "message-1" to display the error message. 
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    //This is a JavaScript code that runs in the client-side, i.e., in a web browser. It adds an event listener to a form element in a web page that allows users to input a location to get weather information. When the form is submitted, it prevents the default form submission behavior and sends an HTTP GET request to a web server running on the local machine on port 3000, passing the user input as a query string parameter named "address".
    //When the response is received from the web server, the code checks if the response contains an error. If there is an error, it updates the text content of an HTML element with an ID of "message-1" to display the error message. Otherwise, it updates the text content of two HTML elements with IDs of "message-1" and "message-2" to display the location and weather forecast information retrieved from the web server. The first message is set to "Loading..." to indicate that the request is being processed.
    //The code uses the fetch API, which is a modern way to make HTTP requests in JavaScript, to send the request and receive the response. When the response is received, it is converted to JSON format using the json() method, which returns a promise that resolves to the parsed JSON object.
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

