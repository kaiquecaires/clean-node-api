import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbSaveSurveyResult } from '@/main/factories/useCases/survey-result/save-survey-result/db-save-survey-result-factory'
import { makeDbloadSurveyById } from '@/main/factories/useCases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result/save-survey-result-controller'
import { Controller } from '@/presentation/protocols'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbloadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
