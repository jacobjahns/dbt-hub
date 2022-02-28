const nodemailer = require('nodemailer')

module.exports = transporter = nodemailer.createTransport({
    host: 'smtp.web.de',
    port: 587,
    auth: {
      user: 'dbt-hub@web.de',
      pass: process.env.WEBDE_PW,
    }
});