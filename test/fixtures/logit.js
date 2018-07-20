'use strict'

const pino = require('pino')
const log = pino({ level: 'trace' })

log.fatal('fatal message')
log.debug('debug message')
log.info('info message')
log.warn('warning message')
log.error(new Error('error message'))
