import { DbLoadAccountByToken } from '@/data/useCases/account/db-load-account-by-token'
import { LoadAccountByToken } from '@/domain/useCases/account/load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'
import env from '@/main/config/env'

export const makeDbLoadAccount = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
