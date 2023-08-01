import { IEntity } from '../../shared/entity.interface'

// Principio SOLID: Interface Segregation
interface CustomerRequired {
   address: string
   dni: string
   userId: string
}

interface CustomerOptional {
   active: boolean
   guid: string
}

interface CustomerUpdate {
   address: string
   dni: string
}

export type CustomerProperties = Required<CustomerRequired> & Partial<CustomerOptional>

export default class Customer implements IEntity<CustomerProperties, CustomerUpdate> {
   private address: string
   private dni: string
   private userId: string
   private active: boolean
   private readonly guid: string

   constructor(customerProperties: CustomerProperties) {
      this.active = true
      Object.assign(this, customerProperties)
   }

   properties(): CustomerProperties {
      return {
         address: this.address,
         dni: this.dni,
         userId: this.userId,
         active: this.active,
         guid: this.guid,
      }
   }

   update(fields: CustomerUpdate) {
      Object.assign(this, fields)
      Object.assign
   }

   delete() {
      this.active = false
   }
}
