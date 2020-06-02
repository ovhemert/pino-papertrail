'use strict'

const dgram = require('dgram')
const path = require('path')
const os = require('os')
const spawn = require('child_process').spawn
const test = require('tap').test
const sinon = require('sinon')
const net = require('net')
const tls = require('tls')

const messages = require(path.join(__dirname, 'fixtures', 'messages'))
const appPath = path.join(path.resolve(__dirname, '..', 'cli'))
const api = require(path.join(__dirname, '..', 'index'))

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
    t.ok(msg.startsWith('<14>1 ' + (new Date()).getFullYear()))
    t.ok(msg.includes('"level":30'))
    t.ok(msg.includes('"info message"'))
    app.kill()
  })
  const msg = messages.infoMessage.replace('"time":1532081790743,', '')
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

    if (os.type() === 'Windows_NT') {
      t.is(code, null)
    } else {
      t.is(code, 0)
    }
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

test('logs error when DNS resolution fails', (t) => {
  t.plan(2)
  const app = spawn('node', [appPath, '-H', 'nosuchhost.example.com', '-e', true, '-p', '12345'])
  app.stdout.on('data', (data) => {
    t.ok(data.toString().startsWith('error'), 'shall log an error')
    app.kill()
  })
  app.on('close', (code) => {
    if (os.type() === 'Windows_NT') {
      t.is(code, null)
    } else {
      t.is(code, 0)
    }
  })
  app.stdin.end(`${messages.infoMessage}\n`)
})

test('pino-papertrail api (no option)', (t) => {
  t.plan(1)
  t.ok(api.createWriteStream(), 'should be able to pass no options')
})

test('pino-papertrail api (udp)', (t) => {
  t.plan(1)

  const options = {
    appname: 'pino-papertrail',
    echo: false,
    host: 'papertrailapp.com',
    port: '1234',
    connection: 'udp',
    'message-only': false
  }

  t.ok(api.createWriteStream(options), 'should be able to pass options')
})

function testApiTcp (t, connection, echo) {
  t.plan(11)

  const clock = require('@sinonjs/fake-timers').install()

  const socket = {
    setKeepAlive: sinon.fake(),
    setNoDelay: sinon.fake(),
    on: sinon.fake(),
    write: sinon.fake()
  }
  const connect = sinon.fake.returns(socket)
  const log = sinon.fake()

  sinon.replace(connection === 'tcp' ? net : tls, 'connect', connect)

  if (echo) {
    sinon.replace(console, 'log', log)
  }

  const createWriteStream = api.createWriteStream

  const options = {
    appname: 'pino-papertrail',
    echo: echo,
    host: 'papertrailapp.com',
    port: '1234',
    connection: connection,
    'message-only': false
  }

  const writeStream = createWriteStream(options)
  t.ok(writeStream)
  t.ok(connect.called)

  t.ok(socket.on.calledTwice)
  const onErrorCall = socket.on.getCall(0)
  const onEndCall = socket.on.getCall(1)
  t.ok(onErrorCall.args[0] === 'error')
  t.ok(onEndCall.args[0] === 'end')

  // connection error (refuse)
  onErrorCall.lastArg(new Error('connect ECONNREFUSED'))
  clock.runAll()

  // should auto reconnect
  t.ok(connect.calledTwice)

  // should be able to write before a connection is made
  writeStream.write(`${messages.infoMessage}\n`, () => {
    t.ok(socket.write.notCalled)

    // accept connection, run callback
    connect.lastCall.lastArg()

    // should be able to write after a connection is made
    writeStream.write(`${messages.warnMessage}\n`, () => {
      t.ok(socket.write.calledTwice)
      t.ok(socket.write.getCall(0).args[0].toString().includes(messages.infoMessage))
      t.ok(socket.write.getCall(1).args[0].toString().includes(messages.warnMessage))

      // close connection
      onEndCall.lastArg()

      // should auto reconnect
      t.ok(connect.calledThrice)

      // accept connection, run callback
      connect.lastCall.lastArg()

      clock.uninstall()

      sinon.restore()

      t.end()
    })
  })
}

// sinon-using tests cannot be run concurrently
test('pino-papertrail api (tcp)', (t) => testApiTcp(t, 'tcp', false))
  .then(() => {
    test('pino-papertrail api (tls)', (t) => testApiTcp(t, 'tls', true))
  })
