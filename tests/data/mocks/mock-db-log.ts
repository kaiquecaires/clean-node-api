import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'

export const mockLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositorySub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {}
  }

  return new LogErrorRepositorySub()
}
