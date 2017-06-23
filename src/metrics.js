import MetricsInterface from './metrics-interface'

export default class Metrics extends MetricsInterface {
  constructor ({ provider, interval }) {
    super()
    this.provider = provider
    this.interval = interval
  }

  gaugeMemory () {
    this.memoryInterval = setInterval(() => {
      const memoryUsage = process.memoryUsage()

      Object.keys(memoryUsage).forEach(property => this.gauge(`memory.${property}`, memoryUsage[property]))
    }, this.interval)
  }

  gaugeCPU () {
    let previousCPUUsage = process.cpuUsage()

    this.cpuInterval = setInterval(() => {
      const CPUUsage = process.cpuUsage(previousCPUUsage)

      Object.keys(CPUUsage).forEach(property => this.gauge(`cpu.${property}`, CPUUsage[property]))

      previousCPUUsage = CPUUsage
    }, this.interval)
  }

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
