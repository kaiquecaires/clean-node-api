import { serve, setup } from 'swagger-ui-express'
import { Express } from 'express'
import { noCache } from '@/main/middlewares/no-cache'
import swaggerConfig from '@/main/docs'

export default (app: Express): void => {
  app.use('/api-docs', serve, noCache, setup(swaggerConfig))
}
