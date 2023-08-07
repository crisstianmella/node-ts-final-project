import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { CustomerDeleteValidator } from '../validators/customerDelete.validator'

class CustomerMiddleware {
   static async ValidateDelete(req: Request, _res: Response, next: NextFunction) {
      const { guid } = req.params
      const customerDeleteValidator = new CustomerDeleteValidator()
      customerDeleteValidator.guid = guid
      const errors = await validate(customerDeleteValidator)

      if (errors.length > 0) {
         console.log(errors)
         return next(new Error('Guid delete validation failed'))
      }

      next()
   }
}

export const CustomerMiddlewareDelete: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
   CustomerMiddleware.ValidateDelete,
]
