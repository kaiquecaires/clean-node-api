import { Controller, HttpRequest, HttpResponse } from '@/application/protocols'
import { noContent, ok, serverError } from '@/application/helpers/http-helper'
import { LoadSurveys } from '@/domain/useCases/survey/load-surveys'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(httpRequest.accountId)
      if (surveys.length > 0) {
        return ok(surveys)
      } else {
        return noContent()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
