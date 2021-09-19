import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbaAddSurvey } from '../../../useCases/survey/add-survey/db-add-survey'
import { makeAddSurveyValidation } from './add-survey-validation'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbaAddSurvey())
  return makeLogControllerDecorator(controller)
}
