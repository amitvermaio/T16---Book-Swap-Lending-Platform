/* eslint-disable no-undef */
import "dotenv/config";
import nodemailer from "nodemailer";
import debug from "debug";

const dbgr = debug('dev:email');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// eslint-disable-next-line no-unused-vars
transporter.verify((error, success) => {
  if (error) {
    dbgr('Error connecting to email server:', error);
  } else {
    dbgr('Email server is ready to send messages');
  }
});


const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Reader Haven" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    dbgr('Message sent: %s', info.messageId);
    dbgr('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    dbgr('Error sending email:', error);
  }
};

export default sendEmail;