import { PurchaseProperties } from './../../../domain/purchase'
import { DTO } from './dto-interface'

export interface PurchaseDTO {
   guid: string
   customerId: string
   paymentMethod: string
   status: string
   active: boolean
}

export type PurchaseDeleteDTO = PurchaseDTO

export class PurchaseDeleteMapping extends DTO<PurchaseProperties, PurchaseDeleteDTO> {
   execute(data: PurchaseProperties): PurchaseDeleteDTO {
      return {
         guid: data.guid,
         customerId: data.customerId,
         paymentMethod: data.paymentMethod,
         status: data.status,
         active: data.active,
      }
   }
}
