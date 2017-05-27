import { FactoryInterface } from 'metallic-interfaces'
import Metrics from './metrics'
import DisabledMetrics from './disabled-metrics'
import StatsD from 'node-statsd'
import defaults from './defaults'

export { default as MetricsInterface } from './metrics-interface'

export default class MetricsFactory extends FactoryInterface {
  static create (logger, opts) {
    const options = { ...defaults, ...opts }

    if (!options.enabled) {
      return new DisabledMetrics()
    }

    const host = options.host
    const port = options.port
    const interval = options.interval
    const prefix = options.prefix

    const statsd = new StatsD(host, port, prefix)

    return new Metrics(statsd, interval, logger)
  }
}
