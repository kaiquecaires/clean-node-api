import { SignUpController } from '@/application/controllers/signup-controller'
import { Controller } from '@/application/protocols'
import { makeSignUpValidation } from './signup-validation'
import { makeDbAuthentication } from '@/main/factories/useCases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/useCases/account/db-add-account-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
