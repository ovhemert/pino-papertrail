# pino-papertrail

[![CI](https://github.com/ovhemert/pino-papertrail/workflows/CI/badge.svg)](https://github.com/ovhemert/pino-papertrail/actions)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8c926c3289f94f1fae220df626ebd9db)](https://www.codacy.com/app/ovhemert/pino-papertrail?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ovhemert/pino-papertrail&amp;utm_campaign=Badge_Grade)
[![Known Vulnerabilities](https://snyk.io/test/npm/pino-papertrail/badge.svg)](https://snyk.io/test/npm/pino-papertrail)
[![Coverage Status](https://coveralls.io/repos/github/ovhemert/pino-papertrail/badge.svg?branch=master)](https://coveralls.io/github/ovhemert/pino-papertrail?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

This module provides a "transport" for [pino][pino] that forwards
messages to the [papertrail][papertrail] log service through udp/tcp/tls. The module can echo the received logs or work silently.

## Installation

To use globally from command line:

```bash
npm install -g pino-papertrail
```

To include as a library in your project:

```bash
npm install pino-papertrail --save
```

## CLI

Want to use `pino-papertrail` from the CLI? See the [CLI](./docs/CLI.md) documentation for details.

## API

Want to use `pino-papertrail` as a library in your project? See the [API](./docs/API.md) documentation for details.

## Maintainers

Osmond van Hemert
[![Github](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=github)](https://github.com/ovhemert)
[![Web](https://img.shields.io/badge/-website.svg?style=social&logoColor=333&logo=nextdoor)](https://ovhemert.dev)

## Contributing

If you would like to help out with some code, check the [details](./docs/CONTRIBUTING.md).

Not a coder, but still want to support? Have a look at the options available to [donate](https://ovhemert.dev/donate).

## License

Licensed under [MIT](./LICENSE).

[pino]: https://www.npmjs.com/package/pino
[papertrail]: https://papertrailapp.com
