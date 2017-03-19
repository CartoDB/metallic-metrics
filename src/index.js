import Metrics from './metrics'
import DisabledMetrics from './disabled-metrics'
import StatsD from 'node-statsd'
import defaults from './defaults'

export default class MetricsFactory {
  static create (logger, opts) {
    const options = { ...opts, ...defaults }

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
