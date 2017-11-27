export default class MetricsGaugeMemoryMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor ({ interval = 0, logger }) {
        super(...arguments)
        this.interval = interval
        this.logger = logger
      }

      run () {
        if (this.interval) {
          this.memoryInterval = setInterval(() => {
            const memoryUsage = process.memoryUsage()

            Object.keys(memoryUsage).forEach(property => this.gauge(`memory.${property}`, memoryUsage[property]))
          }, this.interval)

          this.logger.debug('Gauge memory activated every %d seconds', this.interval / 1000)
        }

        super.run()
      }

      close () {
        clearInterval(this.memoryInterval)
        super.close()
      }
    }
  }
}
