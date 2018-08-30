# pino-papertrail

[![Travis](https://img.shields.io/travis/com/ovhemert/pino-papertrail.svg?branch=master&logo=travis)](https://travis-ci.com/ovhemert/pino-papertrail)
[![AppVeyor](https://img.shields.io/appveyor/ci/ovhemert/pino-papertrail.svg?logo=appveyor)](https://ci.appveyor.com/project/ovhemert/pino-papertrail)
[![Dependencies](https://img.shields.io/david/ovhemert/pino-papertrail.svg)](https://david-dm.org/ovhemert/pino-papertrail)
[![Known Vulnerabilities](https://snyk.io/test/npm/pino-papertrail/badge.svg)](https://snyk.io/test/npm/pino-papertrail)
[![Coverage Status](https://coveralls.io/repos/github/ovhemert/pino-papertrail/badge.svg?branch=master)](https://coveralls.io/github/ovhemert/pino-papertrail?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/ovhemert/pino-papertrail.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/pino-papertrail.svg)](https://www.npmjs.com/package/pino-papertrail)
[![npm](https://img.shields.io/npm/dm/pino-papertrail.svg)](https://www.npmjs.com/package/pino-papertrail)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

This module provides a "transport" for [pino][pino] that forwards
messages to the [papertrail][papertrail] log service through an UDPv4 socket. The module can echo the received logs or work silently.

You should install `pino-papertrail` globally for ease of use:

```bash
$ npm install --production -g pino-papertrail
```

## Usage

Given an application `foo` that logs via [pino][pino], and a papertrail destination that collects logs on port UDP `12345` on address `bar.papertrailapp.com`, you would use `pino-papertrail` like so:

```bash
$ node foo | pino-papertrail --host bar.papertrailapp.com --port 12345 --appname foo
```

## Options

You can pass the following options via cli arguments:

|  Description | Short command | Full command |
| ------------- | ------------- |-------------|
| Display help information | `-h` | `--help` |
| Display version | `-v` | `--version` |
| Application name (default: pino) | `-a` | `--appname` |
| Echo messages to the console (default: true) | `-e` | `--echo` |
| Papertrail destination address (default: localhost) | `-H` | `--host` |
| Papertrail destination port (default: 1234) | `-p` | `--port` |

## Maintainers

**Osmond van Hemert**

[![Github](https://img.shields.io/badge/style-github-333333.svg?logo=github&logoColor=white&label=)](https://github.com/ovhemert)
[![NPM](https://img.shields.io/badge/style-npm-333333.svg?logo=npm&logoColor=&label=)](https://www.npmjs.com/~ovhemert)
[![Twitter](https://img.shields.io/badge/style-twitter-333333.svg?logo=twitter&logoColor=&label=)](https://twitter.com/osmondvanhemert)
[![Web](https://img.shields.io/badge/style-website-333333.svg?logoColor=white&label=&logo=diaspora)](https://www.osmondvanhemert.nl)

## Contributing

See the [CONTRIBUTING.md](./docs/CONTRIBUTING.md) file for details.

## Donations

Want to help me out by giving a donation? Check out these options:

[![Patreon](https://img.shields.io/badge/style-patreon-333333.svg?logo=patreon&logoColor=&label=)](https://www.patreon.com/ovhemert)
[![Coinbase](https://img.shields.io/badge/style-bitcoin-333333.svg?logo=bitcoin&logoColor=&label=)](https://commerce.coinbase.com/checkout/fd177bf0-a89a-481b-889e-22bfce857b75)
[![PayPal](https://img.shields.io/badge/style-paypal-333333.svg?logo=paypal&logoColor=&label=)](https://www.paypal.me/osmondvanhemert)
[![Ko-fi](https://img.shields.io/badge/style-coffee-333333.svg?logo=ko-fi&logoColor=&label=)](http://ko-fi.com/ovhemert)

## License

Licensed under [MIT](./LICENSE).

[pino]: https://www.npmjs.com/package/pino
[papertrail]: https://papertrailapp.com
