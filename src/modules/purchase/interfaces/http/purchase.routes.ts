import { Router } from 'express'
import PurchaseApplication from '../../application/purchase.application'
import { PurchaseRepository } from '../../domain/purchase.repository'
import PurchaseInfraestructure from '../../infraestructure/purchase.infraestructure'
import PurchaseController from './purchase.controller'
import { MiddlewareListOne } from './middlewares/purchase.middleware'

const infraestructure: PurchaseRepository = new PurchaseInfraestructure()
const application = new PurchaseApplication(infraestructure)
const controller = new PurchaseController(application)

class PurchaseRouter {
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

export default new PurchaseRouter().expressRouter
