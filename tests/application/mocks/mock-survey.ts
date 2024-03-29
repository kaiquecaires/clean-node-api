import { SurveyModel } from '@/domain/models/survey'
import { mockSurveyModel, mockSurveyModels } from '@/tests/domain/mocks'
import { LoadSurveys } from '@/domain/useCases/survey/load-surveys'
import { AddSurvey } from '@/domain/useCases/survey/add-survey'
import { LoadSurveyById } from '@/domain/useCases/survey/load-survey-by-id'

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (accountId: string): Promise<SurveyModel[]> {
      return mockSurveyModels()
    }
  }

  return new LoadSurveysStub()
}

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurvey.Params): Promise<void> {
      return null
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return mockSurveyModel()
    }
  }

  return new LoadSurveyByIdStub()
}
