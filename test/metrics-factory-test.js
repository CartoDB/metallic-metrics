import assert from 'assert'
import MetricsFactory, { MetricsInterface } from '../src'
import LoggerFactory from 'metallic-logger'

describe('metrics-factory', function () {
  beforeEach(function () {
    this.looger = LoggerFactory.create({ enabled: false, name: 'wadus' })
  })

  it('.create() should return a Metrics instance', function () {
    const metrics = MetricsFactory.create(this.looger, { prefix: 'wadus' })

    assert.ok(metrics instanceof MetricsInterface)
  })

  it('.create() should return undefined instance when disabled', function () {
    const metrics = MetricsFactory.create(this.looger, { enabled: false, prefix: 'wadus' })

    assert.ok(metrics === undefined)
  })
})
