const express = require('express')
const morgan = require('morgan')
const db_config = require('./configs/db_config')
const config = require('./configs/config')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
db_config.connect_mongodb() // creates connection to mongodb

app.use(morgan('dev')) // morgan is a middleware that logs the requests
app.use(express.json()) // express.json is a middleware that parses the body of the request to json

//routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)

app.get('/', (req, res) => {
    res.send({
        "status": "success",
        "message": "Welcome to the Node Auth API"
    })
});

app.get('/api/docs', (req, res) => {
    res.redirect('https://documenter.getpostman.com/view/15040280/VUjMnkSx')
});

app.use(errorHandler) // error handler middleware
app.listen(config.app.port, () => {
    console.log(`Server is running on port ${config.app.port}`)
});