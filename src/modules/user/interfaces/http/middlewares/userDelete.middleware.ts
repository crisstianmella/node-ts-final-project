import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { UserDeleteValidator } from '../validators/userDelete.validator'

class UserMiddleware {
   static async ValidateDelete(req: Request, _res: Response, next: NextFunction) {
      const { guid } = req.params
      const userDeleteValidator = new UserDeleteValidator()
      userDeleteValidator.guid = guid
      const errors = await validate(userDeleteValidator)

      if (errors.length > 0) {
         console.log(errors)
         return next(new Error('Guid delete validation failed'))
      }

      next()
   }
}

export const UserMiddlewareDelete: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
   UserMiddleware.ValidateDelete,
]
