import { AuthMiddleware } from '@/application/middlewares/auth-middleware'
import { Middleware } from '@/application/protocols'
import { makeDbLoadAccount } from '../useCases/account/db-load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccount(), role)
}
