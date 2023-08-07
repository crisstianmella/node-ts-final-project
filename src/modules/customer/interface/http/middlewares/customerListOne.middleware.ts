import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { CustomerListOneValidator } from '../validators/customerListOne.validator'

class CustomerMiddleware {
   static async ValidateListOne(req: Request, _res: Response, next: NextFunction) {
      const { guid } = req.params
      const customerListOneValidator = new CustomerListOneValidator()
      customerListOneValidator.guid = guid
      const errors = await validate(customerListOneValidator)

      if (errors.length > 0) {
         console.log(errors)
         return next(new Error('Guid listOne validation failed'))
      }

      next()
   }
}

export const CustomerMiddlewareListOne: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
   CustomerMiddleware.ValidateListOne,
]
