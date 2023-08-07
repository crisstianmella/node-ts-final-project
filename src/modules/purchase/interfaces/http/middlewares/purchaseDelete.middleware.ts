import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { PurchaseDeleteValidator } from '../validators/purchaseDelete.validator'

class PurchaseMiddleware {
   static async ValidateDelete(req: Request, _res: Response, next: NextFunction) {
      const { guid } = req.params
      const purchaseDeleteValidator = new PurchaseDeleteValidator()
      purchaseDeleteValidator.guid = guid
      const errors = await validate(purchaseDeleteValidator)

      if (errors.length > 0) {
         console.log(errors)
         return next(new Error('Guid delete validation failed'))
      }

      next()
   }
}

export const PurchaseMiddlewareDelete: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
   PurchaseMiddleware.ValidateDelete,
]
