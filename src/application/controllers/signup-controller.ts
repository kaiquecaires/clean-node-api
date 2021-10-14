import { Controller, HttpResponse, Validation } from '@/application/protocols'
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

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { email, password, name } = request
      const isValid = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!isValid) {
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

export namespace SignUpController {
  export type Request = {
    email: string
    password: string
    name: string
    passwordConfirmation: string
  }
}
