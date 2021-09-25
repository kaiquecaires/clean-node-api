import { SaveSurveyResult } from '@/domain/useCases/survey-result/save-survey-result'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './save-survey-result-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body

      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const savedSurvey = await this.saveSurveyResult.save({
        accountId: httpRequest.accountId,
        answer,
        date: new Date(),
        surveyId: surveyId
      })

      return ok(savedSurvey)
    } catch (error) {
      return serverError(error)
    }
  }
}
