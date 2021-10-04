import { LoadSurveyResultRepository } from '@/data/protocols/db/survey-result/load-survey-result-repository'
import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResult, SaveSurveyResultParams } from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) { }

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResultModel = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId)
    return surveyResultModel
  }
}
