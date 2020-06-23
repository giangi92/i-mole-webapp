var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User', { name:String, surname:String, email: String, password:String, createdAt:Number, sessionToken:String })

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
          res.status(200).send(insertRes);
        })
      }
  
    })
  
  })

  module.exports = router;