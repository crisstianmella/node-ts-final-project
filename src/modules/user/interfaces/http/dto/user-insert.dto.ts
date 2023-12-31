import { UserProperties } from '../../../domain/user'
import { DTO } from './dto-interface'

interface UserDTO {
   name: string
   lastname: string
   email: string
   guid: string
   city: string
   province: string
}

export type UserInsertOneDTO = UserDTO

export class UserInsertMapping extends DTO<UserProperties, UserInsertOneDTO> {
   execute(data: UserProperties): UserInsertOneDTO {
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
