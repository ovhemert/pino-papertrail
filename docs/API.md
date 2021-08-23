# API

The library exposes a function to write directly to Papertrail from your own application. The example below shows how this can be done using [pino-multi-stream](https://github.com/pinojs/pino-multi-stream).

Example:

```js
const papertrail = require('pino-papertrail')

const pinoms = require('pino-multi-stream')
// create the papertrail destination stream
const writeStream = papertrail.createWriteStream({
  host: 'logs.papertrailapp.com',
  port: 12345,
  hostname: 'my-host',
  appname: 'my-app',
  'message-only': true,
  'prefix-level': true
})
// create pino loggger
const logger = pinoms({ streams: [{ stream: writeStream }] })
// log some events
logger.info('Informational message')
logger.error(new Error('things got bad'), 'error message')
```

## Functions

### createWriteStream

The `createWriteStream` function creates a writestream that `pino-multi-stream` can use to send logs to.

Example:

```js
const writeStream = papertrail.createWriteStream({
  host: 'logs.papertrailapp.com',
  port: 12345,
  hostname: 'my-host',
  appname: 'my-app',
  'message-only': true,
  'prefix-level': true
})
````

## Options

You can pass the following properties in an options object:

| Property                                                | Type              | Description                                         |
|---------------------------------------------------------|-------------------|-----------------------------------------------------|
| hostname (default: system hostname)                     | string            | Host name                                           |
| appname (default: pino)                                 | string            | Application name                                    |
| host (default: localhost)                               | string            | Papertrail destination address                      |
| port (default: 1234)                                    | number            | Papertrail destination port                         |
| connection (default: udp)                               | string            | Papertrail connection method (tls/tcp/udp)          |
| echo (default: true)                                    | boolean           | Echo messages to the console                        |
| message-only (default: false)                           | boolean           | Only send msg property as message to papertrail     |
| prefix-level (default: false)                           | boolean           | prefix messages with the log level                  |
| backoff-strategy (default: `new ExponentialStrategy()`) | [BackoffStrategy] | Retry backoff strategy for any tls/tcp socket error |

[BackoffStrategy]: https://github.com/MathieuTurcotte/node-backoff#interface-backoffstrategy
