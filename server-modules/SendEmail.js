// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

const ImoleSendEmail = (to, subject, text)=>{
    const SENDGRID_API_KEY = "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";
    sgMail.setApiKey(SENDGRID_API_KEY);
    
    const msg = {
    to: to,
    from: 'gianluca.ling@gmail.com',
    subject: subject,
    text: text,
    html: `<strong>${text}</strong>`
    };
    sgMail.send(msg).catch((reason)=>console.log(reason));
}

module.exports = ImoleSendEmail;