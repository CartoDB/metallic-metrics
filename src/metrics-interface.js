import { AbstractClassError, UnimplementedError } from 'metallic-errors'
import { RunnerInterface } from 'metallic-interfaces'

export default class MetricsInterface extends RunnerInterface {
  constructor () {
    if (new.target === MetricsInterface) {
      throw new AbstractClassError(MetricsInterface.name)
    }
    super()
  }

  timing () {
    throw new UnimplementedError()
  }

  gauge () {
    throw new UnimplementedError()
  }

  gaugeMemory () {
    throw new UnimplementedError()
  }

  increment () {
    throw new UnimplementedError()
  }
}
