'use strict'

const pinoPapertrail = require('./lib/pino-papertrail')
const pumpify = require('pumpify')

const defaultOptions = {
  appname: 'pino',
  echo: true,
  host: 'localhost',
  port: '1234',
  connection: 'udp',
  'message-only': false,
  'prefix-level': false
}

module.exports.createWriteStream = (opts) => {
  const { hostname, appname, echo, host, port, connection, 'message-only': messageOnly, 'prefix-level': prefixLevel } = { ...defaultOptions, ...opts }

  const parseJson = pinoPapertrail.parseJson()
  const toSyslog = pinoPapertrail.toSyslog({ hostname, appname, 'message-only': messageOnly, 'prefix-level': prefixLevel })
  const papertrail = pinoPapertrail.toPapertrail({ echo, port, host, connection })

  return pumpify(parseJson, toSyslog, papertrail)
}
