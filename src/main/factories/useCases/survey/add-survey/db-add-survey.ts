import { DbAddSurvey } from '../../../../../data/useCases/add-survey/db-add-survey'
import { AddSurvey } from '../../../../../domain/useCases/add-survey'
import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey/survey-mongo-repository'

export const makeDbaAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
