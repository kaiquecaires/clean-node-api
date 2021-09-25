import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/useCases/account/add-account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
