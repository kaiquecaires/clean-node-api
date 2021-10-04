import { LoadSurveyResultController } from '@/presentation/controllers/survey-result/load-survey-result/load-survey-result-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbloadSurveyById } from '@/main/factories/useCases/survey/load-survey-by-id/db-load-survey-by-id-factory'
import { makeDbLoadSurveyResult } from '@/main/factories/useCases/survey-result/load-survey-result/db-load-survey-result-factory'

export const makeLoadSurveyResultController = (): Controller => {
  return new LoadSurveyResultController(makeDbloadSurveyById(), makeDbLoadSurveyResult())
}
