'use strict'

const dgram = require('dgram')
const stream = require('stream')

const fastJsonParse = require('fast-json-parse')
const split2 = require('split2')
const glossy = require('glossy')
const through2 = require('through2')

const PINO_LEVELS = { trace: 10, debug: 20, info: 30, warn: 40, error: 50, fatal: 60 }
const SYSLOG_SEVERITIES = { emergency: 0, alert: 1, critical: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }

function _jsonParser (str) {
  const result = fastJsonParse(str)
  if (result.err) return
  return result.value
}

function _levelToSeverity (level) {
  if (level === PINO_LEVELS.trace || level === PINO_LEVELS.debug) { return SYSLOG_SEVERITIES.debug }
  if (level === PINO_LEVELS.info) { return SYSLOG_SEVERITIES.info }
  if (level === PINO_LEVELS.warn) { return SYSLOG_SEVERITIES.warning }
  if (level === PINO_LEVELS.error) { return SYSLOG_SEVERITIES.error }
  return SYSLOG_SEVERITIES.critical
}

module.exports.parseJson = function () {
  return split2(_jsonParser)
}

module.exports.toPapertrail = function (options) {
  const socket = dgram.createSocket('udp4')
  const writableStream = new stream.Writable({
    // close () { socket.close() },
    write (data, encoding, callback) {
      if (options.echo === true) { console.log(data.toString()) }
      socket.send(data, 0, data.length, options.port, options.host, function (err) {
        callback(err)
      })
    }
  })
  return writableStream
}

module.exports.toSyslog = function (options) {
  const syslogProducer = new glossy.Produce()
  return through2.obj(function transport (data, enc, cb) {
    const msg = syslogProducer.produce({
      facility: options.facility || 'user',
      severity: _levelToSeverity(data.level),
      host: data.hostname,
      appName: options.appname,
      pid: data.pid,
      time: (data.time) ? new Date(data.time) : new Date(),
      message: JSON.stringify(data)
    })
    cb(null, msg)
  })
}
