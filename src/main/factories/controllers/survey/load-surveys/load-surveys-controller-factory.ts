import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbloadSurveys } from '../../../useCases/survey/load-surveys/db-load-surveys'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbloadSurveys())
  return makeLogControllerDecorator(controller)
}
