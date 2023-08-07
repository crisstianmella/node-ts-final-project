import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { PurchaseUpdateStatusValidator } from '../validators/purchaseUpdateStatus.validator'
import { StatusPurchare } from '../../../domain/enums/purchaseStatus.enum'

class PurchaseMiddleware {
   static async ValidateUpdateStatus(req: Request, _res: Response, next: NextFunction) {
      const { status } = req.body
      const purchaseUpdateStatusValidator = new PurchaseUpdateStatusValidator()
      purchaseUpdateStatusValidator.status = status
      const errors = await validate(purchaseUpdateStatusValidator)
      console.log(errors)

      if (errors.length > 0) {
         console.log(errors)
         return next(new Error('Body update validation failed'))
      }

      if (!Object.values(StatusPurchare).includes(status)) {
         return next(new Error('Status update parameter validation failed'))
      }

      next()
   }
}

export const PurchaseMiddlewareUpdateStatus: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
   PurchaseMiddleware.ValidateUpdateStatus,
]
