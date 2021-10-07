import { Controller, HttpRequest, HttpResponse } from '@/application/protocols'
import { LoadSurveyResult } from '@/domain/useCases/survey-result/load-survey-result'
import { InvalidParamError } from '@/application/errors'
import { forbidden, ok, serverError } from '@/application/helpers/http-helper'
import { LoadSurveyById } from '@/domain/useCases/survey/load-survey-by-id'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { accountId } = httpRequest
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId, accountId)
      return ok(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
