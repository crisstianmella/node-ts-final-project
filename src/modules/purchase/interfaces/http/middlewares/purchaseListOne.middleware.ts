import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { PurchaseListOneValidator } from '../validators/purchaseListOne.validator'

class PurchaseMiddleware {
   static async ValidateListOne(req: Request, _res: Response, next: NextFunction) {
      const { guid } = req.params
      const purchaseListOneValidator = new PurchaseListOneValidator()
      purchaseListOneValidator.guid = guid
      const errors = await validate(purchaseListOneValidator)

      if (errors.length > 0) {
         console.log(errors)
         return next(new Error('Guid listOne validation failed'))
      }

      next()
   }
}

export const PurchaseMiddlewareListOne: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
   PurchaseMiddleware.ValidateListOne,
]
