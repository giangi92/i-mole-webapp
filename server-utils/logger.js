require('winston-daily-rotate-file');
const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path')
const rootDir = path.join(__dirname, '../..')
const logDir = path.join(rootDir, 'log')

fs.existsSync(logDir) || fs.mkdirSync(logDir)

const logOptions = {
    appLog: {
        level: 'info',
        handleExceptions: true,
        filename: `${logDir}/%DATE%-imole.log`,
        format: format.combine(
            format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            format.json()
        )
    },
    consoleLog: {
        level: 'info',
        handleExceptions: true,
        format: format.combine(
            format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
            format.colorize(),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        )
    }
}

const logger = createLogger({
    transports: [
        new transports.DailyRotateFile(logOptions.appLog),
        new transports.Console(logOptions.consoleLog)
    ]
});

logger.stream = {
  write: function (message) {
    logger.info(message)
  }
}

function formatLogArguments (args) {
    args = Array.prototype.slice.call(args)
    var stackInfo = getStackInfo(1)

    if (stackInfo) {
        var calleeStr = '[' + stackInfo.relativePath + ':' + stackInfo.line + ']'

        if (typeof (args[0]) === 'string') {
            args[0] = calleeStr + ' ' + args[0]
        } else {
            args.unshift(calleeStr)
        }
    }

    return args
}

function getStackInfo (stackIndex) {
    var stacklist = (new Error()).stack.split('\n').slice(3)
    
    var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi
    var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi

    var s = stacklist[stackIndex] || stacklist[0]
    var sp = stackReg.exec(s) || stackReg2.exec(s)

    if (sp && sp.length === 5) {
        return {
            method: sp[1],
            relativePath: path.relative(rootDir, sp[2]),
            line: sp[3],
            pos: sp[4],
            file: path.basename(sp[2]),
            stack: stacklist.join('\n')
        }
    }
}

module.exports.debug = module.exports.log = function () {
  logger.debug.apply(logger, formatLogArguments(arguments))
}

module.exports.info = function () {
  logger.info.apply(logger, formatLogArguments(arguments))
}

module.exports.warn = function () {
  logger.warn.apply(logger, formatLogArguments(arguments))
}

module.exports.error = function () {
  logger.error.apply(logger, formatLogArguments(arguments))
}

module.exports.stream = logger.stream