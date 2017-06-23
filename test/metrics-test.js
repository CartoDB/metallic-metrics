import assert from 'assert'
import sinon from 'sinon'
import MetricsInterface from '../src/metrics-interface'
import Metrics from '../src/metrics'
import EventEmitter from 'events'

const GAUGE_MEMORY_INTERVAL = 1

class MetricsProvider extends MetricsInterface {
  constructor () {
    super()
    this.socket = new EventEmitter()
  }

  timing () {}
  gauge () {}
  increment () {}
}

describe('metrics', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()
    const provider = this.provider = new MetricsProvider()
    this.providerSocketMock = this.sandbox.mock(this.provider)

    this.metrics = new Metrics({ provider, interval: GAUGE_MEMORY_INTERVAL })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.timing() should sends a timing command with the specified milliseconds', function () {
    this.provider.timing = this.sandbox.spy()
    const args = [ 'response_time', 42 ]

    this.metrics.timing(...args)

    assert.ok(this.provider.timing.calledWithExactly(...args))
  })

  it('.gauge() should gauge a stat by a specified amount', function () {
    const args = [ 'rss', 123.45 ]
    this.provider.gauge = this.sandbox.spy()

    this.metrics.gauge(...args)

    assert.ok(this.provider.gauge.calledWithExactly(...args))
  })

  it('.increment() should increment a stat given a key', function () {
    const args = [ 'home' ]
    this.provider.increment = this.sandbox.spy()

    this.metrics.increment(...args)

    assert.ok(this.provider.increment.calledWithExactly(...args))
  })
})
