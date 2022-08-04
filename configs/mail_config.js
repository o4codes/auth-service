const nodemailer = require('nodemailer');
const config = require('../config');

const {mail: {username, password, oauth_client_id, oauth_client_secret, oauth_refresh_token}} = config;


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: username,
      pass: password,
      clientId: oauth_client_id,
      clientSecret: oauth_client_secret,
      refreshToken: oauth_refresh_token,
    }
  });

module.exports = {
    transporter, 
    mail_from: "Node Auth API" 
};