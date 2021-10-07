import { AddSurveyRepository } from '@/data/protocols/db/survey/add-suvey-repository'
import { AddSurvey, AddSurveyParams } from '@/domain/useCases/survey/add-survey'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRepository: AddSurveyRepository) {}

  async add (data: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
