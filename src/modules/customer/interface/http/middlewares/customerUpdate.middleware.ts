import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { CustomerUpdateValidator } from '../validators/customerUpdate.validator'

class CustomerMiddleware {
   static async ValidateUpdate(req: Request, _res: Response, next: NextFunction) {
      const { guid } = req.params
      const customerUpdateValidator = new CustomerUpdateValidator()
      customerUpdateValidator.guid = guid
      const errors = await validate(customerUpdateValidator)

      if (errors.length > 0) {
         console.log(errors)
         return next(new Error('Guid update validation failed'))
      }

      next()
   }
}

export const CustomerMiddlewareUpdate: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
   CustomerMiddleware.ValidateUpdate,
]
