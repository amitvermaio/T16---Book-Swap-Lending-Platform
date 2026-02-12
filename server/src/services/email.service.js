import 'dotenv/config';
import nodemailer from 'nodemailer';
import debug from 'debug';
 
const dbgr= debug('dev:email-service');

const transporter = nodemailer.createTransport({
  secure: true,
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    dbgr('Error connecting to email server:', error);
  } else {
    dbgr('Email server is ready to send messages');
  }
});

const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: `"Reader Haven" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    dbgr('Email sent:', info.messageId);
  } catch (error) {
    dbgr('Error sending email:', error);
  }
}

export default sendMail;