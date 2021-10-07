import { CompareFieldsValidation, RequiredFielValidation, EmailValidation, ValidationComposite } from '@/application/validations/validators'
import { Validation } from '@/application/protocols'
import { EmailValidator } from '@/application/validations/protocols/email-validator'
import { makeSignUpValidation } from '@/main/factories/controllers/signup/signup-validation'

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

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFielValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenLastCalledWith(validations)
  })
})
