'use strict'

const dgram = require('dgram')
const path = require('path')
const spawn = require('child_process').spawn
const test = require('tap').test

const messages = require(path.join(__dirname, 'fixtures', 'messages'))
const appPath = path.join(path.resolve(__dirname, '..', 'index'))

test('displays help', (t) => {
  t.plan(1)
  const app = spawn('node', [appPath, '-h'])
  app.stdout.on('data', (data) => {
    const msg = data.toString()
    const res = (msg.indexOf('display help') > 0)
    t.ok(res)
  })
})

test('displays version info', (t) => {
  t.plan(1)
  const app = spawn('node', [appPath, '-v'])
  app.stdout.on('data', (data) => {
    const msg = data.toString()
    const res = msg.startsWith('pino-papertrail v')
    t.ok(res)
  })
})

test('skips non-json input', (t) => {
  t.plan(1)
  const app = spawn('node', [appPath])
  app.stdout.on('data', (data) => {
    t.fail('should not receive any data')
  })
  app.on('close', (code) => {
    t.is(code, 0)
  })
  app.stdin.end('this is not json\n')
})

test('parses message without time-prop', (t) => {
  t.plan(3)
  const app = spawn('node', [appPath])
  app.stdout.on('data', (data) => {
    const msg = data.toString()
    t.ok(msg.startsWith('<14>1 2018'))
    t.ok(msg.includes('"level":30'))
    t.ok(msg.includes('"info message"'))
    app.kill()
  })
  let msg = messages.infoMessage.replace('"time":1532081790743,', '')
  app.stdin.end(`${msg}\n`)
})

test('parses trace message', (t) => {
  t.plan(3)
  const app = spawn('node', [appPath])
  app.stdout.on('data', (data) => {
    const msg = data.toString()
    t.ok(msg.startsWith('<15>1 2018'))
    t.ok(msg.includes('"level":10'))
    t.ok(msg.includes('"trace message"'))
    app.kill()
  })
  app.stdin.end(`${messages.traceMessage}\n`)
})

test('parses debug message', (t) => {
  t.plan(3)
  const app = spawn('node', [appPath])
  app.stdout.on('data', (data) => {
    const msg = data.toString()
    t.ok(msg.startsWith('<15>1 2018'))
    t.ok(msg.includes('"level":20'))
    t.ok(msg.includes('"debug message"'))
    app.kill()
  })
  app.stdin.end(`${messages.debugMessage}\n`)
})

test('parses info message', (t) => {
  t.plan(3)
  const app = spawn('node', [appPath])
  app.stdout.on('data', (data) => {
    const msg = data.toString()
    t.ok(msg.startsWith('<14>1 2018'))
    t.ok(msg.includes('"level":30'))
    t.ok(msg.includes('"info message"'))
    app.kill()
  })
  app.stdin.end(`${messages.infoMessage}\n`)
})

test('parses warn message', (t) => {
  t.plan(3)
  const app = spawn('node', [appPath])
  app.stdout.on('data', (data) => {
    const msg = data.toString()
    t.ok(msg.startsWith('<12>1 2018'))
    t.ok(msg.includes('"level":40'))
    t.ok(msg.includes('"warning message"'))
    app.kill()
  })
  app.stdin.end(`${messages.warnMessage}\n`)
})

test('parses error message', (t) => {
  t.plan(3)
  const app = spawn('node', [appPath])
  app.stdout.on('data', (data) => {
    const msg = data.toString()
    t.ok(msg.startsWith('<11>1 2018'))
    t.ok(msg.includes('"level":50'))
    t.ok(msg.includes('"error message"'))
    app.kill()
  })
  app.stdin.end(`${messages.errorMessage}\n`)
})

test('parses fatal message', (t) => {
  t.plan(3)
  const app = spawn('node', [appPath])
  app.stdout.on('data', (data) => {
    const msg = data.toString()
    t.ok(msg.startsWith('<10>1 2018'))
    t.ok(msg.includes('"level":60'))
    t.ok(msg.includes('"fatal message"'))
    app.kill()
  })
  app.stdin.end(`${messages.fatalMessage}\n`)
})

test('parses fatal message', (t) => {
  t.plan(3)
  const app = spawn('node', [appPath])
  app.stdout.on('data', (data) => {
    const msg = data.toString()
    t.ok(msg.startsWith('<10>1 2018'))
    t.ok(msg.includes('"level":60'))
    t.ok(msg.includes('"fatal message"'))
    app.kill()
  })
  app.stdin.end(`${messages.fatalMessage}\n`)
})

test('can forward only message to papertrail', (t) => {
  t.plan(4)
  const app = spawn('node', [appPath, '-m'])
  app.stdout.on('data', (data) => {
    const msg = data.toString()
    t.ok(msg.startsWith('<10>1 2018'))
    t.ok(!msg.includes('"level":60'))
    t.ok(!msg.includes('"fatal message"'))
    t.ok(msg.includes('fatal message'))
    app.kill()
  })
  app.stdin.end(`${messages.fatalMessage}\n`)
})

test('sends to udp', (t) => {
  t.plan(2)
  const app = spawn('node', [appPath, '-e', true, '-p', '12345'])
  app.stdout.on('data', (data) => {
    t.fail('should not receive any data')
  })
  app.on('close', (code) => {
    socket.close()
    t.is(code, 0)
  })
  const socket = dgram.createSocket('udp4')
  socket.on('message', msg => {
    const res = msg.toString()
    t.ok(res.startsWith('<14>1 2018'))
    app.kill()
  })
  socket.on('error', () => {
    t.fail('socket error')
    app.kill()
  })
  socket.bind({ address: '127.0.0.1', port: 12345 }, (err) => {
    if (err) {
      t.fail('socket bind error')
      return app.kill()
    }
    app.stdin.end(`${messages.infoMessage}\n`)
  })
})
