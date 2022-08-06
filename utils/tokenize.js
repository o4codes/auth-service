const jwt = require('jsonwebtoken');
const config = require('../configs/config');

function encrypt(payload) {
    const token = jwt.sign(payload, config.jwt.secret, {expiresIn: '1h'});
    return token;
}

function decrypt(token) {
    const payload = jwt.verify(token, config.jwt.secret);
    return payload;
}

module.exports = {
    encrypt,
    decrypt
}