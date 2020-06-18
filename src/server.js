const express = require('express');
const path = require('path');
var faker = require('faker');
const mongoose = require('mongoose');
const uri = "mongodb+srv://Gianluca:Bragraprecia19@giangi-rjfa9.mongodb.net/test?retryWrites=true&w=majority";
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = 'secret';

passport.use('jwt',new JwtStrategy(opts, function (jwt_payload, done) {
  console.log("jwt payload più interno:",jwt_payload);
  
  User.findOne({ accessToken: jwt_payload.accessToken }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
}));

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to DB');
}).catch((e) => {
  console.log('There was an error:', e);

});

const app = express();
const port = process.env.PORT || 3000;
const User = mongoose.model('User', { name:String, surname:String, email: String, password:String, createdAt:Number, sessionToken:String })
const Cat = mongoose.model('Cat', { name: String });
const Employees = mongoose.model('Employees', { _id: mongoose.Types.ObjectId, name: String, email: String, salary: Number, firedable: Boolean })


//MIDDLEWARE
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
// app.use(express.session({ secret: 'secret' }));
app.use(passport.initialize());
// app.use(passport.session());

app.post('/mongo/addcat', (req, res) => {
  try {
    const kitty = new Cat({ id: uuidv4(), name: 'Zildjian' });
    const user = new User({ email: 'test@test.com' });
    user.save().then(() => {
      console.log('User test@ŧest added');
    })
    kitty.save().then(() => {
      console.log('meow')
      res.status(200).send('Aggiunto gattino!');
    }).catch((error) => {
      console.log(error);
      res.status(400).send('NON aggiunto gattino!');
    });
  } catch (error) {
    console.log(error);

  }

})

app.get('/employees', (req, res) => {
  passport.authenticate('jwt', {session:false}, (err, user, info)=>{
    if(err){
      console.log(err);
    }
    if(info){
      res.status(401).send(info);
    }else{
      //già autenticato, può ricevere i dati
      //res.status(200).send(user)
      console.log('Loggato come:', user);
      
      Employees.find({}, function (err, users) {
        var userMap = [];
        if (users) {
          users.forEach(function (user) {
            userMap.push(user);
          });
        }
  
        res.status(200).send(userMap);
      });
    }
  })(req,res)

})

app.post('/employees/update', (req, res) => {
  try {

    //console.log('impiegato da aggiornare: ', req.body);
    const user = req.body;
    console.log('id', user._id, 'nome: ', user.name);
    Employees.findById({ _id: user._id }, (err, risp) => {
      //console.log(risp);
      risp.name = user.name;
      risp.email = user.email;
      risp.salary = user.salary;
      risp.firedable = user.firedable;

      risp.save((resp) => {
        console.log(resp);
        res.status(200).send(user);
      })
    })
  } catch (error) {
    console.log(error);

  }

})

app.post('/user/login', (req, res) => {

  const user = req.body;
  User.findOne({ email: user.email, password: user.password }, (err, resp) => {
    if (err) {
      res.status(404).send('Error', err);
    }

    if (resp) {
      let dbuser = resp;
      console.log('Lo abbiamo trovato!!', dbuser);
      dbuser.sessionToken = jwt.sign({ email: user.email }, 'secret', { expiresIn: '7 days' });

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

app.post('/user/register', (req, res) => {

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

app.post('/employees/generaterandom/:number', (req, res) => {
  try {

    console.log('elementi da inserire: ', req.params.number);
    const elements = req.params.number;
    const finalArray = [];
    let i = 0;
    for (i = 0; i < elements; i++) {
      finalArray.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        salary: faker.finance.amount(),
        firedable: faker.random.boolean()
      });
    }

    Employees.insertMany(finalArray, (error, docs) => {
      if (error)
        console.log(error);

    })

    res.status(200).send(finalArray);

  } catch (error) {
    console.log(error);

  }

})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.info(`Server listening on port ${port}`);
});