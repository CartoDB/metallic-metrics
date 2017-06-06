export default class MetricsLoggerMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor (logger, ...args) {
        super(...args)
        this.logger = logger
      }

      logOnError () {
        super.logOnError()
        this.logger.debug('Log on error sending stats activated')
      }

      gaugeMemory () {
        super.gaugeMemory()
        this.logger.debug('Gauge memory activated every %d seconds', this.interval / 1000)
      }

      gaugeCPU () {
        super.gaugeCPU()
        this.logger.debug('Gauge CPU activated every %d seconds', this.interval / 1000)
      }

      timing () {
        this.logger.debug('Send timing command: %j', arguments)
        super.timing(...arguments)
      }

      gauge () {
        this.logger.debug('Send gauge command: %j', arguments)
        super.gauge(...arguments)
      }

      increment () {
        this.logger.debug('Send increment command: %j', arguments)
        super.increment(...arguments)
      }
    }
  }
}
