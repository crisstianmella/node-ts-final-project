import { PurchaseProperties } from './../../../domain/purchase'
import { DTO } from './dto-interface'

export interface PurchaseDTO {
   guid: string
   customerId: string
   paymentMethod: string
   status: string
   active: boolean
}

export type PurchaseUpdateDTO = PurchaseDTO

export class PurchaseUpdateMapping extends DTO<PurchaseProperties, PurchaseUpdateDTO> {
   execute(data: PurchaseProperties): PurchaseUpdateDTO {
      return {
         guid: data.guid,
         customerId: data.customerId,
         paymentMethod: data.paymentMethod,
         status: data.status,
         active: data.active,
      }
   }
}
