var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('./Models/UserModel')
const SendEmail = require ('./SendEmail')
const crypto = require('crypto');
const NMSendMail = require('./NodeMailer')

// const User = mongoose.model('User', { name:String, surname:String, email: String, password:String, createdAt:Number, sessionToken:String })

router.post('/user/login', (req, res) => {

    const user = req.body;
    User.findOne({ email: user.email, password: user.password }, (err, resp) => {
      if (err) {
        res.status(404).send('Error', err);
      }
  
      if (resp) {
        let dbuser = resp;
        console.log('Lo abbiamo trovato!!', dbuser);
        
        dbuser.sessionToken = jwt.sign({ email: user.email }, 'secret', { expiresIn: '2 minutes' });
  
        dbuser.save((saveErr, saveResp) => {
          if (saveErr) {
            res.status(500).send(saveErr);
          }
          res.status(200).send(dbuser);
        })
      } else {
        //altrimenti non ho trovato nessuno
        res.status(404).send({error:"Nothing found"});
      }
  
    })
  
  })
  
  router.post('/user/register', (req, res) => {
  
    const user = req.body;
    User.findOne({ email: user.email }, (err, resp) => {
      if (err) {
        res.status(404).send('Error', err);
      }
  
      if (resp) {
        let dbuser = resp;
        console.log('Email già presente', dbuser);
        res.status(409).send({error:{message:'Email già in uso.'}})
        
      } else {
        //altrimenti non ho trovato nessuno e posso procedere con la registrazione
        User.create({
          name:user.name,
          surname:user.surname,
          email:user.email,
          password:user.password,
          sessionToken: jwt.sign({ email: user.email }, 'secret', { expiresIn: '7d' })
        },(insertErr, insertRes)=>{
          if(insertErr){
            console.log(insertErr);
            res.status(500).send(insertErr);
          }
          NMSendMail(user.email,`Benvenuto/a ${user.name}!`,"<p>Complimenti per esserti registrato su I-Mole.</p>");
          res.status(200).send(insertRes);
        })
      }
  
    })
  
  })

  router.post('/user/recoverPass',(req,res)=>{
    const user = req.body;
    let token = '';
    User.findOne({ email: user.email }, (err, resp) => {
      if (err) {
        res.status(404).send('Error', err);
      }
      if (resp) {
        crypto.randomBytes(20, function(err, buf) {
          if (err) throw err;
          let dbuser = resp;
          let token = buf.toString('hex');
          dbuser.resetPasswordToken = token;
          dbuser.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          dbuser.save(function(err) {
            if (err) {
              res.status(500).send(saveErr);
            }
            // console.log(dbuser);
            console.log('req header host',req.headers.host, 'Token', token, ' complete uri:', `http://${req.headers.host}/reset${token}`);
            
            const reqUri = `http://${req.headers.host}/reset${token}`;
            //SendEmail(user.email,'Modifica email della piattaforma I-Mole', `<p>Per favore clicca sul link o incollalo sul browser per completare l'operazione: <a href="${reqUri}" Se non hai fatto tu la richiesta di modifica password ignora questo messaggio.</p>`)
            NMSendMail(user.email,"Modifica password I-Mole", `<p>Per favore clicca sul link o incollalo sul browser per completare l'operazione:</p> <a href="${reqUri}">${reqUri}</a> <p>Se non hai fatto tu la richiesta di modifica password ignora questo messaggio.</p>`)
            res.status(200).send({ok:"Email sent"});
          });
          //done(err, token);
        });
        
      }else {
        //altrimenti non ho trovato nessuno
        res.status(404).send({error:"Nothing found"});
      }
    }
    )})

    router.get('/user/reset/:token', function(req, res) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.status(400).send({error:'Token not valid'});
        }
        
        res.status(200).send('reset', {
          user: req.user
        });
      });
    });

    router.post('/user/reset/:token', function(req, res) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return res.status(400).send({error:'Token not valid'});
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        user.save(function(err) {
          if (err) {
            res.status(500).send(err);
          }
          res.status(200).send({message:'New password saved'});
        });
      });
    });

  module.exports = router;