import { Controller, HttpResponse } from '@/application/protocols'
import { noContent, ok, serverError } from '@/application/helpers/http-helper'
import { LoadSurveys } from '@/domain/useCases/survey/load-surveys'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (request: LoadSurveysController.Request): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(request.accountId)
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

export namespace LoadSurveysController {
  export type Request = {
    accountId: string
  }
}
