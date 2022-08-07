const mongoose = require('mongoose');
const validator = require('validator');

user_schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true,
        enum: ['user', 'staff', 'manager', 'admin']
    },

    is_verified: {
        type: Boolean,
        default: false
    },

    is_logged_in: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
    versionKey: false
    },
);

user_model = mongoose.model('User', user_schema);
module.exports = user_model;