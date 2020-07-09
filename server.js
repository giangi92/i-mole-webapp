const express = require('express');
const path = require('path');
var faker = require('faker');
const mongoose = require('mongoose');
const uri = process.env.MONGO_CONNECTION_URI || 'mongodb://localhost:27017/I-Mole'
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const userRoutes = require('./server-modules/user-modules')
const User = require('./server-modules/Models/UserModel')
const morgan = require('morgan')
const FileStreamRotator = require('file-stream-rotator')
const rootDir = path.join(__dirname, '../..')
const logDir = path.join(rootDir, 'app/log')

var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = 'secret';

passport.use('jwt',new JwtStrategy(opts, (jwt_payload, done) => {
  
  User.findOne({ email: jwt_payload.email }, function (err, user) {
    if (err) {
      console.log('Errore di connessione');
      
      return done(err, false);
    }
    if (user) {
      console.log('Utente loggato correttamente:', user);
      return done(null, user);
    } else {
      console.log('Nessun utente trovato, rieffettuare login');
      return done(null, false);
      // or you could create a new account
    }
  }
  );
}
));

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to DB');
}).catch((e) => {
  console.log('There was an error:', e);

});

const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYY-MM-DD',
  filename: path.join(logDir, '%DATE%-access.log'),
  frequency: 'daily',
  verbose: false
})

// morgan.token('id', function getId (req) {
//     return req.id
// })

const app = express();
const port = process.env.PORT || 3000;
// const User = mongoose.model('User', { name:String, surname:String, email: String, password:String, createdAt:Number, sessionToken:String })
const Cat = mongoose.model('Cat', { name: String });
const Employees = mongoose.model('Employees', { _id: mongoose.Types.ObjectId, name: String, email: String, salary: Number, firedable: Boolean })


//MIDDLEWARE
app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
// app.use(express.session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(userRoutes)
// app.use(morgan(':id :remote-addr - :remote-user [:date[iso]] ":method '+
// ':url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: accessLogStream }))

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
      res.status(500).send(err);
    }
    else if(info){
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