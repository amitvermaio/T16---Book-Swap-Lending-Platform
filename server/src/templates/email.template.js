export const otpTemplate = ({ name, otp, purpose }) => `
<div style="font-family: Arial; max-width: 600px; margin:auto;">
  <h2>${purpose}</h2>
  <p>Hi ${name},</p>
  <p>Your OTP is:</p>
  <h1 style="letter-spacing:4px;">${otp}</h1>
  <p>This OTP is valid for 10 minutes.</p>
  <br/>
  <p>— Reader Haven Team</p>
</div>
`;


export const requestTemplate = ({ ownerName, bookTitle, requesterName }) => `
<div>
  <h3>New Book Request 📬</h3>
  <p>Hi ${ownerName},</p>
  <p><b>${requesterName}</b> has requested your book:</p>
  <h4>${bookTitle}</h4>
  <p>Login to respond to the request.</p>
</div>
`;


export const returnReminderTemplate = ({ name, bookTitle, dueDate }) => `
<div>
  <h3>Return Reminder ⏳</h3>
  <p>Hi ${name},</p>
  <p>This is a reminder to return:</p>
  <h4>${bookTitle}</h4>
  <p>Due Date: <b>${dueDate}</b></p>
</div>
`;


export const welcomeTemplate = ({ name }) => `
<div>
  <h2>Welcome to Reader Haven 📚</h2>
  <p>Hey ${name},</p>
  <p>Your account has been successfully created.</p>
  <p>Start swapping, lending books & discovering stories.</p>
  <br/>
  <b>Happy Reading!</b>
</div>
`;
