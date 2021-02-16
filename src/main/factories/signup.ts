import { LogControllerDecorator } from '../decorators/log'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/useCases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptograph/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { Controller } from '../../presentation/protocols'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const validationComposite = makeSignUpValidation()
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, validationComposite)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
