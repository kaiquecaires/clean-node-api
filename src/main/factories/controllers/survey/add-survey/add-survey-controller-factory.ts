import { AddSurveyController } from '@/application/controllers/add-survey-controller'
import { Controller } from '@/application/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbaAddSurvey } from '@/main/factories/useCases/survey/db-add-survey'
import { makeAddSurveyValidation } from './add-survey-validation'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbaAddSurvey())
  return makeLogControllerDecorator(controller)
}
