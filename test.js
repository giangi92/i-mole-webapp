const DocProcessor = require('./server-modules/DocProcessor');
const mongoose = require('mongoose');
const uri = process.env.MONGO_CONNECTION_URI || 'mongodb://localhost:27017/I-Mole'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected to DB');
  }).catch((e) => {
    console.log('There was an error:', e);
  
  });

  async function principale (){
    try{
        await DocProcessor().then('ma vedi un pò, ha funzionato').catch('Abbiamo una eccezione carina');
    }catch(error){
        console.log('Trovato un errore!!');
    }
  }

  principale();
