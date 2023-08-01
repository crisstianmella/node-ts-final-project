import express, { Application } from 'express'
import routerHealth from './helpers/health'
import handlerError from './helpers/error'
import hpp from 'hpp'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import routerUser from './modules/user/interfaces/http/user.routes'
import routerCustomer from './modules/customer/interface/http/customer.routes'
import routerPurchase from './modules/purchase/interfaces/http/purchase.routes'

class App {
   readonly expressApp: Application

   constructor() {
      this.expressApp = express()
      this.owaspSecurityMiddlewares()
      this.mountHealthCheck()
      this.mountMiddlewares()
      this.mountRoutes()
      this.mountErrors()
   }
   // Aplicacion de principios OWASP
   owaspSecurityMiddlewares() {
      this.expressApp.use(hpp())
      this.expressApp.use(helmet())
      this.expressApp.use(
         // Uso de CORS
         cors({
            origin: '*',
            optionsSuccessStatus: 200,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
         }),
      )
   }

   // Principio SOLID: Open / Close
   mountHealthCheck() {
      this.expressApp.use('/', routerHealth)
   }

   mountMiddlewares() {
      // Uso de compression() para optimizacion del buffer
      this.expressApp.use(compression())
      this.expressApp.use(express.json())
      this.expressApp.use(express.urlencoded({ extended: true }))
   }

   mountRoutes(): void {
      this.expressApp.use('/user', routerUser)
      this.expressApp.use('/customer', routerCustomer)
      this.expressApp.use('/purchase', routerPurchase)
   }

   mountErrors() {
      this.expressApp.use(handlerError.notFound)
      this.expressApp.use(handlerError.genericError)
   }
}

export default new App().expressApp
