const mail_config = require('../config/mail_config');

function send_mail(to, subject, body) {
    const {transporter, mail_from} = mail_config;
    const mailOptions = {
        from: mail_from,
        to,
        subject,
        html: body
    };
    return transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
    
}

module.exports = {
    send_mail
}