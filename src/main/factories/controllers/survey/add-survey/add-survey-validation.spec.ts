import { Validation } from '../../../../../presentation/protocols'
import { RequiredFielValidation, ValidationComposite } from '../../../../../validations/validators'
import { makeAddSurveyValidation } from './add-survey-validation'

jest.mock('../../../../../validations/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFielValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
