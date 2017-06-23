import assert from 'assert'
import sinon from 'sinon'
import MetricsInterface from '../src/metrics-interface'
import Metrics from '../src/metrics'
import MetricsLogOnErrorMixin from '../src/metrics-log-on-error-mixin'
import EventEmitter from 'events'
import LoggerInterface from 'metallic-logger'

const GAUGE_MEMORY_INTERVAL = 1

class MetricsProvider extends MetricsInterface {
  constructor () {
    super()
    this.socket = new EventEmitter()
    this.socket.on('error', () => {})
  }

  timing () {}
  gauge () {}
  increment () {}
}

class Logger extends LoggerInterface {}

describe('metrics-log-on-error-mixin', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()
    const provider = this.provider = new MetricsProvider()
    const logger = this.logger = new Logger()

    const MetricsOnSteroids = MetricsLogOnErrorMixin.mix(Metrics)

    this.metrics = new MetricsOnSteroids({ logger, provider, interval: GAUGE_MEMORY_INTERVAL })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.create() should return a Metrics instance', function () {
    assert.ok(this.metrics instanceof MetricsInterface)
  })

  it('should log when socket emits error', async function () {
    const error = new Error('wadus')
    const socketOnStub = this.sandbox.stub(this.provider.socket, 'on')
    const loggerErrorStub = this.sandbox.stub(this.logger, 'error')
    try {
      // see: https://nodejs.org/api/events.html#events_error_events
      this.metrics.provider.socket.emit('error', error)
    } catch (err) {
      await new Promise(resolve => setTimeout(() => resolve(), 1))
      assert.ok(socketOnStub.calledWith('error', error))
      assert.ok(loggerErrorStub.calledWith(error))
    }
  })
})
