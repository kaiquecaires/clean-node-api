import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbloadSurveyById } from '@/main/factories/useCases/survey/db-load-survey-by-id-factory'
import { SaveSurveyResultController } from '@/application/controllers/save-survey-result-controller'
import { makeDbSaveSurveyResult } from '@/main/factories/useCases/survey-result/db-save-survey-result-factory'
import { Controller } from '@/application/protocols'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbloadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
