import { FactoryInterface } from 'metallic-interfaces'
import MetricsLoggerMixin from './metrics-logger-mixin'
import MetricsLogOnErrorMixin from './metrics-log-on-error-mixin'
import Metrics from './metrics'
import StatsD from 'node-statsd'
import defaults from './defaults'

export { default as MetricsInterface } from './metrics-interface'

export default class MetricsFactory extends FactoryInterface {
  static create (logger, opts) {
    const options = { ...defaults, ...opts }

    if (!options.enabled) {
      return
    }

    const host = options.host
    const port = options.port
    const interval = options.interval
    const prefix = options.prefix

    const statsd = new StatsD(host, port, prefix)

    const MetricsOnSteroids = logger
      ? MetricsLogOnErrorMixin.mix(
        MetricsLoggerMixin.mix(
          Metrics
        )
      )
      : Metrics

    const metricsArgs = [ statsd, interval ]

    if (logger) {
      metricsArgs.unshift(logger)
      metricsArgs.unshift(logger)
    }

    const metrics = new MetricsOnSteroids(...metricsArgs)

    if (logger) {
      metrics.logOnError()
    }
    metrics.gaugeMemory()
    metrics.gaugeCPU()

    return metrics
  }
}
