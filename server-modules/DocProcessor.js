const mongoose = require('mongoose');
const Excel = require('./Models/ExcelModel');
const logger = require('../server-utils/imole-log');

const processDocuments = async () => {
    await Excel.find({processed:false}).then((docs)=>{
        docs.map((doc)=>{
            console.log('single doc:',doc);
            
            doc.processed = true;

            doc.save().catch((err)=>{
                logger.error("Error in save document")
                throw 'Error in save'
            })
        })
    }).catch((error)=>{
        throw error;
    })
}

async function DocProcessor() {
    logger.info('DOC_PROCESSOR START')

    await processDocuments();
    
    logger.info('DOC_PROCESSOR END')
}

module.exports = DocProcessor;