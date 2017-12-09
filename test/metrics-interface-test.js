import assert from 'assert'
import MetricsInterface from '../src/metrics-interface'

class Metrics extends MetricsInterface {}

describe('metrics-interface', function () {
  beforeEach(function () {
    this.metrics = new Metrics()
  })
  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new MetricsInterface(), 'MetricsInterface cannot be directly constructed')
  })

  it('.timing() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.timing(), 'Unimplemented method')
  })

  it('.gauge() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.gauge(), 'Unimplemented method')
  })

  it('.unique() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.unique(), 'Unimplemented method')
  })

  it('.set() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.set(), 'Unimplemented method')
  })

  it('.increment() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.increment(), 'Unimplemented method')
  })

  it('.decrement() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.decrement(), 'Unimplemented method')
  })

  it('.histogram() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.histogram(), 'Unimplemented method')
  })
})
