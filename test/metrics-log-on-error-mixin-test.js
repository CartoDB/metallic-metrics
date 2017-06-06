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
  }

  timing () {}
  gauge () {}
  increment () {}
}

class Logger extends LoggerInterface {}

describe('metrics-log-on-error-mixin', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()
    this.provider = new MetricsProvider()
    this.logger = new Logger()

    const MetricsOnSteroids = MetricsLogOnErrorMixin.mix(Metrics)

    this.metrics = new MetricsOnSteroids(this.logger, this.provider, GAUGE_MEMORY_INTERVAL)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.create() should return a Metrics instance', function () {
    assert.ok(this.metrics instanceof MetricsInterface)
  })

  it.skip('should log when socket emits error', function () {
    const error = new Error('wadus')
    const socketOnStub = this.sandbox.stub(this.provider.socket, 'on')
    const loggerErrorStub = this.sandbox.stub(this.logger, 'error')

    this.metrics.provider.socket.emit('error', error)

    assert.ok(socketOnStub.calledWith('error', error))
    assert.ok(loggerErrorStub.calledWith(error))
  })
})
