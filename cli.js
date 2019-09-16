#! /usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')

const minimist = require('minimist')
const pumpify = require('pumpify')

const pinoPapertrail = require('./lib/pino-papertrail')
const pkg = require('./package.json')

const options = {
  alias: {
    version: 'v',
    help: 'h',
    echo: 'e',
    host: 'H',
    port: 'p',
    connection: 'c',
    appname: 'a',
    'message-only': 'm'
  },
  default: {
    appname: 'pino',
    echo: true,
    host: 'localhost',
    port: '1234',
    connection: 'udp',
    'message-only': false
  }
}

const argv = minimist(process.argv.slice(2), options)

if (argv.help) {
  console.log(fs.readFileSync(path.join(__dirname, './usage.txt'), 'utf8'))
  process.exit(0)
}
if (argv.version) {
  console.log(`${pkg.name} v${pkg.version}`)
  process.exit(0)
}

const parseJson = pinoPapertrail.parseJson()
const toSyslog = pinoPapertrail.toSyslog(argv)
const papertrail = pinoPapertrail.toPapertrail(argv)

function shutdown () {
  try {
    papertrail.close()
  } catch (e) {
    process.exit()
  }
}

process.on('SIGTERM', function () { shutdown() })

const pipeline = pumpify(parseJson, toSyslog, papertrail)
process.stdin.pipe(pipeline)
