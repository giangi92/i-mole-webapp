var express = require('express');
var router = express.Router();
var multer  = require('multer')

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const morgan = require('morgan')

const XLSX = require('xlsx');

var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            cb( null, file.originalname.split(".")[0]+ '-' + Date.now()+".pdf");
        }
    }
);

var upload = multer({ storage:storage })

morgan.token('id', function getId (req) {
    return req.id
})

const imole_log = require('../server-utils/imole-log.js')
const accessLogStream = require('../server-utils/access-log-stream.js')

router.use((req, res, next) => {
  morgan(':id :remote-addr - :remote-user [:date[iso]] ":method '+
  ':url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: accessLogStream });
  next();
});

router.post('/imole/fileUpload', upload.single('file'), (req, res)=>{
    console.log('IMOLE FILE UPLOAD START');
    
    // console.log('req.body',req.body);
    // console.log('req.file',req.file);

    var workbook = XLSX.readFile('./'+req.file.path);// ./assets is where your relative path directory where excel file is, if your excuting js file and excel file in same directory just igore that part
    // console.log('workbook',workbook);
    
    var sheet_name_list = workbook.SheetNames; // SheetNames is an ordered list of the sheets in the workbook
    // console.log('sheet_name_list', sheet_name_list);
    
    data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]); //if you have multiple sheets
    console.log('data',data);

    res.status(200).send({message:'ok'})

    console.log('IMOLE FILE UPLOAD END');
})

module.exports = router;