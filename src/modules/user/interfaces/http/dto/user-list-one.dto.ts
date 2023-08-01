import { UserProperties } from '../../../domain/user'
import { DTO } from './dto-interface'

export interface UserOneDTO {
   name: string
   lastname: string
   email: string
   guid: string
   city: string
   province: string
}

export type UserListOneDTO = UserOneDTO

export class UserListOneMapping extends DTO<UserProperties, UserListOneDTO> {
   execute(data: UserProperties): UserListOneDTO {
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
