import { LoadSurveyResultController } from '@/application/controllers/load-survey-result-controller'
import { Controller } from '@/application/protocols'
import { makeDbloadSurveyById } from '@/main/factories/useCases/survey/db-load-survey-by-id-factory'
import { makeDbLoadSurveyResult } from '@/main/factories/useCases/survey-result/db-load-survey-result-factory'

export const makeLoadSurveyResultController = (): Controller => {
  return new LoadSurveyResultController(makeDbloadSurveyById(), makeDbLoadSurveyResult())
}
