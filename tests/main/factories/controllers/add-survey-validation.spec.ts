import { Validation } from '@/application/protocols'
import { RequiredFielValidation, ValidationComposite } from '@/application/validations/validators'
import { makeAddSurveyValidation } from '@/main/factories/controllers/survey/add-survey/add-survey-validation'

jest.mock('@/application/validations/validators/validation-composite')

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
