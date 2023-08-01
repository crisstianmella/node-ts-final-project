import { IEntity } from '../../shared/entity.interface'
import { EmailVO } from './value-objects/email.vo'

// Principio SOLID: Interface Segregation
interface UserRequired {
   name: string
   lastname: string
   email: EmailVO
   password: string
   city: string
   province: string
}

interface UserOptional {
   refreshToken: string
   active: boolean
   guid: string
}

interface UserUpdate {
   name: string
   lastname: string
   password: string
   city: string
   province: string
}

export type UserProperties = Required<UserRequired> & Partial<UserOptional>

export default class User implements IEntity<UserProperties, UserUpdate> {
   private name: string
   private lastname: string
   private readonly email: EmailVO
   private password: string
   private city: string
   private province: string
   private refreshToken: string
   private active: boolean
   private readonly guid: string

   constructor(userProperties: UserProperties) {
      this.active = true
      Object.assign(this, userProperties)
   }

   properties(): UserProperties {
      return {
         name: this.name,
         lastname: this.lastname,
         email: this.email,
         password: this.password,
         city: this.city,
         province: this.province,
         refreshToken: this.refreshToken,
         active: this.active,
         guid: this.guid,
      }
   }

   update(fields: UserUpdate) {
      Object.assign(this, fields)
      Object.assign
   }

   delete() {
      this.active = false
   }
}
