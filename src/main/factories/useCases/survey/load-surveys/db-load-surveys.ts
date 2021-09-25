import { DbLoadSurveys } from '@/data/useCases/survey/load-surveys/db-load-surveys'
import { LoadSurveys } from '@/domain/useCases/survey/load-surveys'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbloadSurveys = (): LoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
