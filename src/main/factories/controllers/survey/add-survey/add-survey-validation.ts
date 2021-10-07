import { RequiredFielValidation, ValidationComposite } from '@/application/validations/validators'
import { Validation } from '@/application/protocols'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFielValidation(field))
  }
  return new ValidationComposite(validations)
}
