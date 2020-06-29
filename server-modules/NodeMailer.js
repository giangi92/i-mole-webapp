const nodemailer = require("nodemailer");

const SendEmail = (to,subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'gianluca.ling@gmail.com',
          pass: 'BHQfjje9', 
        },
      });

       // send mail with defined transport object
    transporter.sendMail({
        from: '"Grande capo di Imole"gianluca.ling@gmail.com', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: '', // plain text body
        html: text, // html body
    }).then(()=>{console.log('Messaggio inviato...forse')}).catch((err)=>{console.log(err);
    });

}

module.exports = SendEmail;