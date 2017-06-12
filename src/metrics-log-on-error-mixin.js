export default class MetricsLogOnErrorMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor ({ logger }) {
        super(...arguments)
        this.logger = logger
      }

      logOnError () {
        this.provider.socket.on('error', err => this.logger.error('Error sending stats:', err))
      }
    }
  }
}
