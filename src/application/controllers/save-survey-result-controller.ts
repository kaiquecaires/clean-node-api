import { SaveSurveyResult } from '@/domain/useCases/survey-result/save-survey-result'
import { InvalidParamError } from '@/application/errors'
import { forbidden, serverError, ok } from '@/application/helpers/http-helper'
import { Controller, HttpResponse } from '@/application/protocols'
import { LoadSurveyById } from '@/domain/useCases/survey/load-survey-by-id'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { surveyId, answer, accountId } = request
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
        accountId: accountId,
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

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string
    accountId: string
    answer: string
  }
}
