const fs = require('fs');
const path = require('path')
const rootDir = path.join(__dirname, '../..')
const logDir = path.join(rootDir, 'app/log')
const FileStreamRotator = require('file-stream-rotator')

fs.existsSync(logDir) || fs.mkdirSync(logDir)

const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: path.join(logDir, '%DATE%-access.log'),
    frequency: 'daily',
    verbose: false
  })

  module.exports = accessLogStream;