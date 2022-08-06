const mongoose = require('mongoose');
const config = require('./config');

const {db: {host, port, name}} = config;
const connectionString = `mongodb://${host}:${port}/${name}`

function connect_mongodb() {
    mongoose.connect(connectionString, {useNewUrlParser: true}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDB');
        }
    });
}

module.exports = {
    connect_mongodb
}