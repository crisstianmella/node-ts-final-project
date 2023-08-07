import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { PurchaseUpdateValidator } from '../validators/purchaseUpdate.validator'

class PurchaseMiddleware {
   static async ValidateUpdate(req: Request, _res: Response, next: NextFunction) {
      const { guid } = req.params
      const purchaseUpdateValidator = new PurchaseUpdateValidator()
      purchaseUpdateValidator.guid = guid
      const errors = await validate(purchaseUpdateValidator)

      if (errors.length > 0) {
         console.log(errors)
         return next(new Error('Guid update validation failed'))
      }

      next()
   }
}

export const PurchaseMiddlewareUpdate: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
   PurchaseMiddleware.ValidateUpdate,
]
