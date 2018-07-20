# pino-papertrail

[![Build Status](https://travis-ci.com/ovhemert/pino-papertrail.svg?branch=master)](https://travis-ci.com/ovhemert/pino-papertrail)
[![Dependencies](https://img.shields.io/david/ovhemert/pino-papertrail.svg)](https://david-dm.org/ovhemert/pino-papertrail)
[![Known Vulnerabilities](https://snyk.io/test/npm/pino-papertrail/badge.svg)](https://snyk.io/test/npm/pino-papertrail)
[![Coverage Status](https://coveralls.io/repos/github/ovhemert/pino-papertrail/badge.svg?branch=master)](https://coveralls.io/github/ovhemert/pino-papertrail?branch=master)
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


## License

Licensed under [MIT](./LICENSE).

[pino]: https://www.npmjs.com/package/pino
[papertrail]: https://papertrailapp.com
