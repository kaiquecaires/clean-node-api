import { makeDbAuthentication } from '../../../useCases/authentication/db-authentication-factory'
import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '../../../../../presentation/protocols'
import { LoginController } from '../../../../../presentation/controllers/login/login/login-controller'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
