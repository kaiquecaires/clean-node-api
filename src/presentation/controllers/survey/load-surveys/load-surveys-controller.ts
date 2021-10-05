import { Controller, HttpRequest, HttpResponse, LoadSurveys } from './load-surveys-protocols'
import { noContent, ok, serverError } from '@/presentation/helpers/http/http-helper'
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
