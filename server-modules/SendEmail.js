// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

const ImoleSendEmail = (to, subject, text)=>{
    const SENDGRID_API_KEY = "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";
    sgMail.setApiKey(SENDGRID_API_KEY);
    
    const msg = {
    to: to,
    from: 'gianluca.ling@aol.com',
    subject: subject,
    text: text,
    html: text
    };
    sgMail.send(msg).catch((reason)=>console.log(reason));
}

module.exports = ImoleSendEmail;