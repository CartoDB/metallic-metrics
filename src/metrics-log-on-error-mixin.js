export default class MetricsLogOnErrorMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor (logger, ...args) {
        super(...args)
        this.logger = logger
      }

      logOnError () {
        this.provider.socket.on('error', err => this.logger.error('Error sending stats:', err))
      }
    }
  }
}
