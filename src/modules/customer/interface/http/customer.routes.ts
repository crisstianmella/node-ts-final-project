import { Router } from 'express'
import CustomerApplication from '../../application/customer.application'
import { CustomerRepository } from '../../domain/customer.repository'
import CustomerInfraestructure from '../../infraestructure/customer.infraestructure'
import CustomerController from './customer.controller'
import { CustomerMiddlewareListOne } from './middlewares/customerListOne.middleware'
import { CustomerMiddlewareDelete } from './middlewares/customerDelete.middleware'
import { CustomerMiddlewareUpdate } from './middlewares/customerUpdate.middleware'

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
      this.expressRouter.get('/listOne/:guid', ...CustomerMiddlewareListOne, controller.listOne)
      this.expressRouter.put('/update/:guid', ...CustomerMiddlewareUpdate, controller.update)
      this.expressRouter.delete('/delete/:guid', ...CustomerMiddlewareDelete, controller.delete)
   }
}

export default new CustomerRouter().expressRouter
