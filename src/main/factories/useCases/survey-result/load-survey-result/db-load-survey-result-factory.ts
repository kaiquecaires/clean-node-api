import { DbLoadSurveyResult } from '@/data/useCases/survey-result/load-survey-result/db-load-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbLoadSurveyResult = (): DbLoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
