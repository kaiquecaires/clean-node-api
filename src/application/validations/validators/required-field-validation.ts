import { MissingParamError } from '@/application/errors'
import { Validation } from '@/application/protocols'

export class RequiredFielValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
