const mongoose = require('mongoose');
const Excel = require('./Models/ExcelModel');
const logger = require('../server-utils/imole-log');

const DocProcessor = () => {
    logger.info('DOC_PROCESSOR START')
    Excel.find({processed:false}, (err, docs)=>{
        if(err){
            logger.error("Error in search document.")
            throw "Error in search document"
        }else{
            // console.log('documenti trovati:',docs);
            
            docs.map((doc)=>{
                console.log('single doc:',doc);
                
                doc.processed = true;

                doc.save().catch((err)=>{
                    logger.error("Error in save document")
                    throw 'Error in save'
                })
            })
        }
    })
    logger.info('DOC_PROCESSOR END')
}

module.exports = DocProcessor;