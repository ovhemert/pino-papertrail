# pino-papertrail

[![Travis](https://img.shields.io/travis/com/ovhemert/pino-papertrail.svg?branch=master&logo=travis)](https://travis-ci.com/ovhemert/pino-papertrail)
[![AppVeyor](https://img.shields.io/appveyor/ci/ovhemert/pino-papertrail.svg?logo=appveyor)](https://ci.appveyor.com/project/ovhemert/pino-papertrail)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8c926c3289f94f1fae220df626ebd9db)](https://www.codacy.com/app/ovhemert/pino-papertrail?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ovhemert/pino-papertrail&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/npm/pino-papertrail/badge.svg)](https://snyk.io/test/npm/pino-papertrail)
[![Coverage Status](https://coveralls.io/repos/github/ovhemert/pino-papertrail/badge.svg?branch=master)](https://coveralls.io/github/ovhemert/pino-papertrail?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/ovhemert/pino-papertrail.svg)](https://greenkeeper.io/)
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
| Only send msg property as message to papertrail (default: false) | `-m` | `--message-only` |
| Papertrail destination address (default: localhost) | `-H` | `--host` |
| Papertrail destination port (default: 1234) | `-p` | `--port` |

## Maintainers

Osmond van Hemert
[![Github](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=github)](https://github.com/ovhemert/about)
[![Web](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=nextdoor)](https://www.osmondvanhemert.nl)

## Contributing

See the [CONTRIBUTING](./docs/CONTRIBUTING.md) file for details.

## License

Licensed under [MIT](./LICENSE).

[pino]: https://www.npmjs.com/package/pino
[papertrail]: https://papertrailapp.com
