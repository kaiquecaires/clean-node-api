import { EmailValidation, RequiredFielValidation, ValidationComposite } from '@/application/validations/validators'
import { Validation } from '@/application/protocols/validation'
import { EmailValidator } from '@/application/validations/protocols/email-validator'
import { makeLoginValidation } from '@/main/factories/controllers/login/login-validation-factory'

jest.mock('@/application/validations/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()

  return emailValidatorStub
}

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFielValidation(field))
    }

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})
