import { validate } from 'class-validator'
import { Request, Response, NextFunction } from 'express'
import { UserUpdateValidator } from '../validators/userUpdate.validator'

class UserMiddleware {
   static async ValidateUpdate(req: Request, _res: Response, next: NextFunction) {
      const { guid } = req.params
      const userUpdateValidator = new UserUpdateValidator()
      userUpdateValidator.guid = guid
      const errors = await validate(userUpdateValidator)

      if (errors.length > 0) {
         console.log(errors)
         return next(new Error('Guid update validation failed'))
      }

      next()
   }
}

export const UserMiddlewareUpdate: ((req: Request, res: Response, next: NextFunction) => Promise<void>)[] = [
   UserMiddleware.ValidateUpdate,
]
