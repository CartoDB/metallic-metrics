import { FactoryInterface } from 'metallic-interfaces'
import MetricsLoggerMixin from './metrics-logger-mixin'
import MetricsLogOnErrorMixin from './metrics-log-on-error-mixin'
import Metrics from './metrics'
import StatsD from 'node-statsd'
import defaults from './defaults'

export default class MetricsFactory extends FactoryInterface {
  static create ({ logger, options }) {
    const opts = { ...defaults, ...options }

    if (!opts.enabled) {
      return
    }

    const host = opts.host
    const port = opts.port
    const interval = opts.interval
    const prefix = opts.prefix

    const statsd = new StatsD(host, port, prefix)

    const MetricsOnSteroids = logger
      ? MetricsLogOnErrorMixin.mix(
        MetricsLoggerMixin.mix(
          Metrics
        )
      )
      : Metrics

    const metrics = new MetricsOnSteroids({
      provider: statsd,
      interval,
      logger
    })

    if (logger) {
      metrics.logOnError()
    }

    if (interval > 0) {
      metrics.gaugeMemory()
      metrics.gaugeCPU()
    }

    return metrics
  }
}
