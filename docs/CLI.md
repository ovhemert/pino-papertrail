# CLI

To use `pino-papertrail` from the command line, you need to install it globally:

```bash
npm install -g pino-papertrail
```

## Example

Given an application `foo` that logs via [pino][pino], and a papertrail destination that collects logs on port UDP `12345` on address `bar.papertrailapp.com`, you would use `pino-papertrail` like so:

```bash
node foo | pino-papertrail --host bar.papertrailapp.com --port 12345 --appname foo
```

## Options

You can pass the following options via cli arguments:

| Description                                                      | Short command | Full command     |
|------------------------------------------------------------------|---------------|------------------|
| Display help information                                         | `-h`          | `--help`         |
| Display version                                                  | `-v`          | `--version`      |
| Application name (default: pino)                                 | `-a`          | `--appname`      |
| Echo messages to the console (default: true)                     | `-e`          | `--echo`         |
| Only send msg property as message to papertrail (default: false) | `-m`          | `--message-only` |
| Papertrail destination address (default: localhost)              | `-H`          | `--host`         |
| Papertrail destination port (default: 1234)                      | `-p`          | `--port`         |
| Papertrail connection (tls/tcp/udp, default: udp)                | `-c`          | `--connection`   |
