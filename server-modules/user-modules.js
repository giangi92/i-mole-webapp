var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./Models/UserModel')
// const SendEmail = require ('./SendEmail') /* OLD MAIL SERVICE */
const crypto = require('crypto');
const NMSendMail = require('./NodeMailer')

router.post('/user/login', (req, res) => {

    const user = req.body;
    User.findOne({ email: user.email, password: user.password }, (err, resp) => {
      if (err) {
        return res.status(404).send('Error', err);
      }
  
      if (resp) {
        let dbuser = resp;
        console.log('Lo abbiamo trovato!!', dbuser);
        
        dbuser.sessionToken = jwt.sign({ email: user.email }, 'secret', { expiresIn: '2 minutes' });
  
        dbuser.save((saveErr, saveResp) => {
          if (saveErr) {
            return res.status(500).send(saveErr);
          }
          res.status(200).send(dbuser);
        })
      } else {
        //altrimenti non ho trovato nessuno
        res.status(404).send({error:"Nothing found"});
      }
  
    })
  
  })
  
  router.post('/user/register',  (req, res) => {
  
    const user = req.body;
    User.findOne({ email: user.email }, async (err, resp) => {
      if (err) {
        return res.status(404).send('Error', err);
      }
  
      if (resp) {
        let dbuser = resp;
        console.log('Email già presente', dbuser);
        res.status(409).send({error:{message:'Email già in uso.'}})
        
      } else {
        //altrimenti non ho trovato nessuno e posso procedere con la registrazione
        const buf = crypto.randomBytes(20).toString('hex');
        
        const newUser = new User({
            name:user.name,
            surname:user.surname,
            email:user.email,
            password:user.password,
            sessionToken: jwt.sign({ email: user.email }, 'secret', { expiresIn: '7d' }),
            accountConfirmationToken: buf,
            accountConfirmationExpires: Date.now() + 259200000, //scade dopo 72h 
            confirmed:false
          }
        )  

        try {
          await newUser.save()          
          const reqUri = `http://${req.headers.host}/userConfirm${buf}`;
          NMSendMail(user.email,`Benvenuta/o ${user.name}!`,`<p>Complimenti per la registrazione su I-Mole.</p><p>Per confermare il tuo account clicca sul seguente link (dura 72 ore):</p><a href="${reqUri}">${reqUri}</a><h3>Il team di I-Mole</h3>`);
          res.status(200).send({message:"ok"});
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }

      }
  
    })
  
  })

  router.post('/user/recoverPass',(req,res)=>{
    const user = req.body;
    let token = '';
    User.findOne({ email: user.email }, (err, resp) => {
      if (err) {
        return res.status(404).send('Error', err);
      }
      if (resp) {
        crypto.randomBytes(20, (err, buf) => {
          if (err) throw err;
          let dbuser = resp;
          let token = buf.toString('hex');
          dbuser.resetPasswordToken = token;
          dbuser.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          dbuser.save((err) => {
            if (err) {
              return res.status(500).send(saveErr);
            }

            console.log('req header host',req.headers.host, 'Token', token, ' complete uri:', `http://${req.headers.host}/reset${token}`);
            
            const reqUri = `http://${req.headers.host}/reset${token}`;

            NMSendMail(user.email,"Modifica password I-Mole", `<p>Per favore clicca sul link o incollalo sul browser per completare l'operazione:</p> <a href="${reqUri}">${reqUri}</a> <p>Se non hai fatto tu la richiesta di modifica password ignora questo messaggio.</p>`)
            res.status(200).send({ok:"Email sent"});
          });
        });
        
      }else {
        //altrimenti non ho trovato nessuno
        res.status(404).send({error:"Nothing found"});
      }
    }
    )})

    router.get('/user/reset/:token', (req, res) => {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
        if (!user) {
          console.log('Nessun utente trovato');
          
          return res.status(400).send({tokenStatus:'EXPIRED'});
        }
        console.log('Tutto ok!');
        
        res.status(200).send({tokenStatus:'GOOD'});
      });
    });

    router.post('/user/reset/:token', (req, res) => {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
        if (!user) {
          return res.status(400).send({error:'Token not valid'});
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save((err) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.status(200).send({message:'New password saved'});
        });
      });
    });

    router.get('/user/confirm/:token', (req, res) => {
      User.findOne({ accountConfirmationToken: req.params.token, accountConfirmationExpires: { $gt: Date.now() } }, (err, user) => {
        if (!user) {
          return res.status(400).send({tokenStatus:'EXPIRED'});
        }

        user.confirmed = true;
        
        user.save((err) => {
          if (err) {
            return res.status(500).send(err);
          }
          res.status(200).send({message:'Account confirmed'});
        });
      });
    });

  module.exports = router;