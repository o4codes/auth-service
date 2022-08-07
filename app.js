const express = require('express')
const morgan = require('morgan')
const db_config = require('./configs/db_config')
const config = require('./configs/config')
const authRoute = require('./routes/auth')

const app = express()
db_config.connect_mongodb() // creates connection to mongodb

app.use(morgan('dev')) // morgan is a middleware that logs the requests
app.use(express.json()) // express.json is a middleware that parses the body of the request to json


//routes
app.use('/api/v1/auth', authRoute)

app.get('/', (req, res) => {
    res.send({
        "status": "success",
        "message": "Welcome to the Node Auth API"
    })
});

app.listen(config.app.port, () => {
    console.log(`Server is running on port ${config.app.port}`)
});