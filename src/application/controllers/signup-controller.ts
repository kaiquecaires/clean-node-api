import { Controller, HttpRequest, HttpResponse, Validation } from '@/application/protocols'
import { badRequest, serverError, ok, forbidden } from '@/application/helpers/http-helper'
import { EmailInUseError } from '@/application/errors'
import { AddAccount } from '@/domain/useCases/account/add-account'
import { Authentication } from '@/domain/useCases/account/authentication'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password, name } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const authenticationModel = await this.authentication.auth({
        email,
        password
      })
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
