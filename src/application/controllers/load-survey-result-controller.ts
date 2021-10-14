import { Controller, HttpResponse } from '@/application/protocols'
import { LoadSurveyResult } from '@/domain/useCases/survey-result/load-survey-result'
import { InvalidParamError } from '@/application/errors'
import { forbidden, ok, serverError } from '@/application/helpers/http-helper'
import { LoadSurveyById } from '@/domain/useCases/survey/load-survey-by-id'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (request: LoadSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, accountId } = request
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

export namespace LoadSurveyResultController {
  export type Request = {
    surveyId: string
    accountId: string
  }
}
