import { LoadSurveysController } from '@/application/controllers/load-surveys-controller'
import { Controller } from '@/application/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbloadSurveys } from '@/main/factories/useCases/survey/db-load-surveys'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbloadSurveys())
  return makeLogControllerDecorator(controller)
}
