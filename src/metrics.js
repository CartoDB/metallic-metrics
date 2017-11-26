import MetricsInterface from './metrics-interface'

export default class Metrics extends MetricsInterface {
  constructor ({ provider, interval }) {
    super()
    this.provider = provider
  }

  async run () {}

  async close () {}

  timing () {
    this.provider.timing(...arguments)
  }

  gauge () {
    this.provider.gauge(...arguments)
  }

  increment () {
    this.provider.increment(...arguments)
  }
}
