'use strict'

const dgram = require('dgram')
const tls = require('tls')
const net = require('net')
const stream = require('stream')
const streamBuffers = require('stream-buffers')

const fastJsonParse = require('fast-json-parse')
const split2 = require('split2')
const glossy = require('glossy')
const through2 = require('through2')
const backoff = require('backoff')

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

function toPapertrailTcp (options) {
  var isConnected = false
  var socket = null

  // Create a socket with a retry strategy for any socket error
  function createSocket () {
    const backoffStrategy = options['backoff-strategy'] || new backoff.ExponentialStrategy()
    backoffStrategy.reset()
    const call = backoff.call((callback) => {
      socket = (options.connection === 'tls' ? tls : net).connect(options.port, options.host, () => {
        isConnected = true
        if (bufferStream.size() > 0) {
          const b = bufferStream.getContents()
          socket.write(b)
        }
      })
      socket.setKeepAlive(true)
      socket.setNoDelay(true)
      socket.on('error', (err) => {
        isConnected = false
        callback(err)
      })
      socket.on('end', () => {
        isConnected = false
        callback()
        createSocket().start()
      })
    }, () => {})
    call.setStrategy(backoffStrategy)
    call.on('backoff', (num, delay, err) => {
      console.log('Error: ' + err.message + '\nRetry in ' + delay + 'ms')
    })
    return call
  }
  createSocket().start()

  const bufferStream = new streamBuffers.WritableStreamBuffer()
  const writableStream = new stream.Writable({
    write (data, encoding, callback) {
      if (options.echo === true) { console.log(data.toString()) }

      if (isConnected) {
        socket.write(data + '\r\n', callback)
      } else {
        bufferStream.write(data + '\r\n', callback)
      }
    }
  })
  return writableStream
}

function toPapertrailUdp (options) {
  const socket = dgram.createSocket('udp4')
  const writableStream = new stream.Writable({
    write (data, encoding, callback) {
      if (options.echo === true) { console.log(data.toString()) }
      socket.send(data, 0, data.length, options.port, options.host, function (err) {
        if (err) {
          console.log('error', err.message)
        }
        callback()
      })
    }
  })
  return writableStream
}

module.exports.parseJson = function () {
  return split2(_jsonParser)
}

module.exports.toPapertrail = function (options) {
  if (options.connection === 'tls' || options.connection === 'tcp') {
    return toPapertrailTcp(options)
  } else {
    return toPapertrailUdp(options)
  }
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
      message: options['message-only'] ? data.msg : JSON.stringify(data)
    })
    cb(null, msg)
  })
}
