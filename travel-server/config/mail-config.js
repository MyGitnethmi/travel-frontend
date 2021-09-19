const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vishvajayasanka@gmail.com',
    pass: 'jgyvwacsmbyxwrtq'
  }
});

module.exports = transporter;
