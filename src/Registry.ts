import { DataSource, BindableResource, VerificationStep, Named } from './Types'
import { memoize, clear } from 'memoize-cache-decorator'

export default class Registry {
  bindableResources = new Map<string, BindableResource>()
  verificationSteps = new Map<string, VerificationStep>()

  registerBindableResource (name: string, resource: BindableResource): void {
    this.bindableResources.set(name, resource)
  }

  registerVerificationStep (name: string, step: VerificationStep): void {
    this.verificationSteps.set(name, step)

    clear(this.getVerificationSteps)
  }

  @memoize()
  getVerificationSteps (): (VerificationStep & Named)[] {
    return [...this.verificationSteps.entries()].map(([name, step]) => ({
      name,
      ...step
    })).sort((a, b) => a.priority - b.priority)
  }
}
