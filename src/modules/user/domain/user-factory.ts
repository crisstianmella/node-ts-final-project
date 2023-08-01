import { v4 as uuidv4 } from 'uuid'
import { UserPasswordService } from './service/user-password.service'
import User, { UserProperties } from './user'
import { EmailVO } from './value-objects/email.vo'
import {
   UserLastnameRequiredException,
   UserNameRequiredException,
   UserPasswordRequiredException,
   UserPasswordLengthInvalidException,
   UserCityRequiredException,
   UserProvinceRequiredException,
   UserEmailRequiredException,
} from './exceptions/user.exception'
import { Result, err, ok } from 'neverthrow'

export type UserResult = Result<
   User,
   | UserNameRequiredException
   | UserLastnameRequiredException
   | UserEmailRequiredException
   | UserPasswordRequiredException
   | UserPasswordLengthInvalidException
   | UserCityRequiredException
   | UserProvinceRequiredException
>

//Design Pattern: Abstract Factory
export default class UserFactory {
   async create(
      name: string,
      lastname: string,
      email: EmailVO,
      password: string,
      city: string,
      province: string,
   ): Promise<UserResult> {
      if (!name || name.trim() === '') {
         return err(new UserNameRequiredException())
      }

      if (!lastname || lastname.trim() === '') {
         return err(new UserLastnameRequiredException())
      }

      if (!email || email.value.trim() === '') {
         return err(new UserEmailRequiredException())
      }

      if (!password || password.trim() === '') {
         return err(new UserPasswordRequiredException())
      }

      if (!city || city.trim() === '') {
         return err(new UserCityRequiredException())
      }

      if (!province || province.trim() === '') {
         return err(new UserProvinceRequiredException())
      }

      if (password.length < 6) {
         return err(new UserPasswordLengthInvalidException(password))
      }

      //Design Pattern: Factory Method
      const passwordHash = await UserPasswordService.hash(password)

      const userProperties: UserProperties = {
         name,
         lastname,
         email,
         password: passwordHash,
         city,
         province,
         guid: uuidv4(),
         refreshToken: uuidv4(),
      }

      const user = new User(userProperties)
      return ok(user)
   }
}
