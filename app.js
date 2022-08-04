const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev')) // morgan is a middleware that logs the requests
app.use(express.json()) // express.json is a middleware that parses the body of the request to json

app.get('/', (req, res) => {
    res.send({
        "status": "success",
        "message": "Welcome to the Node Auth API"
    })
    });