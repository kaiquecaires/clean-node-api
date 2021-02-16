import { MissingParamError } from '../../errors'
import { RequiredFielValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFielValidation('field')
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = new RequiredFielValidation('field')
    const error = sut.validate({ field: 'any_field' })
    expect(error).toBeFalsy()
  })
})
