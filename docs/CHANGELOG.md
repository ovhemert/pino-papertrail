# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Changes are grouped by:
`Added` for new features
`Changed` for changes in existing functionality
`Deprecated` for soon-to-be removed features
`Removed` for now removed features
`Fixed` for any bug fixes
`Security` in case of vulnerabilities

## [Unreleased](https://github.com/ovhemert/pino-papertrail/compare/v2.1.0...HEAD)

...

## [2.1.0](https://github.com/ovhemert/pino-papertrail/compare/v2.0.0...v2.1.0) - 2020-07-28

### Added

- Support and testing for Node.js v14.x by [@ovhemert](https://github.com/ovhemert)

### Security

- Fixed external vulnerabilities by upgrading dependencies by [@ovhemert](https://github.com/ovhemert)

## [2.0.0](https://github.com/ovhemert/pino-papertrail/compare/v1.3.0...v2.0.0) - 2020-06-02

### Added

- Backoff strategy for any tls/tcp socket errors by [@andyli](https://github.com/andyli)
- Documentation for code quality by [@ovhemert](https://github.com/ovhemert)
- TypeScript types by [@jaulz](https://github.com/jaulz)

### Fixed

- Resume logging after UDP failure [@mattiash](https://github.com/mattiash)

### Removed

- Node v8.x support by [@ovhemert](https://github.com/ovhemert)

## [1.3.0](https://github.com/ovhemert/pino-papertrail/compare/v1.2.5...v1.3.0) - 2019-09-16

### Added

- TCP and TLS support by [@andyli](https://github.com/andyli)

## [1.2.5](https://github.com/ovhemert/pino-papertrail/compare/v1.2.0...v1.2.5) - 2019-08-04

### Added

- Support and testing for Node.js v12 by [@ovhemert](https://github.com/ovhemert)

## [1.2.0](https://github.com/ovhemert/pino-papertrail/compare/v1.1.0...v1.2.0) - 2019-03-28

### Added

- API with associated tests and docs by [@kjng](https://github.com/kjng)

### Security

- Update dependencies to prevent vulnerability issues by [@ovhemert](https://github.com/ovhemert)

## [1.1.0](https://github.com/ovhemert/pino-papertrail/compare/v1.0.4...v1.1.0) - 2019-01-04

### Added

- A --message-only parameter

### Fixed

- Port number argument for testing by [@ovhemert](https://github.com/ovhemert)
- Test with hardcoded year

## [1.0.4](https://github.com/ovhemert/pino-papertrail/compare/v1.0.1...v1.0.4) - 2018-09-18

### Added

- More tests to get 100% coverage by [@ovhemert](https://github.com/ovhemert)
- Testing on latest pino version by [@ovhemert](https://github.com/ovhemert)

### Fixed

- Missing `through2` module after dependency upgrades by [@ovhemert](https://github.com/ovhemert)

## [1.0.1](https://github.com/ovhemert/pino-papertrail/releases/tag/v1.0.1) - 2018-07-20

- Initial version by [@ovhemert](https://github.com/ovhemert)
