import assert from 'assert'
import sinon from 'sinon'
import MetricsInterface from '../src/metrics-interface'
import MetricsErrorListenerMixin from '../src/metrics-error-listener-mixin'
import ErrorListener from '../src/error-listener'
import EventEmitter from 'events'
import LoggerInterface from 'metallic-logger'

const GAUGE_MEMORY_INTERVAL = 1

class DummyMetrics extends MetricsInterface {
  run () {}
  close () {}
}

class DummyLogger extends LoggerInterface {
  error () {}
}

describe('metrics-error-listener-mixin', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    const provider = this.provider = new DummyMetrics()
    const logger = this.logger = new DummyLogger()
    const emitter = this.emitter = new EventEmitter()
    const errorListener = new ErrorListener(emitter)

    const EventedMetrics = MetricsErrorListenerMixin.mix(DummyMetrics)

    this.metrics = new EventedMetrics({
      errorListener,
      logger,
      provider,
      interval: GAUGE_MEMORY_INTERVAL
    })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.create() should return a Metrics instance', function () {
    assert.ok(this.metrics instanceof MetricsInterface)
  })

  it('should log when socket emits error', async function () {
    const error = new Error('wadus')
    const loggerErrorStub = this.sandbox.stub(this.logger, 'error')

    await this.metrics.run()
    this.emitter.emit('error', error)
    await this.metrics.close()

    assert.ok(loggerErrorStub.calledOnce)
  })
})
