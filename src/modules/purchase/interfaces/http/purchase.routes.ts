import { Router } from 'express'
import PurchaseApplication from '../../application/purchase.application'
import { PurchaseRepository } from '../../domain/purchase.repository'
import PurchaseInfraestructure from '../../infraestructure/purchase.infraestructure'
import PurchaseController from './purchase.controller'
import { PurchaseMiddlewareListOne } from './middlewares/purchaseListOne.middleware'
import { PurchaseMiddlewareUpdate } from './middlewares/purchaseUpdate.middleware'
import { PurchaseMiddlewareDelete } from './middlewares/purchaseDelete.middleware'
import { PurchaseMiddlewareUpdateStatus } from './middlewares/purchaseUpdateStatus.middleware'

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
      this.expressRouter.get('/listOne/:guid', ...PurchaseMiddlewareListOne, controller.listOne)
      this.expressRouter.put(
         '/update/:guid',
         ...PurchaseMiddlewareUpdate,
         ...PurchaseMiddlewareUpdateStatus,
         controller.update,
      )
      this.expressRouter.delete('/delete/:guid', ...PurchaseMiddlewareDelete, controller.delete)
   }
}

export default new PurchaseRouter().expressRouter
