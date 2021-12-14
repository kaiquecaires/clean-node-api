/* eslint-disable @typescript-eslint/no-floating-promises */
import express from 'express'
import setupSwagger from './swagger'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupApolloServer from './apollo-server'

const app = express()
setupSwagger(app)
setupMiddlewares(app)
setupRoutes(app)
setupApolloServer(app)
export default app
