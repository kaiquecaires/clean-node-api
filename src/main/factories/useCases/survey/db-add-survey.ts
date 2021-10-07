import { DbAddSurvey } from '@/data/useCases/survey/db-add-survey'
import { AddSurvey } from '@/domain/useCases/survey/add-survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey-mongo-repository'

export const makeDbaAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
