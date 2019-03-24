'use strict'

const pinoPapertrail = require('./lib/pino-papertrail')
const pumpify = require('pumpify')

const defaultOptions = {
  appname: 'pino',
  echo: true,
  host: 'localhost',
  port: '1234',
  'message-only': false
}

module.exports.createWriteStream = (opts) => {
  const { appname, echo, host, port, ...options } = { ...defaultOptions, ...opts }

  const parseJson = pinoPapertrail.parseJson()
  const toSyslog = pinoPapertrail.toSyslog({ appname, 'message-only': options['message-only'] })
  const papertrail = pinoPapertrail.toPapertrail({ echo, port, host })

  return pumpify(parseJson, toSyslog, papertrail)
}
