import { AddSurvey } from '@/domain/useCases/survey/add-survey'

export interface AddSurveyRepository {
  add: (surveyData: AddSurveyRepository.Params) => Promise<void>
}

export namespace AddSurveyRepository {
  export type Params = AddSurvey.Params
}
