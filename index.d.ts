declare module 'pino-papertrail' {
  import pino from 'pino'

  interface Options {
    appname?: string
    echo?: boolean
    host?: string
    port?: string
    connection?: string
    'message-only'?: boolean
  }

  const PinoPapertrail: {
    createWriteStream: (options?: Options) => pino.DestinationStream
  }

  export = PinoPapertrail
}
