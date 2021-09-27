import { AccountModel } from '@/domain/models/account'
import { AddAccountParams } from '@/domain/useCases/account/add-account'

export interface AddAccountRepository {
  add: (accountData: AddAccountParams) => Promise<AccountModel>
}
