import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveys } from '@/domain/useCases/survey/load-surveys'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}
  async load (accountId: string): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId)
    return surveys
  }
}
