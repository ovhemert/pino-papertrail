'use strict'

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

// test('does not echo message', (t) => {
//   t.plan(1)
//   const app = spawn('node', [appPath, '-e', 'false'])
//   app.stdout.on('data', (data) => {
//     t.fail('should not receive any data')
//   })
//   app.on('close', (code) => {
//     t.is(code, 0)
//   })
//   app.stdin.end(`${messages.infoMessage}\n`)
// })

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
    console.log(msg)
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
    console.log(msg)
    t.ok(msg.startsWith('<10>1 2018'))
    t.ok(msg.includes('"level":60'))
    t.ok(msg.includes('"fatal message"'))
    app.kill()
  })
  app.stdin.end(`${messages.fatalMessage}\n`)
})
