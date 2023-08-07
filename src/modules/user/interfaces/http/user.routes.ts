import { Router } from 'express'
import UserApplication from '../../application/user.application'
import { UserRepository } from '../../domain/user.repository'
import UserInfraestructure from '../../infraestructure/user.infraestructure'
import UserController from './user.controller'
import { UserMiddlewareListOne } from './middlewares/userListOne.middleware'
import { UserMiddlewareUpdate } from './middlewares/userUpdate.middleware'
import { UserMiddlewareDelete } from './middlewares/userDelete.middleware'

const infraestructure: UserRepository = new UserInfraestructure()
const application = new UserApplication(infraestructure)
const controller = new UserController(application)

class UserRouter {
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
      this.expressRouter.get('/listOne/:guid', ...UserMiddlewareListOne, controller.listOne)
      this.expressRouter.put('/update/:guid', ...UserMiddlewareUpdate, controller.update)
      this.expressRouter.delete('/delete/:guid', ...UserMiddlewareDelete, controller.delete)
   }
}

export default new UserRouter().expressRouter
