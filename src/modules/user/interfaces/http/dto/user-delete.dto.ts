import { UserProperties } from '../../../domain/user'
import { DTO } from './dto-interface'

export interface UserDTO {
   name: string
   lastname: string
   email: string
   guid: string
   city: string
   province: string
}

export type UserDeleteDTO = UserDTO

export class UserDeleteMapping extends DTO<UserProperties, UserDeleteDTO> {
   execute(data: UserProperties): UserDeleteDTO {
      return {
         name: data.name,
         lastname: data.lastname,
         email: data.email.value,
         guid: data.guid,
         city: data.city,
         province: data.province,
      }
   }
}
