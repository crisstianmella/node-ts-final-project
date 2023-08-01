import { IEntity } from '../../shared/entity.interface'
import { StatusPurchare } from './enums/purchaseStatus.enum'

// Principio SOLID: Interface Segregation
interface PurchaseRequired {
   customerId: string
   paymentMethod: string
}

interface PurchaseOptional {
   status: string
   guid: string
   active: boolean
}

interface PurchaseUpdate {
   status: string
   active: boolean
}

export type PurchaseProperties = Required<PurchaseRequired> & Partial<PurchaseOptional>

export default class User implements IEntity<PurchaseProperties, PurchaseUpdate> {
   private readonly customerId: string
   private readonly paymentMethod: string
   private status: string
   private readonly guid: string
   private active: boolean

   constructor(purchaseProperties: PurchaseProperties) {
      this.active = true
      this.status = StatusPurchare.IN_CART
      Object.assign(this, purchaseProperties)
   }

   properties(): PurchaseProperties {
      return {
         customerId: this.customerId,
         paymentMethod: this.paymentMethod,
         status: this.status,
         guid: this.guid,
         active: this.active,
      }
   }

   update(fields: PurchaseUpdate) {
      Object.assign(this, fields)
      Object.assign
   }

   delete() {
      this.active = false
   }
}
