import { makeDbAuthentication } from '@/main/factories/useCases/authentication/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '@/application/protocols'
import { LoginController } from '@/application/controllers/login-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
