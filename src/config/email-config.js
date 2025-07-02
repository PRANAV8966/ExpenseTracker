const nodemailer = require('nodemailer');
const { EMAIL_ID, PASSWORD } = require('../config/server-config.js');


const Sender = nodemailer.createTransport({
    host: 'smtp.Gmail.com',
    auth: {
        user: EMAIL_ID,
        pass: PASSWORD
    },
})

module.exports = Sender;