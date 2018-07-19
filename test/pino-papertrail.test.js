'use strict'

const path = require('path')
const spawn = require('child_process').spawn
const test = require('tap').test

// const messages = require(path.join(__dirname, 'fixtures', 'messages'))
const pptrPath = path.join(path.resolve(__dirname, '..', 'index'))

test('skips non-json input', (t) => {
  t.plan(1)
  const pptr = spawn('node', [pptrPath])

  pptr.stdout.on('data', (data) => {
    t.fail('should not receive any data')
  })

  pptr.on('close', (code) => {
    t.is(code, 0)
  })

  pptr.stdin.end('this is not json\n')
})
