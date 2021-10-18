require('dotenv').config()

const pinoms = require('pino-multi-stream')
const papertrail = require('.')

// create the papertrail destination stream
const options = {
  appname: 'my-project',
  host: process.env.PT_HOST,
  port: process.env.PT_PORT
}
const writeStream = papertrail.createWriteStream(options)

// create pino loggger
const logger = pinoms({ streams: [{ stream: writeStream }] })

// log some events
logger.info('Informational message')
logger.error(new Error('things got bad'), 'error message')
