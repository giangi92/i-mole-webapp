const mongoose = require('mongoose');

const docSchema =new mongoose.Schema({
    nome: {
        type: String
    }, 
    cognome: {
        type: String
    }, 
    eta: {
        type: Number
    },
    citta: {
        type: String
    }, 
    razza: String, 
    classe: String,
    filename: String, 
    uploadtime: Number,
    processed: Boolean 
}, {        
    timestamps: true
})

const Excel = mongoose.model('Excel', docSchema)

module.exports = Excel;