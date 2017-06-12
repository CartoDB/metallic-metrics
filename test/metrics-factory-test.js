import assert from 'assert'
import MetricsFactory, { MetricsInterface } from '../src'
import LoggerFactory from 'metallic-logger'

describe('metrics-factory', function () {
  it('.create() should return a Metrics instance', function () {
    const logger = undefined
    const options = { prefix: 'wadus' }
    const metrics = MetricsFactory.create({ logger, options })

    assert.ok(metrics instanceof MetricsInterface)
  })

  it('.create() should return a Metrics instance with logger', function () {
    const logger = LoggerFactory.create({ name: 'wadus' })
    const metrics = MetricsFactory.create(logger, { prefix: 'wadus' })

    assert.ok(metrics instanceof MetricsInterface)
  })

  it('.create() should return undefined instance when disabled', function () {
    const logger = undefined
    const options = { enabled: false, prefix: 'wadus' }
    const metrics = MetricsFactory.create({ logger, options })

    assert.ok(metrics === undefined)
  })
})
