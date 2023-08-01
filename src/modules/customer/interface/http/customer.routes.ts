import { Router } from 'express'
import CustomerApplication from '../../application/customer.application'
import { CustomerRepository } from '../../domain/customer.repository'
import CustomerInfraestructure from '../../infraestructure/customer.infraestructure'
import CustomerController from './customer.controller'
import { MiddlewareListOne } from './middlewares/customer.middleware'

const infraestructure: CustomerRepository = new CustomerInfraestructure()
const application = new CustomerApplication(infraestructure)
const controller = new CustomerController(application)

class CustomerRouter {
   readonly expressRouter: Router

   constructor() {
      this.expressRouter = Router()
      this.mountRoutes()
   }

   // app.ts -> Ruta padre /user
   // user.routes-ts ->Rutas hijas
   // Design Pattern: Chain of Responsability
   mountRoutes() {
      this.expressRouter.post('/insert', controller.insert)
      this.expressRouter.get('/list', controller.list)
      this.expressRouter.get('/listOne/:guid', ...MiddlewareListOne, controller.listOne)
      this.expressRouter.put('/update/:guid', controller.update)
      this.expressRouter.delete('/delete/:guid', controller.delete)
   }
}

export default new CustomerRouter().expressRouter
